import { createPluginRuntimeStore } from "avaclaw/plugin-sdk/compat";
import type { PluginRuntime } from "avaclaw/plugin-sdk/line";

const { setRuntime: setLineRuntime, getRuntime: getLineRuntime } =
  createPluginRuntimeStore<PluginRuntime>("LINE runtime not initialized - plugin not registered");
export { getLineRuntime, setLineRuntime };
