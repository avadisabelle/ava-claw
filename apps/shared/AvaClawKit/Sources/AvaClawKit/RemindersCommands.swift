import Foundation

public enum AvaClawRemindersCommand: String, Codable, Sendable {
    case list = "reminders.list"
    case add = "reminders.add"
}

public enum AvaClawReminderStatusFilter: String, Codable, Sendable {
    case incomplete
    case completed
    case all
}

public struct AvaClawRemindersListParams: Codable, Sendable, Equatable {
    public var status: AvaClawReminderStatusFilter?
    public var limit: Int?

    public init(status: AvaClawReminderStatusFilter? = nil, limit: Int? = nil) {
        self.status = status
        self.limit = limit
    }
}

public struct AvaClawRemindersAddParams: Codable, Sendable, Equatable {
    public var title: String
    public var dueISO: String?
    public var notes: String?
    public var listId: String?
    public var listName: String?

    public init(
        title: String,
        dueISO: String? = nil,
        notes: String? = nil,
        listId: String? = nil,
        listName: String? = nil)
    {
        self.title = title
        self.dueISO = dueISO
        self.notes = notes
        self.listId = listId
        self.listName = listName
    }
}

public struct AvaClawReminderPayload: Codable, Sendable, Equatable {
    public var identifier: String
    public var title: String
    public var dueISO: String?
    public var completed: Bool
    public var listName: String?

    public init(
        identifier: String,
        title: String,
        dueISO: String? = nil,
        completed: Bool,
        listName: String? = nil)
    {
        self.identifier = identifier
        self.title = title
        self.dueISO = dueISO
        self.completed = completed
        self.listName = listName
    }
}

public struct AvaClawRemindersListPayload: Codable, Sendable, Equatable {
    public var reminders: [AvaClawReminderPayload]

    public init(reminders: [AvaClawReminderPayload]) {
        self.reminders = reminders
    }
}

public struct AvaClawRemindersAddPayload: Codable, Sendable, Equatable {
    public var reminder: AvaClawReminderPayload

    public init(reminder: AvaClawReminderPayload) {
        self.reminder = reminder
    }
}
