import Foundation

// Stable identifier used for both the macOS LaunchAgent label and Nix-managed defaults suite.
// nix-avaclaw writes app defaults into this suite to survive app bundle identifier churn.
let launchdLabel = "ai.avaclaw.mac"
let gatewayLaunchdLabel = "ai.avaclaw.gateway"
let onboardingVersionKey = "avaclaw.onboardingVersion"
let onboardingSeenKey = "avaclaw.onboardingSeen"
let currentOnboardingVersion = 7
let pauseDefaultsKey = "avaclaw.pauseEnabled"
let iconAnimationsEnabledKey = "avaclaw.iconAnimationsEnabled"
let swabbleEnabledKey = "avaclaw.swabbleEnabled"
let swabbleTriggersKey = "avaclaw.swabbleTriggers"
let voiceWakeTriggerChimeKey = "avaclaw.voiceWakeTriggerChime"
let voiceWakeSendChimeKey = "avaclaw.voiceWakeSendChime"
let showDockIconKey = "avaclaw.showDockIcon"
let defaultVoiceWakeTriggers = ["avaclaw"]
let voiceWakeMaxWords = 32
let voiceWakeMaxWordLength = 64
let voiceWakeMicKey = "avaclaw.voiceWakeMicID"
let voiceWakeMicNameKey = "avaclaw.voiceWakeMicName"
let voiceWakeLocaleKey = "avaclaw.voiceWakeLocaleID"
let voiceWakeAdditionalLocalesKey = "avaclaw.voiceWakeAdditionalLocaleIDs"
let voicePushToTalkEnabledKey = "avaclaw.voicePushToTalkEnabled"
let talkEnabledKey = "avaclaw.talkEnabled"
let iconOverrideKey = "avaclaw.iconOverride"
let connectionModeKey = "avaclaw.connectionMode"
let remoteTargetKey = "avaclaw.remoteTarget"
let remoteIdentityKey = "avaclaw.remoteIdentity"
let remoteProjectRootKey = "avaclaw.remoteProjectRoot"
let remoteCliPathKey = "avaclaw.remoteCliPath"
let canvasEnabledKey = "avaclaw.canvasEnabled"
let cameraEnabledKey = "avaclaw.cameraEnabled"
let systemRunPolicyKey = "avaclaw.systemRunPolicy"
let systemRunAllowlistKey = "avaclaw.systemRunAllowlist"
let systemRunEnabledKey = "avaclaw.systemRunEnabled"
let locationModeKey = "avaclaw.locationMode"
let locationPreciseKey = "avaclaw.locationPreciseEnabled"
let peekabooBridgeEnabledKey = "avaclaw.peekabooBridgeEnabled"
let deepLinkKeyKey = "avaclaw.deepLinkKey"
let modelCatalogPathKey = "avaclaw.modelCatalogPath"
let modelCatalogReloadKey = "avaclaw.modelCatalogReload"
let cliInstallPromptedVersionKey = "avaclaw.cliInstallPromptedVersion"
let heartbeatsEnabledKey = "avaclaw.heartbeatsEnabled"
let debugPaneEnabledKey = "avaclaw.debugPaneEnabled"
let debugFileLogEnabledKey = "avaclaw.debug.fileLogEnabled"
let appLogLevelKey = "avaclaw.debug.appLogLevel"
let voiceWakeSupported: Bool = ProcessInfo.processInfo.operatingSystemVersion.majorVersion >= 26
