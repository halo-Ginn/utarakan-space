'use client'

// UTARAKAN — Foyer v3
// Location: app/components/Foyer.tsx  (GANTI seluruh isi file lama)
// v3: + riak mengikuti kursor (dari desain Canva), tanpa daun emoji,
//     cincin cahaya tembaga berputar, latar top-aligned + transparan di bawah.

import { useEffect, useRef, useState } from 'react'

const RIPPLE_COLORS = ['#e8b896', '#d4a574', '#c9905f', '#daa070']

export default function Foyer() {
    const [show, setShow] = useState(false)
    const [leaving, setLeaving] = useState(false)
    const rootRef = useRef<HTMLDivElement | null>(null)
    const lastRipple = useRef(0)
    const [soundOn, setSoundOn] = useState(false)

    useEffect(() => {
        try { document.getElementById('foyer-preload')?.remove() } catch { }
        try {
            if (!sessionStorage.getItem('utarakan-foyer-seen')) setShow(true)
        } catch { setShow(true) }
        const openFoyer = () => { setLeaving(false); setShow(true) }
        window.addEventListener('utarakan-open-foyer', openFoyer)
        return () => window.removeEventListener('utarakan-open-foyer', openFoyer)
    }, [])

    function enter() {
        if (leaving) return
        setLeaving(true)
        try { sessionStorage.setItem('utarakan-foyer-seen', '1') } catch { }
        setTimeout(() => setShow(false), 1100)
    }

    function spawnRipple(x: number, y: number) {
        const now = Date.now()
        if (now - lastRipple.current < 80) return
        lastRipple.current = now
        const root = rootRef.current
        if (!root) return
        const ring = document.createElement('div')
        ring.className = 'foyer-cursor-ripple'
        ring.style.left = x + 'px'
        ring.style.top = y + 'px'
        ring.style.borderColor = RIPPLE_COLORS[Math.floor(Math.random() * RIPPLE_COLORS.length)]
        root.appendChild(ring)
        setTimeout(() => ring.remove(), 1500)
    }

    if (!show) return null

    const center = {
        position: 'absolute' as const,
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
    }

    return (
        <div
            ref={rootRef}
            onPointerMove={(e) => spawnRipple(e.clientX, e.clientY)}
            style={{
                visibility: 'visible',
                position: 'fixed', inset: 0, zIndex: 9999, cursor: 'default',
                overflow: 'hidden',
                backgroundColor: '#2d3b2d',
                backgroundImage:
                    "linear-gradient(180deg, rgba(34,49,34,0.72) 0%, rgba(45,59,45,0.45) 55%, rgba(45,59,45,0) 100%), url('/foyer-bg.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'top center',
                opacity: leaving ? 0 : 1,
                transition: 'opacity 1.1s ease',
            }}
        >
            {/* cahaya lembut yang bernafas */}
            <div style={{
                ...center, width: '520px', height: '520px', borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(212,175,55,0.18) 0%, rgba(184,115,51,0.09) 45%, transparent 70%)',
                animation: 'foyer-breathe 6s ease-in-out infinite'
            }} />

            {/* riak melingkar dari tengah */}
            <div className="foyer-ripple" style={{ ...center, animationDelay: '0s' }} />
            <div className="foyer-ripple" style={{ ...center, animationDelay: '2s' }} />
            <div className="foyer-ripple" style={{ ...center, animationDelay: '4s' }} />

            {/* cincin emas tetap di sekeliling logo */}
            <div style={{
                ...center, width: '168px', height: '168px', borderRadius: '50%',
                border: '1.5px solid rgba(212,175,55,0.55)',
                boxShadow: '0 0 24px rgba(212,175,55,0.25) inset, 0 0 24px rgba(212,175,55,0.2)',
                animation: 'foyer-breathe 6s ease-in-out infinite'
            }} />

            {/* cincin cahaya tembaga berputar (efek dari desain Canva) */}
            <div style={{
                ...center, width: '208px', height: '208px', borderRadius: '50%',
                background: 'conic-gradient(from 0deg, transparent 0%, #d4a574 40%, #e8b896 70%, transparent 100%)',
                WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 10px), #000 calc(100% - 2px))',
                mask: 'radial-gradient(farthest-side, transparent calc(100% - 12px), #000 calc(100% - 2px))',
                animation: 'foyer-orbit 4s linear infinite'
            }} />

            {/* logo */}
            <img src="/logo.png" alt="Utarakan"
                style={{
                    ...center, width: '128px', height: '128px', borderRadius: '50%', zIndex: 2,
                    boxShadow: '0 0 60px rgba(212,175,55,0.4), 0 0 120px rgba(184,115,51,0.22)',
                    animation: 'foyer-breathe 6s ease-in-out infinite'
                }} />

            {/* area sentuh: logo + cincin */}
            <button
                onClick={enter}
                aria-label="Masuk ke Utarakan"
                style={{
                    ...center, width: '230px', height: '230px', borderRadius: '50%',
                    background: 'transparent', border: 'none', cursor: 'pointer', zIndex: 4, padding: 0
                }}
            />

            {/* teks */}
            {/* teks */}
            <h1 className="font-serif" style={{
                position: 'absolute', top: 'calc(50% + 130px)', left: '50%', transform: 'translateX(-50%)',
                width: 'max-content', fontSize: 'clamp(20px, 8vw, 52px)',
                whiteSpace: 'nowrap',
                letterSpacing: '0.02em',
                maxWidth: '94vw', textAlign: 'center', fontWeight: 700, zIndex: 2,
                background: 'linear-gradient(135deg, #7a5635 0%, #ce9b71 35%, #a79761ff 50%, #a79b73 65%, #7a5635 100%)',
                WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
                filter: 'drop-shadow(0 6px 20px rgba(68, 55, 40, 0.5)) drop-shadow(0 2px 8px rgba(0,0,0,0.35))'
            }}>
                U t a r a k a n . S p a c e
            </h1>
            <p style={{
                position: 'absolute', top: 'calc(50% + 196px)', left: '50%', transform: 'translateX(-50%)',
                width: 'max-content', maxWidth: '92vw', textAlign: 'center', color: '#f8e284', fontSize: '15px', letterSpacing: '0.25em', zIndex: 2,
                textShadow: '0 1px 8px rgba(0,0,0,0.45)', animation: 'foyer-fade 4s ease-in-out infinite'
            }}>
                ..di sini kita bisa bercerita..
            </p>
            <p style={{
                position: 'absolute', top: 'calc(50% + 232px)', left: '50%', transform: 'translateX(-50%)',
                width: 'max-content', maxWidth: '92vw', textAlign: 'center', color: 'rgba(220,231,220,0.7)', fontSize: '12px',
                letterSpacing: '0.14em', textTransform: 'uppercase', textShadow: '0 1px 6px rgba(0,0,0,0.4)', zIndex: 2
            }}>
                ketuk teratai untuk masuk 🌿
            </p>
            <p style={{
                position: 'absolute', bottom: '12px', left: '50%', transform: 'translateX(-50%)',
                width: 'max-content', color: 'rgba(220,231,220,0.32)', fontSize: '10px',
                letterSpacing: '0.08em', zIndex: 2
            }}>
                © 2026 utarakan.space
            </p>

            {/* ikon suara */}
            <button
                onClick={(e) => {
                    e.stopPropagation()
                    window.dispatchEvent(new Event('utarakan-toggle-audio'))
                    setSoundOn(!soundOn)
                }}
                aria-label="Musik"
                style={{
                    position: 'absolute', bottom: '44px', left: '50%', transform: 'translateX(-50%)',
                    width: '38px', height: '38px', borderRadius: '50%', zIndex: 5, cursor: 'pointer',
                    background: 'rgba(45,59,45,0.3)',
                    border: soundOn ? '1.5px solid rgba(212,175,55,0.8)' : '1px solid rgba(212,175,55,0.35)',
                    boxShadow: soundOn ? '0 0 14px rgba(212,175,55,0.35)' : 'none',
                    color: soundOn ? '#f8e284' : 'rgba(220,231,220,0.7)',
                    fontSize: '17px', lineHeight: '1', transition: 'all 0.4s ease'
                }}
            >
                {soundOn ? '♫' : '♪'}
            </button>
            <style>{`
        @keyframes foyer-breathe {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.05); }
        }
        @keyframes foyer-fade {
          0%, 100% { opacity: 0.75; }
          50% { opacity: 1; }
        }
        @keyframes foyer-orbit {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to   { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes foyer-ripple-anim {
          0%   { width: 180px; height: 180px; opacity: 0.5; }
          100% { width: 640px; height: 640px; opacity: 0; }
        }
        .foyer-ripple {
          border-radius: 50%;
          border: 1.5px solid rgba(212,175,55,0.4);
          width: 180px; height: 180px;
          animation: foyer-ripple-anim 6s ease-out infinite;
          pointer-events: none;
        }
        @keyframes foyer-cursor-ripple-anim {
          0%   { width: 60px;  height: 60px;  opacity: 0.65; }
          100% { width: 180px; height: 180px; opacity: 0; }
        }
        .foyer-cursor-ripple {
          position: absolute;
          border: 2px solid;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          animation: foyer-cursor-ripple-anim 1.5s ease-out forwards;
          pointer-events: none;
        }
      `}</style>
        </div>
    )
}