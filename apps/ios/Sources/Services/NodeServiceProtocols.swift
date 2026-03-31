import CoreLocation
import Foundation
import AvaClawKit
import UIKit

typealias AvaClawCameraSnapResult = (format: String, base64: String, width: Int, height: Int)
typealias AvaClawCameraClipResult = (format: String, base64: String, durationMs: Int, hasAudio: Bool)

protocol CameraServicing: Sendable {
    func listDevices() async -> [CameraController.CameraDeviceInfo]
    func snap(params: AvaClawCameraSnapParams) async throws -> AvaClawCameraSnapResult
    func clip(params: AvaClawCameraClipParams) async throws -> AvaClawCameraClipResult
}

protocol ScreenRecordingServicing: Sendable {
    func record(
        screenIndex: Int?,
        durationMs: Int?,
        fps: Double?,
        includeAudio: Bool?,
        outPath: String?) async throws -> String
}

@MainActor
protocol LocationServicing: Sendable {
    func authorizationStatus() -> CLAuthorizationStatus
    func accuracyAuthorization() -> CLAccuracyAuthorization
    func ensureAuthorization(mode: AvaClawLocationMode) async -> CLAuthorizationStatus
    func currentLocation(
        params: AvaClawLocationGetParams,
        desiredAccuracy: AvaClawLocationAccuracy,
        maxAgeMs: Int?,
        timeoutMs: Int?) async throws -> CLLocation
    func startLocationUpdates(
        desiredAccuracy: AvaClawLocationAccuracy,
        significantChangesOnly: Bool) -> AsyncStream<CLLocation>
    func stopLocationUpdates()
    func startMonitoringSignificantLocationChanges(onUpdate: @escaping @Sendable (CLLocation) -> Void)
    func stopMonitoringSignificantLocationChanges()
}

@MainActor
protocol DeviceStatusServicing: Sendable {
    func status() async throws -> AvaClawDeviceStatusPayload
    func info() -> AvaClawDeviceInfoPayload
}

protocol PhotosServicing: Sendable {
    func latest(params: AvaClawPhotosLatestParams) async throws -> AvaClawPhotosLatestPayload
}

protocol ContactsServicing: Sendable {
    func search(params: AvaClawContactsSearchParams) async throws -> AvaClawContactsSearchPayload
    func add(params: AvaClawContactsAddParams) async throws -> AvaClawContactsAddPayload
}

protocol CalendarServicing: Sendable {
    func events(params: AvaClawCalendarEventsParams) async throws -> AvaClawCalendarEventsPayload
    func add(params: AvaClawCalendarAddParams) async throws -> AvaClawCalendarAddPayload
}

protocol RemindersServicing: Sendable {
    func list(params: AvaClawRemindersListParams) async throws -> AvaClawRemindersListPayload
    func add(params: AvaClawRemindersAddParams) async throws -> AvaClawRemindersAddPayload
}

protocol MotionServicing: Sendable {
    func activities(params: AvaClawMotionActivityParams) async throws -> AvaClawMotionActivityPayload
    func pedometer(params: AvaClawPedometerParams) async throws -> AvaClawPedometerPayload
}

struct WatchMessagingStatus: Sendable, Equatable {
    var supported: Bool
    var paired: Bool
    var appInstalled: Bool
    var reachable: Bool
    var activationState: String
}

struct WatchQuickReplyEvent: Sendable, Equatable {
    var replyId: String
    var promptId: String
    var actionId: String
    var actionLabel: String?
    var sessionKey: String?
    var note: String?
    var sentAtMs: Int?
    var transport: String
}

struct WatchNotificationSendResult: Sendable, Equatable {
    var deliveredImmediately: Bool
    var queuedForDelivery: Bool
    var transport: String
}

protocol WatchMessagingServicing: AnyObject, Sendable {
    func status() async -> WatchMessagingStatus
    func setReplyHandler(_ handler: (@Sendable (WatchQuickReplyEvent) -> Void)?)
    func sendNotification(
        id: String,
        params: AvaClawWatchNotifyParams) async throws -> WatchNotificationSendResult
}

extension CameraController: CameraServicing {}
extension ScreenRecordService: ScreenRecordingServicing {}
extension LocationService: LocationServicing {}
