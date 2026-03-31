import type { AvaClawPluginApi } from "avaclaw/plugin-sdk/synology-chat";
import { emptyPluginConfigSchema } from "avaclaw/plugin-sdk/synology-chat";
import { createSynologyChatPlugin } from "./src/channel.js";
import { setSynologyRuntime } from "./src/runtime.js";

const plugin = {
  id: "synology-chat",
  name: "Synology Chat",
  description: "Native Synology Chat channel plugin for AvaClaw",
  configSchema: emptyPluginConfigSchema(),
  register(api: AvaClawPluginApi) {
    setSynologyRuntime(api.runtime);
    api.registerChannel({ plugin: createSynologyChatPlugin() });
  },
};

export default plugin;
