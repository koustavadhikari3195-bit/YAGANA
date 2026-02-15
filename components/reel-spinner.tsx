"use client";

/**
 * ReelSpinner — Footer SVG film reel with infinite rotation.
 * Two counter-rotating reels connected by a film strip band.
 * Pure CSS keyframes — no JS animation overhead.
 */
export default function ReelSpinner() {
    return (
        <div className="reel-spinner-wrap">
            <div className="reel reel--left"><ReelSVG /></div>
            <div className="reel-band" />
            <div className="reel reel--right"><ReelSVG /></div>

            <style jsx>{`
                .reel-spinner-wrap {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 6rem;
                    padding: 2rem 0;
                    position: relative;
                }
                .reel {
                    width: 160px;
                    height: 160px;
                    flex-shrink: 0;
                }
                .reel--left  { animation: spin 6s linear infinite; }
                .reel--right { animation: spin 6s linear infinite reverse; }

                .reel-band {
                    position: absolute;
                    top: 50%;
                    left: 18%;
                    right: 18%;
                    height: 24px;
                    transform: translateY(-50%);
                    background: repeating-linear-gradient(
                        90deg,
                        rgba(251,191,36,0.15) 0px,
                        rgba(251,191,36,0.15) 5px,
                        transparent 5px,
                        transparent 10px
                    );
                    border-top: 1.5px solid rgba(251,191,36,0.2);
                    border-bottom: 1.5px solid rgba(251,191,36,0.2);
                }

                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to   { transform: rotate(360deg); }
                }

                @media (max-width: 768px) {
                    .reel-spinner-wrap { gap: 3rem; }
                    .reel { width: 90px; height: 90px; }
                    .reel-band { left: 12%; right: 12%; height: 16px; }
                }
            `}</style>
        </div>
    );
}

function ReelSVG() {
    return (
        <svg viewBox="0 0 160 160" fill="none" className="w-full h-full">
            {/* Outer ring */}
            <circle cx="80" cy="80" r="76" stroke="#fbbf2450" strokeWidth="2.5" fill="none" />
            <circle cx="80" cy="80" r="72" fill="#1a1a1a" stroke="#33333380" strokeWidth="1" />

            {/* Sprocket holes */}
            {Array.from({ length: 10 }, (_, i) => {
                const a = (i / 10) * Math.PI * 2;
                return (
                    <circle
                        key={`sp-${i}`}
                        cx={80 + Math.cos(a) * 62}
                        cy={80 + Math.sin(a) * 62}
                        r="6"
                        fill="#0a0005"
                        stroke="#fbbf2430"
                        strokeWidth="1.5"
                    />
                );
            })}

            {/* Inner ring */}
            <circle cx="80" cy="80" r="42" stroke="#fbbf2425" strokeWidth="1" fill="none" />
            <circle cx="80" cy="80" r="38" fill="#1a1a1a80" stroke="#33333360" strokeWidth="1" />

            {/* Inner sprockets */}
            {Array.from({ length: 5 }, (_, i) => {
                const a = (i / 5) * Math.PI * 2 + 0.3;
                return (
                    <circle
                        key={`isp-${i}`}
                        cx={80 + Math.cos(a) * 30}
                        cy={80 + Math.sin(a) * 30}
                        r="4.5"
                        fill="#0a0005"
                        stroke="#fbbf2420"
                        strokeWidth="1"
                    />
                );
            })}

            {/* Spokes */}
            {Array.from({ length: 5 }, (_, i) => {
                const a = (i / 5) * Math.PI * 2;
                return (
                    <line
                        key={`sk-${i}`}
                        x1={80 + Math.cos(a) * 16}
                        y1={80 + Math.sin(a) * 16}
                        x2={80 + Math.cos(a) * 36}
                        y2={80 + Math.sin(a) * 36}
                        stroke="#fbbf2418"
                        strokeWidth="2"
                    />
                );
            })}

            {/* Center hub */}
            <circle cx="80" cy="80" r="14" fill="#8b002050" stroke="#fbbf2440" strokeWidth="2" />
            <circle cx="80" cy="80" r="6" fill="#0a0005" stroke="#fbbf2425" strokeWidth="1" />

            {/* Sheen */}
            <circle cx="80" cy="80" r="72" fill="url(#reelSheen)" opacity="0.12" />
            <defs>
                <radialGradient id="reelSheen" cx="35%" cy="30%">
                    <stop offset="0%" stopColor="white" />
                    <stop offset="100%" stopColor="transparent" />
                </radialGradient>
            </defs>
        </svg>
    );
}
