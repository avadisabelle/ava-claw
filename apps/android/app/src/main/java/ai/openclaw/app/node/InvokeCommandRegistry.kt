package ai.avaclaw.app.node

import ai.avaclaw.app.protocol.AvaClawCalendarCommand
import ai.avaclaw.app.protocol.AvaClawCanvasA2UICommand
import ai.avaclaw.app.protocol.AvaClawCanvasCommand
import ai.avaclaw.app.protocol.AvaClawCameraCommand
import ai.avaclaw.app.protocol.AvaClawCapability
import ai.avaclaw.app.protocol.AvaClawCallLogCommand
import ai.avaclaw.app.protocol.AvaClawContactsCommand
import ai.avaclaw.app.protocol.AvaClawDeviceCommand
import ai.avaclaw.app.protocol.AvaClawLocationCommand
import ai.avaclaw.app.protocol.AvaClawMotionCommand
import ai.avaclaw.app.protocol.AvaClawNotificationsCommand
import ai.avaclaw.app.protocol.AvaClawPhotosCommand
import ai.avaclaw.app.protocol.AvaClawSmsCommand
import ai.avaclaw.app.protocol.AvaClawSystemCommand

data class NodeRuntimeFlags(
  val cameraEnabled: Boolean,
  val locationEnabled: Boolean,
  val smsAvailable: Boolean,
  val voiceWakeEnabled: Boolean,
  val motionActivityAvailable: Boolean,
  val motionPedometerAvailable: Boolean,
  val debugBuild: Boolean,
)

enum class InvokeCommandAvailability {
  Always,
  CameraEnabled,
  LocationEnabled,
  SmsAvailable,
  MotionActivityAvailable,
  MotionPedometerAvailable,
  DebugBuild,
}

enum class NodeCapabilityAvailability {
  Always,
  CameraEnabled,
  LocationEnabled,
  SmsAvailable,
  VoiceWakeEnabled,
  MotionAvailable,
}

data class NodeCapabilitySpec(
  val name: String,
  val availability: NodeCapabilityAvailability = NodeCapabilityAvailability.Always,
)

data class InvokeCommandSpec(
  val name: String,
  val requiresForeground: Boolean = false,
  val availability: InvokeCommandAvailability = InvokeCommandAvailability.Always,
)

object InvokeCommandRegistry {
  val capabilityManifest: List<NodeCapabilitySpec> =
    listOf(
      NodeCapabilitySpec(name = AvaClawCapability.Canvas.rawValue),
      NodeCapabilitySpec(name = AvaClawCapability.Device.rawValue),
      NodeCapabilitySpec(name = AvaClawCapability.Notifications.rawValue),
      NodeCapabilitySpec(name = AvaClawCapability.System.rawValue),
      NodeCapabilitySpec(
        name = AvaClawCapability.Camera.rawValue,
        availability = NodeCapabilityAvailability.CameraEnabled,
      ),
      NodeCapabilitySpec(
        name = AvaClawCapability.Sms.rawValue,
        availability = NodeCapabilityAvailability.SmsAvailable,
      ),
      NodeCapabilitySpec(
        name = AvaClawCapability.VoiceWake.rawValue,
        availability = NodeCapabilityAvailability.VoiceWakeEnabled,
      ),
      NodeCapabilitySpec(
        name = AvaClawCapability.Location.rawValue,
        availability = NodeCapabilityAvailability.LocationEnabled,
      ),
      NodeCapabilitySpec(name = AvaClawCapability.Photos.rawValue),
      NodeCapabilitySpec(name = AvaClawCapability.Contacts.rawValue),
      NodeCapabilitySpec(name = AvaClawCapability.Calendar.rawValue),
      NodeCapabilitySpec(
        name = AvaClawCapability.Motion.rawValue,
        availability = NodeCapabilityAvailability.MotionAvailable,
      ),
      NodeCapabilitySpec(name = AvaClawCapability.CallLog.rawValue),
    )

