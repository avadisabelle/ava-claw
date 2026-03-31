import type { AvaClawPluginApi } from "avaclaw/plugin-sdk/googlechat";
import { emptyPluginConfigSchema } from "avaclaw/plugin-sdk/googlechat";
import { googlechatDock, googlechatPlugin } from "./src/channel.js";
import { setGoogleChatRuntime } from "./src/runtime.js";

const plugin = {
  id: "googlechat",
  name: "Google Chat",
  description: "AvaClaw Google Chat channel plugin",
  configSchema: emptyPluginConfigSchema(),
  register(api: AvaClawPluginApi) {
    setGoogleChatRuntime(api.runtime);
    api.registerChannel({ plugin: googlechatPlugin, dock: googlechatDock });
  },
};

export default plugin;
