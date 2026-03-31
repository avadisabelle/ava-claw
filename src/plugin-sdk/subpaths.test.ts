import * as extensionApi from "avaclaw/extension-api";
import * as compatSdk from "avaclaw/plugin-sdk/compat";
import * as discordSdk from "avaclaw/plugin-sdk/discord";
import * as imessageSdk from "avaclaw/plugin-sdk/imessage";
import * as lineSdk from "avaclaw/plugin-sdk/line";
import * as msteamsSdk from "avaclaw/plugin-sdk/msteams";
import * as signalSdk from "avaclaw/plugin-sdk/signal";
import * as slackSdk from "avaclaw/plugin-sdk/slack";
import * as telegramSdk from "avaclaw/plugin-sdk/telegram";
import * as whatsappSdk from "avaclaw/plugin-sdk/whatsapp";
import { describe, expect, it } from "vitest";

const bundledExtensionSubpathLoaders = [
  { id: "acpx", load: () => import("avaclaw/plugin-sdk/acpx") },
  { id: "bluebubbles", load: () => import("avaclaw/plugin-sdk/bluebubbles") },
  { id: "copilot-proxy", load: () => import("avaclaw/plugin-sdk/copilot-proxy") },
  { id: "device-pair", load: () => import("avaclaw/plugin-sdk/device-pair") },
  { id: "diagnostics-otel", load: () => import("avaclaw/plugin-sdk/diagnostics-otel") },
  { id: "diffs", load: () => import("avaclaw/plugin-sdk/diffs") },
  { id: "feishu", load: () => import("avaclaw/plugin-sdk/feishu") },
  {
    id: "google-gemini-cli-auth",
    load: () => import("avaclaw/plugin-sdk/google-gemini-cli-auth"),
  },
  { id: "googlechat", load: () => import("avaclaw/plugin-sdk/googlechat") },
  { id: "irc", load: () => import("avaclaw/plugin-sdk/irc") },
  { id: "llm-task", load: () => import("avaclaw/plugin-sdk/llm-task") },
  { id: "lobster", load: () => import("avaclaw/plugin-sdk/lobster") },
  { id: "matrix", load: () => import("avaclaw/plugin-sdk/matrix") },
  { id: "mattermost", load: () => import("avaclaw/plugin-sdk/mattermost") },
  { id: "memory-core", load: () => import("avaclaw/plugin-sdk/memory-core") },
  { id: "memory-lancedb", load: () => import("avaclaw/plugin-sdk/memory-lancedb") },
  {
    id: "minimax-portal-auth",
    load: () => import("avaclaw/plugin-sdk/minimax-portal-auth"),
  },
  { id: "nextcloud-talk", load: () => import("avaclaw/plugin-sdk/nextcloud-talk") },
  { id: "nostr", load: () => import("avaclaw/plugin-sdk/nostr") },
  { id: "open-prose", load: () => import("avaclaw/plugin-sdk/open-prose") },
  { id: "phone-control", load: () => import("avaclaw/plugin-sdk/phone-control") },
  { id: "qwen-portal-auth", load: () => import("avaclaw/plugin-sdk/qwen-portal-auth") },
  { id: "synology-chat", load: () => import("avaclaw/plugin-sdk/synology-chat") },
  { id: "talk-voice", load: () => import("avaclaw/plugin-sdk/talk-voice") },
  { id: "test-utils", load: () => import("avaclaw/plugin-sdk/test-utils") },
  { id: "thread-ownership", load: () => import("avaclaw/plugin-sdk/thread-ownership") },
  { id: "tlon", load: () => import("avaclaw/plugin-sdk/tlon") },
  { id: "twitch", load: () => import("avaclaw/plugin-sdk/twitch") },
  { id: "voice-call", load: () => import("avaclaw/plugin-sdk/voice-call") },
  { id: "zalo", load: () => import("avaclaw/plugin-sdk/zalo") },
  { id: "zalouser", load: () => import("avaclaw/plugin-sdk/zalouser") },
] as const;

