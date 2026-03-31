import Foundation

public enum AvaClawCameraCommand: String, Codable, Sendable {
    case list = "camera.list"
    case snap = "camera.snap"
    case clip = "camera.clip"
}

public enum AvaClawCameraFacing: String, Codable, Sendable {
    case back
    case front
}

public enum AvaClawCameraImageFormat: String, Codable, Sendable {
    case jpg
    case jpeg
}

public enum AvaClawCameraVideoFormat: String, Codable, Sendable {
    case mp4
}

public struct AvaClawCameraSnapParams: Codable, Sendable, Equatable {
    public var facing: AvaClawCameraFacing?
    public var maxWidth: Int?
    public var quality: Double?
    public var format: AvaClawCameraImageFormat?
    public var deviceId: String?
    public var delayMs: Int?

    public init(
        facing: AvaClawCameraFacing? = nil,
        maxWidth: Int? = nil,
        quality: Double? = nil,
        format: AvaClawCameraImageFormat? = nil,
        deviceId: String? = nil,
        delayMs: Int? = nil)
    {
        self.facing = facing
        self.maxWidth = maxWidth
        self.quality = quality
        self.format = format
        self.deviceId = deviceId
        self.delayMs = delayMs
    }
}

public struct AvaClawCameraClipParams: Codable, Sendable, Equatable {
    public var facing: AvaClawCameraFacing?
    public var durationMs: Int?
    public var includeAudio: Bool?
    public var format: AvaClawCameraVideoFormat?
    public var deviceId: String?

    public init(
        facing: AvaClawCameraFacing? = nil,
        durationMs: Int? = nil,
        includeAudio: Bool? = nil,
        format: AvaClawCameraVideoFormat? = nil,
        deviceId: String? = nil)
    {
        self.facing = facing
        self.durationMs = durationMs
        self.includeAudio = includeAudio
        self.format = format
        self.deviceId = deviceId
    }
}