  val all: List<InvokeCommandSpec> =
    listOf(
      InvokeCommandSpec(
        name = AvaClawCanvasCommand.Present.rawValue,
        requiresForeground = true,
      ),
      InvokeCommandSpec(
        name = AvaClawCanvasCommand.Hide.rawValue,
        requiresForeground = true,
      ),
      InvokeCommandSpec(
        name = AvaClawCanvasCommand.Navigate.rawValue,
        requiresForeground = true,
      ),
      InvokeCommandSpec(
        name = AvaClawCanvasCommand.Eval.rawValue,
        requiresForeground = true,
      ),
      InvokeCommandSpec(
        name = AvaClawCanvasCommand.Snapshot.rawValue,
        requiresForeground = true,
      ),
      InvokeCommandSpec(
        name = AvaClawCanvasA2UICommand.Push.rawValue,
        requiresForeground = true,
      ),
      InvokeCommandSpec(
        name = AvaClawCanvasA2UICommand.PushJSONL.rawValue,
        requiresForeground = true,
      ),
      InvokeCommandSpec(
        name = AvaClawCanvasA2UICommand.Reset.rawValue,
        requiresForeground = true,
      ),
      InvokeCommandSpec(
        name = AvaClawSystemCommand.Notify.rawValue,
      ),
      InvokeCommandSpec(
        name = AvaClawCameraCommand.List.rawValue,
        requiresForeground = true,
        availability = InvokeCommandAvailability.CameraEnabled,
      ),
      InvokeCommandSpec(
        name = AvaClawCameraCommand.Snap.rawValue,
        requiresForeground = true,
        availability = InvokeCommandAvailability.CameraEnabled,
      ),
      InvokeCommandSpec(
        name = AvaClawCameraCommand.Clip.rawValue,
        requiresForeground = true,
        availability = InvokeCommandAvailability.CameraEnabled,
      ),
      InvokeCommandSpec(
        name = AvaClawLocationCommand.Get.rawValue,
        availability = InvokeCommandAvailability.LocationEnabled,
      ),
      InvokeCommandSpec(
        name = AvaClawDeviceCommand.Status.rawValue,
      ),
      InvokeCommandSpec(
        name = AvaClawDeviceCommand.Info.rawValue,
      ),
      InvokeCommandSpec(
        name = AvaClawDeviceCommand.Permissions.rawValue,
      ),
      InvokeCommandSpec(
        name = AvaClawDeviceCommand.Health.rawValue,
      ),
      InvokeCommandSpec(
        name = AvaClawNotificationsCommand.List.rawValue,
      ),
      InvokeCommandSpec(
        name = AvaClawNotificationsCommand.Actions.rawValue,
      ),
      InvokeCommandSpec(
        name = AvaClawPhotosCommand.Latest.rawValue,
      ),
      InvokeCommandSpec(
        name = AvaClawContactsCommand.Search.rawValue,
      ),
      InvokeCommandSpec(
        name = AvaClawContactsCommand.Add.rawValue,
      ),
      InvokeCommandSpec(
        name = AvaClawCalendarCommand.Events.rawValue,
      ),
      InvokeCommandSpec(
        name = AvaClawCalendarCommand.Add.rawValue,
      ),
      InvokeCommandSpec(
        name = AvaClawMotionCommand.Activity.rawValue,
        availability = InvokeCommandAvailability.MotionActivityAvailable,
      ),
      InvokeCommandSpec(
        name = AvaClawMotionCommand.Pedometer.rawValue,
        availability = InvokeCommandAvailability.MotionPedometerAvailable,
      ),
      InvokeCommandSpec(
        name = AvaClawSmsCommand.Send.rawValue,
        availability = InvokeCommandAvailability.SmsAvailable,
      ),
      InvokeCommandSpec(
        name = AvaClawCallLogCommand.Search.rawValue,
      ),
      InvokeCommandSpec(
        name = "debug.logs",
        availability = InvokeCommandAvailability.DebugBuild,
      ),
      InvokeCommandSpec(
        name = "debug.ed25519",
        availability = InvokeCommandAvailability.DebugBuild,
      ),
    )

  private val byNameInternal: Map<String, InvokeCommandSpec> = all.associateBy { it.name }

  fun find(command: String): InvokeCommandSpec? = byNameInternal[command]

  fun advertisedCapabilities(flags: NodeRuntimeFlags): List<String> {
    return capabilityManifest
      .filter { spec ->
        when (spec.availability) {
          NodeCapabilityAvailability.Always -> true
          NodeCapabilityAvailability.CameraEnabled -> flags.cameraEnabled
          NodeCapabilityAvailability.LocationEnabled -> flags.locationEnabled
          NodeCapabilityAvailability.SmsAvailable -> flags.smsAvailable
          NodeCapabilityAvailability.VoiceWakeEnabled -> flags.voiceWakeEnabled
          NodeCapabilityAvailability.MotionAvailable -> flags.motionActivityAvailable || flags.motionPedometerAvailable
        }
      }
      .map { it.name }
  }

  fun advertisedCommands(flags: NodeRuntimeFlags): List<String> {
    return all
      .filter { spec ->
        when (spec.availability) {
          InvokeCommandAvailability.Always -> true
          InvokeCommandAvailability.CameraEnabled -> flags.cameraEnabled
          InvokeCommandAvailability.LocationEnabled -> flags.locationEnabled
          InvokeCommandAvailability.SmsAvailable -> flags.smsAvailable
          InvokeCommandAvailability.MotionActivityAvailable -> flags.motionActivityAvailable
          InvokeCommandAvailability.MotionPedometerAvailable -> flags.motionPedometerAvailable
          InvokeCommandAvailability.DebugBuild -> flags.debugBuild
        }
      }
      .map { it.name }
  }
}
