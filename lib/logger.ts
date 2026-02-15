/**
 * ═══════════════════════════════════════════════════════════
 * ERROR LOGGING UTILITY — Yagna Wedding Photography Platform
 * ═══════════════════════════════════════════════════════════
 *
 * Centralized logger for both client and server.
 * - Logs are written to the browser console (client) and stdout (server).
 * - In production, errors are collected into structured JSON.
 * - QA can check the browser DevTools console for client logs.
 * - Server logs are printed to the terminal running `npm run dev`.
 *
 * Usage:
 *   import { logger } from "@/lib/logger";
 *   logger.info("Gallery", "Loaded 12 images");
 *   logger.error("Upload", "Failed to upload", { file: "photo.jpg", error: err });
 *   logger.warn("Auth", "Session expired");
 */

export type LogLevel = "DEBUG" | "INFO" | "WARN" | "ERROR";

interface LogEntry {
    timestamp: string;
    level: LogLevel;
    module: string;
    message: string;
    data?: unknown;
}

// In-memory log buffer (last 200 entries) — accessible to QA via window.__APP_LOGS__
const LOG_BUFFER: LogEntry[] = [];
const MAX_BUFFER = 200;

function createEntry(level: LogLevel, module: string, message: string, data?: unknown): LogEntry {
    return {
        timestamp: new Date().toISOString(),
        level,
        module,
        message,
        data,
    };
}

function pushToBuffer(entry: LogEntry) {
    LOG_BUFFER.push(entry);
    if (LOG_BUFFER.length > MAX_BUFFER) {
        LOG_BUFFER.shift();
    }

    // Expose to browser DevTools for QA
    if (typeof window !== "undefined") {
        (window as unknown as Record<string, unknown>).__APP_LOGS__ = LOG_BUFFER;
    }
}

function formatLog(entry: LogEntry): string {
    return `[${entry.timestamp}] [${entry.level}] [${entry.module}] ${entry.message}`;
}

export const logger = {
    debug(module: string, message: string, data?: unknown) {
        const entry = createEntry("DEBUG", module, message, data);
        pushToBuffer(entry);
        if (process.env.NODE_ENV !== "production") {
            console.debug(formatLog(entry), data ?? "");
        }
    },

    info(module: string, message: string, data?: unknown) {
        const entry = createEntry("INFO", module, message, data);
        pushToBuffer(entry);
        console.info(formatLog(entry), data ?? "");
    },

    warn(module: string, message: string, data?: unknown) {
        const entry = createEntry("WARN", module, message, data);
        pushToBuffer(entry);
        console.warn(formatLog(entry), data ?? "");
    },

    error(module: string, message: string, data?: unknown) {
        const entry = createEntry("ERROR", module, message, data);
        pushToBuffer(entry);
        console.error(formatLog(entry), data ?? "");
    },

    /** Get all buffered logs — useful for QA or sending to an endpoint */
    getAll(): LogEntry[] {
        return [...LOG_BUFFER];
    },

    /** Get only error-level logs */
    getErrors(): LogEntry[] {
        return LOG_BUFFER.filter((e) => e.level === "ERROR");
    },

    /** Clear the buffer */
    clear() {
        LOG_BUFFER.length = 0;
    },
};
