import React from 'react';

interface OrbitalsGalleryViewProps {
    onSelectOrbital: (orb: string) => void;
    onBack: () => void;
}

export const OrbitalsGalleryView: React.FC<OrbitalsGalleryViewProps> = ({ onSelectOrbital, onBack }) => {
    return (
        <main className="flex-1 w-full flex flex-col relative overflow-auto p-4 md:p-8" aria-labelledby="orbitals-heading">
            <div className="scanlines" aria-hidden="true"></div>
            <header className="max-w-4xl mx-auto mb-8 flex items-center relative z-10 w-full">
                <button onClick={onBack} aria-label="返回首頁" className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00f0ff] px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-[#00f0ff] font-bold hover:bg-white/10 transition-colors shadow-sm font-mono mr-4">⬅ 回首頁</button>
                <h2 id="orbitals-heading" className="text-2xl font-black text-white tracking-widest glowing-text">3D 軌域實驗室</h2>
            </header>
            <nav className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto relative z-10 w-full" aria-label="軌域模型選擇">
                {['s', 'p', 'd', 'f'].map(orb => (
                    <button key={orb} onClick={() => onSelectOrbital(orb)} aria-label={`查看 ${orb.toUpperCase()} 軌域模型`} className={`focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00f0ff] glass-panel rounded-2xl p-8 shadow-sm hover:shadow-[0_0_20px_rgba(0,240,255,0.2)] cursor-pointer transition-all hover:-translate-y-2 text-center border border-white/10 hover:border-[#00f0ff]/50 group`}>
                        <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center text-4xl font-black mb-4 border-2 ${orb==='s'?'text-[#ff1a53] border-[#ff1a53]':orb==='p'?'text-[#ff8c00] border-[#ff8c00]':orb==='d'?'text-[#00d4ff] border-[#00d4ff]':'text-[#00ff2a] border-[#00ff2a]'} bg-black/30 group-hover:scale-110 transition-transform shadow-[inset_0_0_15px_rgba(255,255,255,0.1)] font-mono`} aria-hidden="true">{orb}</div>
                        <h3 className="font-bold text-xl mb-2 text-white font-mono">{orb} 軌域</h3>
                        <p className="text-sm text-[#a5f3fc] font-mono">點擊互動查看</p>
                    </button>
                ))}
            </nav>
        </main>
    );
};
