import React from 'react';

const LogoConstruction = ({ width = "100%", height = "auto", className = "" }) => {
    return (
        <svg
            viewBox="0 0 800 400"
            preserveAspectRatio="xMidYMid meet"
            width={width}
            height={height}
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            style={{ maxWidth: '1000px', display: 'block', margin: '0 auto' }}
        >
            {/* Sol Üstteki Yazı */}
            <text
                x="50"
                y="50"
                style={{
                    fontFamily: 'Arial, sans-serif',
                    fontWeight: 'bold',
                    fontSize: '24px',
                    fill: '#333'
                }}
            >
                Logo Construction
            </text>

            {/* --- REHBER ÇİZGİLERİ GRUBU (Wireframe Çizgiler) --- */}
            <g stroke="#ffffff" strokeWidth="1" strokeOpacity="0.4" fill="none">
                {/* Büyük kavisli çizgiler (Swoosh) */}
                <path d="M -50 150 Q 350 450 680 20" />
                <path d="M -30 170 Q 370 470 700 40" />

                {/* Sol Bacak Rehberleri */}
                <line x1="400" y1="420" x2="620" y2="80" />
                <line x1="440" y1="420" x2="660" y2="80" />

                {/* Sağ Bacak Rehberleri */}
                <line x1="550" y1="80" x2="750" y2="380" />
                <line x1="590" y1="80" x2="790" y2="380" />

                {/* Yatay/Çapraz Bağlantı Rehberleri */}
                <line x1="330" y1="230" x2="770" y2="400" />
                <line x1="330" y1="215" x2="770" y2="385" />
            </g>

            {/* --- DOLGULU ŞEKİLLER (A Harfi) --- */}
            <g fill="#ffffff" fillOpacity="0.3" stroke="none">
                {/* A'nın Sol Bacağı */}
                <polygon points="450,350 600,120 635,120 485,350" />

                {/* A'nın Sağ Bacağı */}
                <polygon points="580,120 730,350 765,350 615,120" />

                {/* Yatay Bağlantı (Crossbar) - Biraz daha şeffaf */}
                <polygon
                    points="420,265 700,370 700,355 420,250"
                    style={{ fillOpacity: 0.15 }}
                />
            </g>
        </svg>
    );
};

export default LogoConstruction;