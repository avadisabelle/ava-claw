package ai.avaclaw.app.protocol

import org.junit.Assert.assertEquals
import org.junit.Test

class AvaClawProtocolConstantsTest {
  @Test
  fun canvasCommandsUseStableStrings() {
    assertEquals("canvas.present", AvaClawCanvasCommand.Present.rawValue)
    assertEquals("canvas.hide", AvaClawCanvasCommand.Hide.rawValue)
    assertEquals("canvas.navigate", AvaClawCanvasCommand.Navigate.rawValue)
    assertEquals("canvas.eval", AvaClawCanvasCommand.Eval.rawValue)
    assertEquals("canvas.snapshot", AvaClawCanvasCommand.Snapshot.rawValue)
  }

  @Test
  fun a2uiCommandsUseStableStrings() {
    assertEquals("canvas.a2ui.push", AvaClawCanvasA2UICommand.Push.rawValue)
    assertEquals("canvas.a2ui.pushJSONL", AvaClawCanvasA2UICommand.PushJSONL.rawValue)
    assertEquals("canvas.a2ui.reset", AvaClawCanvasA2UICommand.Reset.rawValue)
  }

  @Test
  fun capabilitiesUseStableStrings() {
    assertEquals("canvas", AvaClawCapability.Canvas.rawValue)
    assertEquals("camera", AvaClawCapability.Camera.rawValue)
    assertEquals("voiceWake", AvaClawCapability.VoiceWake.rawValue)
    assertEquals("location", AvaClawCapability.Location.rawValue)
    assertEquals("sms", AvaClawCapability.Sms.rawValue)
    assertEquals("device", AvaClawCapability.Device.rawValue)
    assertEquals("notifications", AvaClawCapability.Notifications.rawValue)
    assertEquals("system", AvaClawCapability.System.rawValue)
    assertEquals("photos", AvaClawCapability.Photos.rawValue)
    assertEquals("contacts", AvaClawCapability.Contacts.rawValue)
    assertEquals("calendar", AvaClawCapability.Calendar.rawValue)
    assertEquals("motion", AvaClawCapability.Motion.rawValue)
    assertEquals("callLog", AvaClawCapability.CallLog.rawValue)
  }

  @Test
  fun cameraCommandsUseStableStrings() {
    assertEquals("camera.list", AvaClawCameraCommand.List.rawValue)
    assertEquals("camera.snap", AvaClawCameraCommand.Snap.rawValue)
    assertEquals("camera.clip", AvaClawCameraCommand.Clip.rawValue)
  }

  @Test
  fun notificationsCommandsUseStableStrings() {
    assertEquals("notifications.list", AvaClawNotificationsCommand.List.rawValue)
    assertEquals("notifications.actions", AvaClawNotificationsCommand.Actions.rawValue)
  }

  @Test
  fun deviceCommandsUseStableStrings() {
    assertEquals("device.status", AvaClawDeviceCommand.Status.rawValue)
    assertEquals("device.info", AvaClawDeviceCommand.Info.rawValue)
    assertEquals("device.permissions", AvaClawDeviceCommand.Permissions.rawValue)
    assertEquals("device.health", AvaClawDeviceCommand.Health.rawValue)
  }

  @Test
  fun systemCommandsUseStableStrings() {
    assertEquals("system.notify", AvaClawSystemCommand.Notify.rawValue)
  }

  @Test
  fun photosCommandsUseStableStrings() {
    assertEquals("photos.latest", AvaClawPhotosCommand.Latest.rawValue)
  }

  @Test
  fun contactsCommandsUseStableStrings() {
    assertEquals("contacts.search", AvaClawContactsCommand.Search.rawValue)
    assertEquals("contacts.add", AvaClawContactsCommand.Add.rawValue)
  }

  @Test
  fun calendarCommandsUseStableStrings() {
    assertEquals("calendar.events", AvaClawCalendarCommand.Events.rawValue)
    assertEquals("calendar.add", AvaClawCalendarCommand.Add.rawValue)
  }

  @Test
  fun motionCommandsUseStableStrings() {
    assertEquals("motion.activity", AvaClawMotionCommand.Activity.rawValue)
    assertEquals("motion.pedometer", AvaClawMotionCommand.Pedometer.rawValue)
  }

  @Test
  fun callLogCommandsUseStableStrings() {
    assertEquals("callLog.search", AvaClawCallLogCommand.Search.rawValue)
  }
}
