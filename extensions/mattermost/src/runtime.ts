import { createPluginRuntimeStore } from "avaclaw/plugin-sdk/compat";
import type { PluginRuntime } from "avaclaw/plugin-sdk/mattermost";

const { setRuntime: setMattermostRuntime, getRuntime: getMattermostRuntime } =
  createPluginRuntimeStore<PluginRuntime>("Mattermost runtime not initialized");
export { getMattermostRuntime, setMattermostRuntime };