describe("plugin-sdk subpath exports", () => {
  it("exports compat helpers", () => {
    expect(typeof compatSdk.emptyPluginConfigSchema).toBe("function");
    expect(typeof compatSdk.resolveControlCommandGate).toBe("function");
  });

  it("exports Discord helpers", () => {
    expect(typeof discordSdk.resolveDiscordAccount).toBe("function");
    expect(typeof discordSdk.inspectDiscordAccount).toBe("function");
    expect(typeof discordSdk.discordSetupWizard).toBe("object");
    expect(typeof discordSdk.discordSetupAdapter).toBe("object");
  });

  it("exports Slack helpers", () => {
    expect(typeof slackSdk.resolveSlackAccount).toBe("function");
    expect(typeof slackSdk.inspectSlackAccount).toBe("function");
    expect(typeof slackSdk.handleSlackMessageAction).toBe("function");
    expect(typeof slackSdk.slackSetupWizard).toBe("object");
    expect(typeof slackSdk.slackSetupAdapter).toBe("object");
  });

  it("exports Telegram helpers", () => {
    expect(typeof telegramSdk.resolveTelegramAccount).toBe("function");
    expect(typeof telegramSdk.inspectTelegramAccount).toBe("function");
    expect(typeof telegramSdk.telegramSetupWizard).toBe("object");
    expect(typeof telegramSdk.telegramSetupAdapter).toBe("object");
  });

  it("exports Signal helpers", () => {
    expect(typeof signalSdk.resolveSignalAccount).toBe("function");
    expect(typeof signalSdk.signalSetupWizard).toBe("object");
    expect(typeof signalSdk.signalSetupAdapter).toBe("object");
  });

  it("exports iMessage helpers", () => {
    expect(typeof imessageSdk.resolveIMessageAccount).toBe("function");
    expect(typeof imessageSdk.imessageSetupWizard).toBe("object");
    expect(typeof imessageSdk.imessageSetupAdapter).toBe("object");
  });

  it("exports WhatsApp helpers", () => {
    // WhatsApp-specific functions (resolveWhatsAppAccount, whatsappOnboardingAdapter) moved to extensions/whatsapp/src/
    expect(typeof whatsappSdk.WhatsAppConfigSchema).toBe("object");
    expect(typeof whatsappSdk.resolveWhatsAppOutboundTarget).toBe("function");
    expect(typeof whatsappSdk.resolveWhatsAppMentionStripRegexes).toBe("function");
    expect("resolveWhatsAppMentionStripPatterns" in whatsappSdk).toBe(false);
  });

  it("exports LINE helpers", () => {
    expect(typeof lineSdk.processLineMessage).toBe("function");
    expect(typeof lineSdk.createInfoCard).toBe("function");
  });

  it("exports Microsoft Teams helpers", () => {
    expect(typeof msteamsSdk.resolveControlCommandGate).toBe("function");
    expect(typeof msteamsSdk.loadOutboundMediaFromUrl).toBe("function");
  });

  it("exports acpx helpers", async () => {
    const acpxSdk = await import("avaclaw/plugin-sdk/acpx");
    expect(typeof acpxSdk.listKnownProviderAuthEnvVarNames).toBe("function");
    expect(typeof acpxSdk.omitEnvKeysCaseInsensitive).toBe("function");
  });

  it("resolves bundled extension subpaths", async () => {
    for (const { id, load } of bundledExtensionSubpathLoaders) {
      const mod = await load();
      expect(typeof mod).toBe("object");
      expect(mod, `subpath ${id} should resolve`).toBeTruthy();
    }
  });

  it("keeps the newly added bundled plugin-sdk contracts available", async () => {
    const bluebubbles = await import("avaclaw/plugin-sdk/bluebubbles");
    expect(typeof bluebubbles.parseFiniteNumber).toBe("function");

    const mattermost = await import("avaclaw/plugin-sdk/mattermost");
    expect(typeof mattermost.parseStrictPositiveInteger).toBe("function");

    const nextcloudTalk = await import("avaclaw/plugin-sdk/nextcloud-talk");
    expect(typeof nextcloudTalk.waitForAbortSignal).toBe("function");

    const twitch = await import("avaclaw/plugin-sdk/twitch");
    expect(typeof twitch.DEFAULT_ACCOUNT_ID).toBe("string");
    expect(typeof twitch.normalizeAccountId).toBe("function");

    const zalo = await import("avaclaw/plugin-sdk/zalo");
    expect(typeof zalo.resolveClientIp).toBe("function");
  });

  it("exports the extension api bridge", () => {
    expect(typeof extensionApi.runEmbeddedPiAgent).toBe("function");
  });
});
