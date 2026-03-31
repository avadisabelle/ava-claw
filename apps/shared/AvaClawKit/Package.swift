// swift-tools-version: 6.2

import PackageDescription

let package = Package(
    name: "AvaClawKit",
    platforms: [
        .iOS(.v18),
        .macOS(.v15),
    ],
    products: [
        .library(name: "AvaClawProtocol", targets: ["AvaClawProtocol"]),
        .library(name: "AvaClawKit", targets: ["AvaClawKit"]),
        .library(name: "AvaClawChatUI", targets: ["AvaClawChatUI"]),
    ],
    dependencies: [
        .package(url: "https://github.com/steipete/ElevenLabsKit", exact: "0.1.0"),
        .package(url: "https://github.com/gonzalezreal/textual", exact: "0.3.1"),
    ],
    targets: [
        .target(
            name: "AvaClawProtocol",
            path: "Sources/AvaClawProtocol",
            swiftSettings: [
                .enableUpcomingFeature("StrictConcurrency"),
            ]),
        .target(
            name: "AvaClawKit",
            dependencies: [
                "AvaClawProtocol",
                .product(name: "ElevenLabsKit", package: "ElevenLabsKit"),
            ],
            path: "Sources/AvaClawKit",
            resources: [
                .process("Resources"),
            ],
            swiftSettings: [
                .enableUpcomingFeature("StrictConcurrency"),
            ]),
        .target(
            name: "AvaClawChatUI",
            dependencies: [
                "AvaClawKit",
                .product(
                    name: "Textual",
                    package: "textual",
                    condition: .when(platforms: [.macOS, .iOS])),
            ],
            path: "Sources/AvaClawChatUI",
            swiftSettings: [
                .enableUpcomingFeature("StrictConcurrency"),
            ]),
        .testTarget(
            name: "AvaClawKitTests",
            dependencies: ["AvaClawKit", "AvaClawChatUI"],
            path: "Tests/AvaClawKitTests",
            swiftSettings: [
                .enableUpcomingFeature("StrictConcurrency"),
                .enableExperimentalFeature("SwiftTesting"),
            ]),
    ])
