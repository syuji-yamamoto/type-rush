import menuBGM from "../assets/bgm/menu.mp3";
import beginnerBGM from "../assets/bgm/beginner.mp3";
import intermediateBGM from "../assets/bgm/intermediate.mp3";
import advancedBGM from "../assets/bgm/advanced.mp3";
import correctSE from "../assets/se/correct.mp3";
import incorrectSE from "../assets/se/incorrect.mp3";
import resultSE from "../assets/se/result.mp3";

export type BGMScene =
  | "menu"
  | "game-beginner"
  | "game-intermediate"
  | "game-advanced"
  | "silent";

export const AUDIO_PATHS = {
  bgm: {
    menu: menuBGM,
    "game-beginner": beginnerBGM,
    "game-intermediate": intermediateBGM,
    "game-advanced": advancedBGM,
  },
  se: {
    correct: correctSE,
    incorrect: incorrectSE,
    result: resultSE,
  },
} as const;

export const AUDIO_DEFAULTS = {
  bgmVolume: 0.3,
  seVolume: 0.5,
  bgmEnabled: true,
  seEnabled: true,
} as const;

/** BGMフェードの時間（ミリ秒） */
export const BGM_FADE_DURATION_MS = 500;

/** SEオーディオプールの最大サイズ */
export const SE_POOL_MAX_SIZE = 8;

/** localStorage保存キー */
export const AUDIO_CONFIG_STORAGE_KEY = "audioConfig";
