import { createPluginRuntimeStore } from "avaclaw/plugin-sdk/compat";
import type { PluginRuntime } from "avaclaw/plugin-sdk/telegram";

const { setRuntime: setTelegramRuntime, getRuntime: getTelegramRuntime } =
  createPluginRuntimeStore<PluginRuntime>("Telegram runtime not initialized");
export { getTelegramRuntime, setTelegramRuntime };
