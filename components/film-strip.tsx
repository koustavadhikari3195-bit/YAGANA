"use client";

import React from "react";

/**
 * FilmStrip — The physical film container with CSS-gradient sprocket holes.
 * Wraps children in a Kodak-style 35mm film strip with:
 * - Repeating sprocket holes (left & right) via radial-gradient
 * - Frame counters (1A, 2A, 3A...) via CSS counters
 * - Dark film base (#1a1a1a)
 */

interface FilmStripProps {
    children: React.ReactNode;
    className?: string;
}

export default function FilmStrip({ children, className = "" }: FilmStripProps) {
    return (
        <div className={`film-strip-container ${className}`}>
            {children}

            <style jsx>{`
                /* ─── The Container ─── */
                .film-strip-container {
                    width: 100%;
                    max-width: 1400px;
                    margin: 0 auto;
                    background-color: #1a1a1a;
                    padding: 0 60px;
                    position: relative;
                    overflow: hidden;
                    counter-reset: section;
                }

                /* ─── The Sprocket Holes (Left & Right) ─── */
                .film-strip-container::before,
                .film-strip-container::after {
                    content: "";
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    width: 40px;
                    background-image: radial-gradient(circle, transparent 40%, #1a1a1a 41%);
                    background-size: 100% 60px;
                    background-repeat: repeat-y;
                    z-index: 10;
                    pointer-events: none;
                }
                .film-strip-container::before {
                    left: 0;
                    border-right: 2px solid #333;
                }
                .film-strip-container::after {
                    right: 0;
                    border-left: 2px solid #333;
                }

                @media (max-width: 768px) {
                    .film-strip-container {
                        padding: 0 36px;
                    }
                    .film-strip-container::before,
                    .film-strip-container::after {
                        width: 24px;
                        background-size: 100% 40px;
                    }
                }
            `}</style>
        </div>
    );
}

/**
 * FilmFrame — Individual frame inside the strip with auto-numbered counter.
 * Each frame gets "1A", "2A", "3A"... Kodak-gold labels in the sprocket margin.
 */
interface FilmFrameProps {
    children: React.ReactNode;
    className?: string;
}

export function FilmFrame({ children, className = "" }: FilmFrameProps) {
    return (
        <div className={`film-frame ${className}`}>
            {children}

            <style jsx>{`
                .film-frame {
                    counter-increment: section;
                    position: relative;
                    border-bottom: 2px solid #333;
                }
                .film-frame::before {
                    content: counter(section) "A";
                    position: absolute;
                    left: -50px;
                    top: 50%;
                    color: #fbbf24;
                    font-family: "Courier New", monospace;
                    font-size: 11px;
                    font-weight: 700;
                    letter-spacing: 0.05em;
                    transform: rotate(-90deg);
                    transform-origin: center;
                    z-index: 15;
                    pointer-events: none;
                }
                /* Kodak edge markings on right side */
                .film-frame::after {
                    content: "◆ KODAK 5207 ◆";
                    position: absolute;
                    right: -55px;
                    bottom: 30%;
                    color: #fbbf2466;
                    font-family: "Courier New", monospace;
                    font-size: 7px;
                    letter-spacing: 0.15em;
                    transform: rotate(-90deg);
                    transform-origin: center;
                    z-index: 15;
                    pointer-events: none;
                    white-space: nowrap;
                }

                @media (max-width: 768px) {
                    .film-frame::before {
                        left: -30px;
                        font-size: 9px;
                    }
                    .film-frame::after {
                        display: none;
                    }
                }
            `}</style>
        </div>
    );
}
