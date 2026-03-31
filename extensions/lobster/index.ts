import type {
  AnyAgentTool,
  AvaClawPluginApi,
  AvaClawPluginToolFactory,
} from "avaclaw/plugin-sdk/lobster";
import { createLobsterTool } from "./src/lobster-tool.js";

export default function register(api: AvaClawPluginApi) {
  api.registerTool(
    ((ctx) => {
      if (ctx.sandboxed) {
        return null;
      }
      return createLobsterTool(api) as AnyAgentTool;
    }) as AvaClawPluginToolFactory,
    { optional: true },
  );
}
