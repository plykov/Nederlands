/**
 * Фоновый шум для тренировки слушания в неудобных условиях.
 * Всё синтезируется на месте через Web Audio API — никаких файлов и запросов.
 *
 * Честное ограничение: синтез речи (Web Speech API) не проходит через
 * Web Audio, поэтому шум звучит ПАРАЛЛЕЛЬНО голосу, а не наложен на него
 * обработкой. Для тренировки разборчивости этого достаточно: мозг всё равно
 * вынужден вылавливать речь из смеси. Настоящая полосовая фильтрация «под
 * телефон» потребовала бы своих аудиозаписей — это отдельная работа.
 */

export type NoiseKind = "none" | "cafe" | "straat" | "telefoon";

export const NOISE_LABELS: Record<NoiseKind, string> = {
  none: "Тишина",
  cafe: "Кафе — гул голосов",
  straat: "Улица — машины",
  telefoon: "Телефон — помехи на линии",
};

function whiteNoiseBuffer(ctx: AudioContext, seconds = 4): AudioBuffer {
  const len = Math.floor(ctx.sampleRate * seconds);
  const buf = ctx.createBuffer(1, len, ctx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
  return buf;
}

export class NoiseBed {
  private ctx: AudioContext | null = null;
  private nodes: AudioNode[] = [];
  private master: GainNode | null = null;

  /** level: 0…1 — насколько громко мешает фон */
  start(kind: NoiseKind, level: number): void {
    this.stop();
    if (kind === "none" || level <= 0) return;

    const Ctor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!Ctor) return;

    const ctx = new Ctor();
    this.ctx = ctx;

    const master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);
    this.master = master;

    const src = ctx.createBufferSource();
    src.buffer = whiteNoiseBuffer(ctx);
    src.loop = true;

    const band = ctx.createBiquadFilter();

    if (kind === "cafe") {
      // Гул голосов: шум в речевой полосе + медленная «пульсация» громкости,
      // имитирующая слоговой ритм чужих разговоров.
      band.type = "bandpass";
      band.frequency.value = 900;
      band.Q.value = 0.7;

      const babble = ctx.createGain();
      babble.gain.value = 0.7;
      const lfo = ctx.createOscillator();
      lfo.type = "sine";
      lfo.frequency.value = 3.5;
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 0.35;
      lfo.connect(lfoGain).connect(babble.gain);
      lfo.start();

      src.connect(band).connect(babble).connect(master);
      this.nodes.push(src, band, babble, lfo, lfoGain);
    } else if (kind === "straat") {
      // Улица: низкочастотный гул транспорта.
      band.type = "lowpass";
      band.frequency.value = 420;
      src.connect(band).connect(master);
      this.nodes.push(src, band);
    } else {
      // Телефон: узкая полоса + шипение линии.
      band.type = "bandpass";
      band.frequency.value = 1800;
      band.Q.value = 2.5;
      src.connect(band).connect(master);
      this.nodes.push(src, band);
    }

    src.start();
    // Плавный подъём, чтобы не било по ушам.
    master.gain.linearRampToValueAtTime(
      Math.min(level, 1) * 0.28,
      ctx.currentTime + 0.4
    );
  }

  stop(): void {
    const ctx = this.ctx;
    const master = this.master;
    if (ctx && master) {
      try {
        master.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.25);
      } catch {
        /* контекст мог уже закрыться */
      }
      setTimeout(() => {
        this.nodes.forEach((n) => {
          try {
            (n as OscillatorNode & AudioBufferSourceNode).stop?.();
          } catch {
            /* узел не источник — нечего останавливать */
          }
          try {
            n.disconnect();
          } catch {
            /* уже отключён */
          }
        });
        this.nodes = [];
        ctx.close().catch(() => {});
      }, 300);
    }
    this.ctx = null;
    this.master = null;
  }
}

export function canPlayNoise(): boolean {
  return (
    typeof window !== "undefined" &&
    !!(
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: unknown }).webkitAudioContext
    )
  );
}
