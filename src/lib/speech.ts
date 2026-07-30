/**
 * Речь: синтез нидерландского (Web Speech API) и локальная запись
 * для «послушай себя и сравни». Ничего не уходит с устройства.
 */

let voicesCache: SpeechSynthesisVoice[] = [];

function pickDutchVoice(): SpeechSynthesisVoice | undefined {
  if (!("speechSynthesis" in window)) return undefined;
  if (!voicesCache.length) voicesCache = window.speechSynthesis.getVoices();
  return (
    voicesCache.find((v) => v.lang === "nl-NL") ||
    voicesCache.find((v) => v.lang.startsWith("nl"))
  );
}

if ("speechSynthesis" in window) {
  window.speechSynthesis.onvoiceschanged = () => {
    voicesCache = window.speechSynthesis.getVoices();
  };
}

export function canSpeak(): boolean {
  return "speechSynthesis" in window;
}

export function speakDutch(text: string, rate = 1.0): void {
  if (!canSpeak()) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "nl-NL";
  const v = pickDutchVoice();
  if (v) u.voice = v;
  u.rate = rate;
  window.speechSynthesis.speak(u);
}

export interface Recorder {
  stop: () => Promise<Blob>;
}

export async function startRecording(): Promise<Recorder> {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const rec = new MediaRecorder(stream);
  const chunks: BlobPart[] = [];
  rec.ondataavailable = (e) => chunks.push(e.data);
  rec.start();
  return {
    stop: () =>
      new Promise<Blob>((resolve) => {
        rec.onstop = () => {
          stream.getTracks().forEach((t) => t.stop());
          resolve(new Blob(chunks, { type: rec.mimeType || "audio/webm" }));
        };
        rec.stop();
      }),
  };
}

// ────────────────────── Задержка начала речи ──────────────────────
//
// Главный модуль продукта (SPEC §2.1): на английский переключают не из-за
// ошибки в грамматике, а из-за паузы перед началом фразы. Поэтому меряем
// именно время до первого озвученного кадра, а не правильность слов.
//
// Ограничение честное: это порог громкости, а не распознавание речи.
// Кашель или стук по столу он тоже засчитает за начало. Для тренировки
// «не молчать» этого достаточно, и никакой звук при этом не покидает
// устройство — в отличие от серверного ASR.

export type SpeedBand = "fluent" | "hesitant" | "slow" | "silent";

export const BAND_LABELS: Record<SpeedBand, string> = {
  fluent: "Бегло",
  hesitant: "С заминкой",
  slow: "Медленно",
  silent: "Речь не услышана",
};

export const BAND_HINTS: Record<SpeedBand, string> = {
  fluent:
    "Меньше 1,2 секунды. Именно так фраза звучит выученной — собеседник не успевает решить, что вам нужен английский.",
  hesitant:
    "От 1,2 до 2,5 секунды. Заминку уже слышно. Повторите фразу вслух ещё несколько раз, пока она не будет вылетать сама.",
  slow:
    "Больше 2,5 секунды. Этой паузы достаточно, чтобы перешли на английский. Учите опенер до автоматизма — на него нельзя тратить обдумывание.",
  silent:
    "Микрофон не услышал речь. Проверьте доступ к микрофону и говорите чуть громче.",
};

/** Пороги из SPEC §6. Это ориентир, а не оценка — прогресс он не блокирует. */
export function speedBand(onsetMs: number | null): SpeedBand {
  if (onsetMs === null) return "silent";
  if (onsetMs < 1200) return "fluent";
  if (onsetMs <= 2500) return "hesitant";
  return "slow";
}

export interface OnsetResult {
  /** мс от старта записи до первого озвученного кадра; null — тишина */
  onsetMs: number | null;
  band: SpeedBand;
  /** запись остаётся в памяти страницы, чтобы себя послушать */
  blob: Blob;
}

export interface OnsetRecorder {
  stop: () => Promise<OnsetResult>;
}

/** Ниже этого RMS считаем, что тишина. Подобрано под встроенные микрофоны. */
const VOICE_RMS = 0.035;
/** Первые миллисекунды игнорируем: щелчок старта и открытие тракта. */
const IGNORE_MS = 80;

export function canMeasureOnset(): boolean {
  return (
    typeof window !== "undefined" &&
    typeof navigator !== "undefined" &&
    !!navigator.mediaDevices?.getUserMedia &&
    typeof MediaRecorder !== "undefined" &&
    !!(
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: unknown }).webkitAudioContext
    )
  );
}

/**
 * Пишет звук и параллельно замеряет задержку начала речи.
 * Один общий поток getUserMedia на запись и на анализ — второй запрос
 * микрофона на телефоне обычно проваливается.
 */
export async function startOnsetRecording(): Promise<OnsetRecorder> {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

  const Ctor =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;

  const ctx = Ctor ? new Ctor() : null;

  if (ctx && ctx.state === "suspended") {
    // Контекст мог стартовать приостановленным — запуск идёт по нажатию кнопки,
    // так что resume здесь разрешён политикой автовоспроизведения.
    await ctx.resume().catch(() => {});
  }

  // Тип буфера выводится из конструктора: аннотировать его как Float32Array
  // нельзя — начиная с TypeScript 5.7 это означает Float32Array<ArrayBufferLike>,
  // а getFloatTimeDomainData принимает только вариант с ArrayBuffer.
  const meter = ctx
    ? (() => {
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 1024;
        const source = ctx.createMediaStreamSource(stream);
        source.connect(analyser);
        return { analyser, source, buf: new Float32Array(analyser.fftSize) };
      })()
    : null;

  const rec = new MediaRecorder(stream);
  const chunks: BlobPart[] = [];
  rec.ondataavailable = (e) => chunks.push(e.data);

  let onsetMs: number | null = null;
  let raf = 0;
  const t0 = performance.now();

  const poll = () => {
    if (onsetMs === null && meter) {
      const { analyser, buf } = meter;
      analyser.getFloatTimeDomainData(buf);
      let sum = 0;
      for (let i = 0; i < buf.length; i++) sum += buf[i] * buf[i];
      const rms = Math.sqrt(sum / buf.length);
      const elapsed = performance.now() - t0;
      if (elapsed > IGNORE_MS && rms > VOICE_RMS) onsetMs = Math.round(elapsed);
    }
    raf = requestAnimationFrame(poll);
  };
  raf = requestAnimationFrame(poll);

  rec.start();

  const teardown = () => {
    cancelAnimationFrame(raf);
    try {
      meter?.source.disconnect();
    } catch {
      /* уже отключён */
    }
    ctx?.close().catch(() => {});
    stream.getTracks().forEach((t) => t.stop());
  };

  return {
    stop: () =>
      new Promise<OnsetResult>((resolve) => {
        rec.onstop = () => {
          teardown();
          resolve({
            onsetMs,
            band: speedBand(onsetMs),
            blob: new Blob(chunks, { type: rec.mimeType || "audio/webm" }),
          });
        };
        rec.stop();
      }),
  };
}
