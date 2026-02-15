"use client";

import React from "react";
import { logger } from "@/lib/logger";
import { AlertCircle, RefreshCw } from "lucide-react";

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends React.Component<
    { children: React.ReactNode; fallbackModule?: string },
    ErrorBoundaryState
> {
    constructor(props: { children: React.ReactNode; fallbackModule?: string }) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        logger.error(
            this.props.fallbackModule || "ErrorBoundary",
            `Uncaught error: ${error.message}`,
            {
                stack: error.stack,
                componentStack: errorInfo.componentStack,
            }
        );
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-[300px] flex items-center justify-center p-8">
                    <div className="bg-red-50 border border-red-200 rounded-2xl p-8 max-w-md text-center">
                        <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-red-800 mb-2">
                            Something went wrong
                        </h3>
                        <p className="text-sm text-red-600 mb-4">
                            {this.state.error?.message || "An unexpected error occurred"}
                        </p>
                        <button
                            onClick={() => this.setState({ hasError: false, error: null })}
                            className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
                        >
                            <RefreshCw className="w-4 h-4" />
                            Try Again
                        </button>
                        <p className="text-xs text-red-400 mt-4">
                            QA: Check <code>window.__APP_LOGS__</code> in DevTools for details
                        </p>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
