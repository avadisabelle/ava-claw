package ai.avaclaw.app.node

import ai.avaclaw.app.protocol.AvaClawCalendarCommand
import ai.avaclaw.app.protocol.AvaClawCameraCommand
import ai.avaclaw.app.protocol.AvaClawCallLogCommand
import ai.avaclaw.app.protocol.AvaClawCapability
import ai.avaclaw.app.protocol.AvaClawContactsCommand
import ai.avaclaw.app.protocol.AvaClawDeviceCommand
import ai.avaclaw.app.protocol.AvaClawLocationCommand
import ai.avaclaw.app.protocol.AvaClawMotionCommand
import ai.avaclaw.app.protocol.AvaClawNotificationsCommand
import ai.avaclaw.app.protocol.AvaClawPhotosCommand
import ai.avaclaw.app.protocol.AvaClawSmsCommand
import ai.avaclaw.app.protocol.AvaClawSystemCommand
import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Test

class InvokeCommandRegistryTest {
  private val coreCapabilities =
    setOf(
      AvaClawCapability.Canvas.rawValue,
      AvaClawCapability.Device.rawValue,
      AvaClawCapability.Notifications.rawValue,
      AvaClawCapability.System.rawValue,
      AvaClawCapability.Photos.rawValue,
      AvaClawCapability.Contacts.rawValue,
      AvaClawCapability.Calendar.rawValue,
      AvaClawCapability.CallLog.rawValue,
    )

  private val optionalCapabilities =
    setOf(
      AvaClawCapability.Camera.rawValue,
      AvaClawCapability.Location.rawValue,
      AvaClawCapability.Sms.rawValue,
      AvaClawCapability.VoiceWake.rawValue,
      AvaClawCapability.Motion.rawValue,
    )

  private val coreCommands =
    setOf(
      AvaClawDeviceCommand.Status.rawValue,
      AvaClawDeviceCommand.Info.rawValue,
      AvaClawDeviceCommand.Permissions.rawValue,
      AvaClawDeviceCommand.Health.rawValue,
      AvaClawNotificationsCommand.List.rawValue,
      AvaClawNotificationsCommand.Actions.rawValue,
      AvaClawSystemCommand.Notify.rawValue,
      AvaClawPhotosCommand.Latest.rawValue,
      AvaClawContactsCommand.Search.rawValue,
      AvaClawContactsCommand.Add.rawValue,
      AvaClawCalendarCommand.Events.rawValue,
      AvaClawCalendarCommand.Add.rawValue,
      AvaClawCallLogCommand.Search.rawValue,
    )

  private val optionalCommands =
    setOf(
      AvaClawCameraCommand.Snap.rawValue,
      AvaClawCameraCommand.Clip.rawValue,
      AvaClawCameraCommand.List.rawValue,
      AvaClawLocationCommand.Get.rawValue,
      AvaClawMotionCommand.Activity.rawValue,
      AvaClawMotionCommand.Pedometer.rawValue,
      AvaClawSmsCommand.Send.rawValue,
    )

  private val debugCommands = setOf("debug.logs", "debug.ed25519")

  @Test
  fun advertisedCapabilities_respectsFeatureAvailability() {
    val capabilities = InvokeCommandRegistry.advertisedCapabilities(defaultFlags())

    assertContainsAll(capabilities, coreCapabilities)
    assertMissingAll(capabilities, optionalCapabilities)
  }

  @Test
  fun advertisedCapabilities_includesFeatureCapabilitiesWhenEnabled() {
    val capabilities =
      InvokeCommandRegistry.advertisedCapabilities(
        defaultFlags(
          cameraEnabled = true,
          locationEnabled = true,
          smsAvailable = true,
          voiceWakeEnabled = true,
          motionActivityAvailable = true,
          motionPedometerAvailable = true,
        ),
      )

    assertContainsAll(capabilities, coreCapabilities + optionalCapabilities)
  }

  @Test
  fun advertisedCommands_respectsFeatureAvailability() {
    val commands = InvokeCommandRegistry.advertisedCommands(defaultFlags())

    assertContainsAll(commands, coreCommands)
    assertMissingAll(commands, optionalCommands + debugCommands)
  }

  @Test
  fun advertisedCommands_includesFeatureCommandsWhenEnabled() {
    val commands =
      InvokeCommandRegistry.advertisedCommands(
        defaultFlags(
          cameraEnabled = true,
          locationEnabled = true,
          smsAvailable = true,
          motionActivityAvailable = true,
          motionPedometerAvailable = true,
          debugBuild = true,
        ),
      )

    assertContainsAll(commands, coreCommands + optionalCommands + debugCommands)
  }

  @Test
  fun advertisedCommands_onlyIncludesSupportedMotionCommands() {
    val commands =
      InvokeCommandRegistry.advertisedCommands(
        NodeRuntimeFlags(
          cameraEnabled = false,
          locationEnabled = false,
          smsAvailable = false,
          voiceWakeEnabled = false,
          motionActivityAvailable = true,
          motionPedometerAvailable = false,
          debugBuild = false,
        ),
      )

    assertTrue(commands.contains(AvaClawMotionCommand.Activity.rawValue))
    assertFalse(commands.contains(AvaClawMotionCommand.Pedometer.rawValue))
  }

  private fun defaultFlags(
    cameraEnabled: Boolean = false,
    locationEnabled: Boolean = false,
    smsAvailable: Boolean = false,
    voiceWakeEnabled: Boolean = false,
    motionActivityAvailable: Boolean = false,
    motionPedometerAvailable: Boolean = false,
    debugBuild: Boolean = false,
  ): NodeRuntimeFlags =
    NodeRuntimeFlags(
      cameraEnabled = cameraEnabled,
      locationEnabled = locationEnabled,
      smsAvailable = smsAvailable,
      voiceWakeEnabled = voiceWakeEnabled,
      motionActivityAvailable = motionActivityAvailable,
      motionPedometerAvailable = motionPedometerAvailable,
      debugBuild = debugBuild,
    )

  private fun assertContainsAll(actual: List<String>, expected: Set<String>) {
    expected.forEach { value -> assertTrue(actual.contains(value)) }
  }

  private fun assertMissingAll(actual: List<String>, forbidden: Set<String>) {
    forbidden.forEach { value -> assertFalse(actual.contains(value)) }
  }
}
