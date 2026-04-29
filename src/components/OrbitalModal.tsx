import React, { useState, useEffect } from 'react';
import { ThreeOrbital } from './ThreeOrbital';

export const OrbitalModal = ({ type, onClose }: { type: string, onClose: () => void }) => {
    const orbitalInfo: Record<string, any> = {
        s: { 
            title: "s 軌域 (球形)", desc: "最單純的球對稱形狀。電子出現機率只與距離有關，與方向無關。", capacity: "2e⁻",
            subTypes: [{ id: 's', label: 's 軌域' }]
        },
        p: { 
            title: "p 軌域 (啞鈴形)", desc: "具有方向性 (x, y, z 三軸)。形狀如啞鈴，兩個葉片在原子核處交會形成節點。", capacity: "6e⁻",
            subTypes: [
                { id: 'px', label: <>p<sub>x</sub></> },
                { id: 'py', label: <>p<sub>y</sub></> },
                { id: 'pz', label: <>p<sub>z</sub></> }
            ]
        },
        d: { 
            title: "d 軌域 (花瓣形)", desc: "形狀複雜，主要為四葉花瓣狀 (Cloverleaf) 或啞鈴加環形，分布於不同的幾何平面上。", capacity: "10e⁻",
            subTypes: [
                { id: 'dxy', label: <>d<sub>xy</sub></> },
                { id: 'dyz', label: <>d<sub>yz</sub></> },
                { id: 'dzx', label: <>d<sub>zx</sub></> },
                { id: 'dx2-y2', label: <>d<sub>x²-y²</sub></> },
                { id: 'dz2', label: <>d<sub>z²</sub></> }
            ]
        },
        f: { 
            title: "f 軌域 (複雜立體)", desc: "極度複雜的多葉立體結構，具有多個節面，常見於鑭系與錒系元素。", capacity: "14e⁻",
            subTypes: [
                { id: 'f_general', label: '綜合示意' },
                { id: 'f_xyz', label: <>f<sub>xyz</sub> (八葉)</> },
                { id: 'f_z3', label: <>f<sub>z³</sub> (雙環)</> }
            ]
        }
    };

    const data = orbitalInfo[type];
    const [currentSubType, setCurrentSubType] = useState(data.subTypes[0].id);

    useEffect(() => {
        setCurrentSubType(orbitalInfo[type].subTypes[0].id);
    }, [type]);
    
    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="orbital-modal-title">
            <div className="glass-panel w-full max-w-sm rounded-2xl shadow-[0_0_30px_rgba(0,240,255,0.2)] overflow-hidden flex flex-col max-h-[90vh] border border-[#00f0ff]/30" onClick={e => e.stopPropagation()}>
                <div className="bg-black/40 p-4 text-center border-b border-white/10 relative">
                    <h2 id="orbital-modal-title" className="text-2xl font-black text-white tracking-widest glowing-text">{data.title}</h2>
                    <button onClick={onClose} aria-label="關閉軌域視窗" className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-md bg-white/5 hover:bg-[#00f0ff]/20 text-[#00f0ff] font-bold transition-colors border border-white/10 hover:border-[#00f0ff]/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00f0ff]">✕</button>
                </div>
                
                <div className="flex flex-wrap justify-center gap-2 p-3 bg-black/20 border-b border-white/10 shadow-inner" role="group" aria-label="選擇子軌域形狀">
                    {data.subTypes.map((st: any) => (
                        <button 
                            key={st.id} 
                            onClick={() => setCurrentSubType(st.id)}
                            aria-pressed={currentSubType === st.id}
                            className={`focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00f0ff] px-4 py-1.5 text-sm rounded-md font-mono font-bold transition-all duration-200 ${
                                currentSubType === st.id 
                                ? 'bg-[#00f0ff]/20 text-[#00f0ff] border border-[#00f0ff] shadow-[0_0_10px_rgba(0,240,255,0.3)] scale-105' 
                                : 'bg-black/30 text-white/70 border border-white/20 hover:bg-white/10'
                            }`}
                        >
                            {st.label}
                        </button>
                    ))}
                </div>

                <div className="h-64 w-full relative bg-[#02111d] border-b border-white/10" aria-label="3D 軌域互動視窗" role="region">
                    <ThreeOrbital type={type} subType={currentSubType} />
                    <div className="absolute top-2 right-2 bg-black/50 border border-white/10 px-2 py-1 rounded-md text-[10px] font-mono font-bold shadow-sm pointer-events-none text-[#a5f3fc]" aria-hidden="true">🖱️ DRAG TO ROTATE</div>
                    
                    {/* 軸線圖例 (Axis Legend) */}
                    <div className="absolute bottom-2 left-2 flex gap-1.5 pointer-events-none" aria-hidden="true">
                        <div className="flex items-center gap-1 bg-black/50 px-1.5 py-0.5 rounded shadow-sm text-[10px] font-mono font-bold text-white border border-white/20">
                            <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_5px_#ef4444]"></div>X
                        </div>
                        <div className="flex items-center gap-1 bg-black/50 px-1.5 py-0.5 rounded shadow-sm text-[10px] font-mono font-bold text-white border border-white/20">
                            <div className="w-2 h-2 rounded-full bg-[#00cc00] shadow-[0_0_5px_#22c55e]"></div>Y
                        </div>
                        <div className="flex items-center gap-1 bg-black/50 px-1.5 py-0.5 rounded shadow-sm text-[10px] font-mono font-bold text-white border border-white/20">
                            <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_5px_#3b82f6]"></div>Z
                        </div>
                    </div>
                </div>
                
                <div className="p-6 bg-black/40">
                    <p className="text-sm text-white/90 mb-4 leading-relaxed font-sans font-medium">{data.desc}</p>
                    <div className="flex justify-between border-b border-white/10 pb-2 font-mono">
                        <span className="font-bold text-[#a5f3fc]">MAX CAPACITY</span>
                        <span className="font-black text-[#00f0ff] drop-shadow-[0_0_5px_rgba(0,240,255,0.5)]" aria-label={`最大電子容量 ${data.capacity}`}>{data.capacity}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
