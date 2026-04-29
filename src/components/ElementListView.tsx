import React from 'react';
import { ElementData } from '../data';
import { CATEGORIES } from '../constants';

interface ElementListViewProps {
    elements: ElementData[];
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    onSelectElement: (el: ElementData) => void;
    onBack: () => void;
}

export const ElementListView: React.FC<ElementListViewProps> = ({
    elements,
    searchTerm,
    setSearchTerm,
    onSelectElement,
    onBack
}) => {
    return (
        <main className="flex-1 w-full flex flex-col p-4 md:p-8 relative" aria-labelledby="list-heading">
            <div className="scanlines" aria-hidden="true"></div>
            <header className="max-w-3xl mx-auto w-full mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0 relative z-10">
                <div className="flex items-center gap-4">
                    <button onClick={onBack} aria-label="返回首頁" className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00f0ff] px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-[#00f0ff] font-bold hover:bg-white/10 transition-colors shadow-sm font-mono">⬅ 回首頁</button>
                    <h2 id="list-heading" className="text-xl md:text-2xl font-black text-white tracking-widest glowing-text">元素檢索字典</h2>
                </div>
                <div className="w-full sm:w-64 relative">
                    <label htmlFor="list-search" className="sr-only">輸入中文名稱或符號</label>
                    <input id="list-search" type="text" placeholder="輸入中文名稱或符號..." aria-label="搜尋過濾元素" className="px-4 py-2 rounded-lg border border-white/20 bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00f0ff] focus:border-[#00f0ff] text-white shadow-sm w-full font-mono placeholder-white/50" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                </div>
            </header>
            <div className="flex-1 overflow-auto max-w-3xl mx-auto w-full glass-panel rounded-2xl shadow-sm p-3 custom-scrollbar relative z-10" role="list" aria-label="搜尋結果">
                {elements.filter(el => !searchTerm || el.name.includes(searchTerm) || el.symbol.toLowerCase().includes(searchTerm.toLowerCase()) || el.z.toString() === searchTerm).map(el => (
                    <button key={el.z} onClick={() => onSelectElement(el)} className="w-full text-left flex items-center p-3 border-b border-white/5 hover:bg-white/5 hover:shadow-[inset_0_0_10px_rgba(0,240,255,0.1)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00f0ff] focus-visible:bg-white/5 cursor-pointer transition-all rounded-lg mb-1" role="listitem" aria-label={`查看 ${el.name} 詳細資料`}>
                        <div className="w-12 text-center font-mono text-[#00f0ff]/80 font-bold">{el.z}</div>
                        <div className="w-12 h-12 flex items-center justify-center font-bold text-xl rounded-lg shadow-sm mr-4 tech-card shrink-0" style={{ '--cat-color': CATEGORIES[el.cat]?.hex || '#3366ff', '--cat-color-rgb': CATEGORIES[el.cat]?.rgb || '51, 102, 255' } as React.CSSProperties}>{el.symbol}</div>
                        <div className="flex-1">
                            <div className="font-bold text-lg text-white">{el.name}</div>
                            <div className="text-xs text-[#a5f3fc] font-mono">{CATEGORIES[el.cat]?.label}</div>
                        </div>
                        <div className="hidden sm:block text-right font-mono text-sm text-white/70" aria-label={`原子量 ${el.mass}`}>{el.mass}</div>
                    </button>
                ))}
            </div>
        </main>
    );
};
