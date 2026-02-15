"use client";

/* ─── Film Reels — Pure SVG + CSS Animation ─── */
export default function FilmReels() {
    return (
        <div className="film-reels-container">
            {/* Left reel */}
            <div className="film-reel film-reel-left">
                <FilmReelSVG />
            </div>
            {/* Right reel */}
            <div className="film-reel film-reel-right">
                <FilmReelSVG />
            </div>
            {/* Film strip connecting them */}
            <div className="film-strip" />

            <style jsx>{`
                .film-reels-container {
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8rem;
                    padding: 2rem 0;
                    overflow: hidden;
                }
                .film-reel {
                    width: 180px;
                    height: 180px;
                    flex-shrink: 0;
                }
                .film-reel-left {
                    animation: spin 8s linear infinite;
                }
                .film-reel-right {
                    animation: spin 8s linear infinite reverse;
                }
                .film-strip {
                    position: absolute;
                    top: 50%;
                    left: 15%;
                    right: 15%;
                    height: 28px;
                    background: repeating-linear-gradient(
                        90deg,
                        rgba(139, 0, 32, 0.3) 0px,
                        rgba(139, 0, 32, 0.3) 6px,
                        transparent 6px,
                        transparent 12px
                    );
                    border-top: 2px solid rgba(212, 160, 80, 0.3);
                    border-bottom: 2px solid rgba(212, 160, 80, 0.3);
                    transform: translateY(-50%);
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to   { transform: rotate(360deg); }
                }
                @media (max-width: 768px) {
                    .film-reels-container { gap: 3rem; }
                    .film-reel { width: 100px; height: 100px; }
                    .film-strip { left: 10%; right: 10%; height: 18px; }
                }
            `}</style>
        </div>
    );
}

/* ─── SVG Film Reel ─── */
function FilmReelSVG() {
    return (
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            {/* Outer ring */}
            <circle cx="100" cy="100" r="95" stroke="rgba(212,160,80,0.6)" strokeWidth="3" fill="none" />
            <circle cx="100" cy="100" r="90" stroke="rgba(139,0,32,0.4)" strokeWidth="1" fill="rgba(26,10,10,0.8)" />

            {/* Sprocket holes (outer ring) */}
            {Array.from({ length: 12 }, (_, i) => {
                const angle = (i / 12) * Math.PI * 2;
                const x = 100 + Math.cos(angle) * 78;
                const y = 100 + Math.sin(angle) * 78;
                return <circle key={`h-${i}`} cx={x} cy={y} r="8" fill="rgba(10,0,5,0.9)" stroke="rgba(212,160,80,0.4)" strokeWidth="1.5" />;
            })}

            {/* Inner ring detail */}
            <circle cx="100" cy="100" r="55" stroke="rgba(212,160,80,0.3)" strokeWidth="1" fill="none" />
            <circle cx="100" cy="100" r="50" stroke="rgba(139,0,32,0.5)" strokeWidth="2" fill="rgba(26,10,10,0.6)" />

            {/* Sprocket holes (inner ring) */}
            {Array.from({ length: 6 }, (_, i) => {
                const angle = (i / 6) * Math.PI * 2 + Math.PI / 6;
                const x = 100 + Math.cos(angle) * 40;
                const y = 100 + Math.sin(angle) * 40;
                return <circle key={`ih-${i}`} cx={x} cy={y} r="6" fill="rgba(10,0,5,0.9)" stroke="rgba(212,160,80,0.3)" strokeWidth="1" />;
            })}

            {/* Center hub */}
            <circle cx="100" cy="100" r="18" fill="rgba(139,0,32,0.6)" stroke="rgba(212,160,80,0.5)" strokeWidth="2" />
            <circle cx="100" cy="100" r="8" fill="rgba(10,0,5,0.9)" stroke="rgba(212,160,80,0.3)" strokeWidth="1" />

            {/* Spokes */}
            {Array.from({ length: 6 }, (_, i) => {
                const angle = (i / 6) * Math.PI * 2;
                const x1 = 100 + Math.cos(angle) * 20;
                const y1 = 100 + Math.sin(angle) * 20;
                const x2 = 100 + Math.cos(angle) * 48;
                const y2 = 100 + Math.sin(angle) * 48;
                return <line key={`s-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(212,160,80,0.25)" strokeWidth="2" />;
            })}

            {/* Subtle metallic sheen */}
            <circle cx="100" cy="100" r="90" fill="url(#reelGradient)" opacity={0.15} />
            <defs>
                <radialGradient id="reelGradient" cx="40%" cy="35%">
                    <stop offset="0%" stopColor="white" />
                    <stop offset="100%" stopColor="transparent" />
                </radialGradient>
            </defs>
        </svg>
    );
}
