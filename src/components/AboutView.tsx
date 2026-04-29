import React from 'react';
import { motion } from 'motion/react';
import { Info, Sparkles, Navigation, Lightbulb } from 'lucide-react';

interface AboutViewProps {
    onBack: () => void;
}

export function AboutView({ onBack }: AboutViewProps) {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    return (
        <div className="flex flex-col h-[100dvh] w-full bg-[#02111d] text-white p-4 overflow-hidden absolute inset-0">
            <header className="flex items-center justify-between p-4 border-b border-[#00f0ff]/30 glass-panel z-20 shrink-0">
                <div className="flex items-center space-x-4">
                    <button 
                        onClick={onBack}
                        className="p-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
                        aria-label="返回上一頁"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                    </button>
                    <h1 className="text-xl md:text-2xl font-bold flex items-center gap-2">
                        <Info className="w-6 h-6 text-[#00f0ff]" />
                        <span>關於本站 (About)</span>
                    </h1>
                </div>
            </header>
            <main className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="max-w-4xl mx-auto space-y-8 pb-12"
                >
                    <motion.div variants={itemVariants} className="text-center mb-12 mt-8">
                        <motion.div 
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
                            className="inline-block p-4 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/30 mb-6 shadow-[0_0_20px_rgba(0,240,255,0.2)]"
                        >
                            <Sparkles className="w-12 h-12 text-[#00f0ff]" />
                        </motion.div>
                        <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00f0ff] to-[#4ade80]">恆河水</span>
                            <span>之元素週期表</span>
                        </h1>
                        <p className="text-[#00f0ff] text-lg tracking-widest font-mono opacity-80 uppercase">The Ganges Periodic Table</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <motion.div 
                            variants={itemVariants} 
                            whileHover={{ scale: 1.02 }}
                            className="tech-card p-8 group hover:border-[#ff00ff]/50 cursor-default"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 rounded-lg bg-[#ff00ff]/20 text-[#ff00ff] shadow-[0_0_15px_rgba(255,0,255,0.3)]">
                                    <Lightbulb className="w-8 h-8 group-hover:animate-pulse" />
                                </div>
                                <h2 className="text-2xl font-bold text-white group-hover:text-[#ff00ff] transition-colors">網站起源</h2>
                            </div>
                            <p className="text-lg leading-relaxed text-gray-300">
                                高二的化學實在是有夠複雜，尤其是原子的特性與排列，所以實在被搞到沒招的資研社同學們設計了一款可以把原子特性實際化的網站，希望對以後的學業有幫助~~
                            </p>
                        </motion.div>

                        <motion.div 
                            variants={itemVariants} 
                            whileHover={{ scale: 1.02 }}
                            className="tech-card p-8 group hover:border-[#00ffff]/50 cursor-default"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 rounded-lg bg-[#00ffff]/20 text-[#00ffff] shadow-[0_0_15px_rgba(0,255,255,0.3)]">
                                    <Navigation className="w-8 h-8 group-hover:animate-bounce" />
                                </div>
                                <h2 className="text-2xl font-bold text-white group-hover:text-[#00ffff] transition-colors">命名原因</h2>
                            </div>
                            <p className="text-lg leading-relaxed text-gray-300">
                                常常滑到印度美食的某資研社幹部發現這些美食的起源地，有一條美麗的河流叫恆河，充滿了此網站中 60% 以上的元素，故以此命名！
                            </p>
                        </motion.div>
                    </div>
                </motion.div>
            </main>
        </div>
    );
}
