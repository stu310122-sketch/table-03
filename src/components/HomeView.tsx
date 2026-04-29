import React from 'react';

interface HomeViewProps {
    onNavigate: (view: string) => void;
}

export function HomeView({ onNavigate }: HomeViewProps) {
    const menuItems = [
        { title: "探索週期表", sub: "全景互動與多重視角切換", icon: "🗺️", view: 'table', color: "border-[#00f0ff]/30 bg-[#00f0ff]/10 hover:bg-[#00f0ff]/20 text-[#00f0ff]" },
        { title: "3D軌域實驗室", sub: "立體視覺化與子軌域解析", icon: "🌀", view: 'orbitals_gallery', color: "border-[#9933ff]/30 bg-[#9933ff]/10 hover:bg-[#9933ff]/20 text-[#9933ff]" },
        { title: "元素檢索字典", sub: "完整列表與快速搜尋引擎", icon: "📚", view: 'list', color: "border-[#ff9933]/30 bg-[#ff9933]/10 hover:bg-[#ff9933]/20 text-[#ff9933]" },
        { title: "化學隨堂測驗", sub: "挑戰辨識元素的互動遊戲", icon: "✍️", view: 'quiz', color: "border-[#33ff66]/30 bg-[#33ff66]/10 hover:bg-[#33ff66]/20 text-[#33ff66]" },
        { title: "原子堆積實驗室", sub: "晶體結構與空間排列視覺化", icon: "🧊", view: 'stats', color: "border-[#ff3366]/30 bg-[#ff3366]/10 hover:bg-[#ff3366]/20 text-[#ff3366]" },
        { title: "命運抽卡機", sub: "盲盒抽取今日專屬元素", icon: "🎁", view: 'gacha', color: "border-[#ffcc00]/30 bg-[#ffcc00]/10 hover:bg-[#ffcc00]/20 text-[#ffcc00]" },
        { title: "關於本站", sub: "起源與開發故事", icon: "✨", view: 'about', color: "border-[#ff00ff]/30 bg-[#ff00ff]/10 hover:bg-[#ff00ff]/20 text-[#ff00ff]" },
        { title: "AI 化學助手", sub: "智能解答化學疑問", icon: "🤖", view: 'ai_chat', color: "border-[#00ffff]/30 bg-[#00ffff]/10 hover:bg-[#00ffff]/20 text-[#00ffff]" },
    ];

    return (
        <main className="flex-1 w-full flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden" aria-labelledby="main-heading">
            <div className="scanlines" aria-hidden="true"></div>
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" aria-hidden="true" style={{ backgroundImage: 'radial-gradient(circle, #00f0ff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
            <header className="text-center mb-12 relative z-10">
                <h1 id="main-heading" className="text-4xl md:text-6xl font-black text-white mb-4 tracking-widest glowing-text uppercase">
                    恆河水之元素週期表
                </h1>
                <p className="text-[#a5f3fc] font-mono text-sm md:text-base opacity-100 tracking-[0.2em]">
                    互動式數據與化學探索器
                </p>
            </header>
            <nav className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-5xl px-4 relative z-10" aria-label="Main Menu">
                {menuItems.map((item, idx) => (
                    <button 
                        key={idx} 
                        onClick={() => onNavigate(item.view)} 
                        className="group relative text-left h-full focus:outline-none focus-visible:ring-4 focus-visible:ring-[#00f0ff] focus-visible:ring-offset-4 focus-visible:ring-offset-black rounded-lg"
                        aria-label={`${item.title} - ${item.sub}`}
                    >
                        {/* Shadow Plate */}
                        <div className="absolute inset-0 border border-[#00f0ff]/60 shadow-[0_0_12px_#00f0ff] -skew-x-12 translate-x-1 translate-y-1 group-hover:translate-x-2 group-hover:translate-y-2 group-hover:shadow-[0_0_20px_#00f0ff] transition-all duration-300 rounded-sm"></div>
                        {/* Main Base Plate */}
                        <div className="absolute inset-0 bg-[#003B46] border border-white -skew-x-12 group-hover:bg-[#005260] transition-colors duration-300 rounded-sm"></div>
                        
                        {/* Content Wrapper (Unskewed) */}
                        <div className="relative z-10 p-6 flex flex-col justify-center h-full">
                            <div>
                                <h3 className="text-xl font-bold tracking-wide text-white">{item.title}</h3>
                                <p className="text-sm text-[#cffafe] mt-2 font-mono font-medium">{item.sub}</p>
                            </div>
                        </div>
                    </button>
                ))}
            </nav>
        </main>
    );
}
