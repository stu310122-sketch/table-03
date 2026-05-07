import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
    Info, 
    Sparkles, 
    FlaskConical, 
    Frown, 
    MonitorPlay, 
    Rocket, 
    Utensils, 
    Waves, 
    Biohazard,
    Play,
    Pause,
    RotateCcw
} from 'lucide-react';

interface AboutViewProps {
    onBack: () => void;
}

export function AboutView({ onBack }: AboutViewProps) {
    const [currentScene, setCurrentScene] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);

    const scenes = [
        {
            text: '高二的化學實在是有夠複雜，尤其是原子的特性與排列...',
            icon: FlaskConical,
            color: 'text-red-400',
            bg: 'from-red-500/20 to-transparent',
            animate: { rotate: [-15, 15, -15], y: [0, -10, 0] },
            transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
        },
        {
            text: '被搞到沒招的資研社同學們...',
            icon: Frown,
            color: 'text-blue-400',
            bg: 'from-blue-500/20 to-transparent',
            animate: { scale: [1, 0.9, 1], opacity: [1, 0.7, 1] },
            transition: { duration: 1.5, repeat: Infinity }
        },
        {
            text: '決定設計一款可以把原子特性「實際化」的網站！',
            icon: MonitorPlay,
            color: 'text-green-400',
            bg: 'from-green-500/20 to-transparent',
            animate: { scale: [0.95, 1.05, 0.95] },
            transition: { duration: 1, repeat: Infinity }
        },
        {
            text: '希望能對以後的學業有幫助~~ 🚀',
            icon: Rocket,
            color: 'text-yellow-400',
            bg: 'from-yellow-500/20 to-transparent',
            animate: { y: [10, -10, 10], x: [-5, 5, -5] },
            transition: { duration: 2, repeat: Infinity }
        },
        {
            text: '至於命名原因... 常常滑到印度美食的某幹部發現...',
            icon: Utensils,
            color: 'text-orange-400',
            bg: 'from-orange-500/20 to-transparent',
            animate: { rotate: [0, 360] },
            transition: { duration: 4, repeat: Infinity, ease: "linear" }
        },
        {
            text: '這些美食的起源地，有一條美麗的河流叫「恆河」🌊',
            icon: Waves,
            color: 'text-cyan-400',
            bg: 'from-cyan-500/20 to-transparent',
            animate: { x: [-15, 15, -15], y: [-5, 5, -5] },
            transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
        },
        {
            text: '河流裡充滿了此網站中 60% 以上的元素！☢️',
            icon: Biohazard,
            color: 'text-[#00f0ff]',
            bg: 'from-[#00f0ff]/20 to-transparent',
            animate: { scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] },
            transition: { duration: 1.5, repeat: Infinity }
        },
        {
            text: '故以此命名為《恆河水之元素週期表》✨',
            icon: Sparkles,
            color: 'text-[#ff00ff]',
            bg: 'from-[#ff00ff]/20 to-transparent',
            animate: { rotate: [0, 180, 360], scale: [1, 1.3, 1] },
            transition: { duration: 3, repeat: Infinity, ease: "linear" }
        }
    ];

    const SCENE_DURATION = 4000; // 4 seconds per scene

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isPlaying) {
            timer = setInterval(() => {
                setCurrentScene((prev) => (prev + 1) % scenes.length);
            }, SCENE_DURATION);
        }
        return () => clearInterval(timer);
    }, [isPlaying, scenes.length]);

    const togglePlay = () => setIsPlaying(!isPlaying);

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
                    className="max-w-5xl mx-auto space-y-8 pb-12"
                >
                    <motion.div variants={itemVariants} className="text-center mb-8 mt-4">
                        <motion.div 
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
                            className="inline-block p-4 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/30 mb-4 shadow-[0_0_20px_rgba(0,240,255,0.2)]"
                        >
                            <Sparkles className="w-12 h-12 text-[#00f0ff]" />
                        </motion.div>
                        <h1 className="text-3xl md:text-5xl font-black mb-2 tracking-tight">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00f0ff] to-[#4ade80]">恆河水</span>
                            <span>之元素週期表</span>
                        </h1>
                        <p className="text-[#00f0ff] text-base md:text-lg tracking-widest font-mono opacity-80 uppercase">The Ganges Periodic Table</p>
                    </motion.div>

                    {/* Animated Story Player */}
                    <motion.div variants={itemVariants} className="w-full rounded-2xl overflow-hidden glass-panel border border-[#00f0ff]/30 shadow-2xl relative h-[60vh] min-h-[400px] flex flex-col">
                        <div className="flex-1 relative overflow-hidden flex items-center justify-center p-4 md:p-8">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentScene}
                                    initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                    exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                                    transition={{ duration: 0.6 }}
                                    className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 md:p-8"
                                >
                                    <div className={`absolute inset-0 bg-gradient-to-b ${scenes[currentScene].bg} opacity-20`} />

                                    <motion.div
                                        animate={scenes[currentScene].animate}
                                        transition={scenes[currentScene].transition}
                                        className="z-10 mb-6 md:mb-10"
                                    >
                                        {React.createElement(scenes[currentScene].icon, { 
                                            className: `w-24 h-24 md:w-40 md:h-40 ${scenes[currentScene].color} filter drop-shadow-[0_0_15px_currentColor]` 
                                        })}
                                    </motion.div>

                                    <motion.h2
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3, duration: 0.6 }}
                                        className="z-10 text-xl md:text-3xl lg:text-4xl font-bold text-white drop-shadow-lg leading-relaxed max-w-3xl px-4"
                                    >
                                        {scenes[currentScene].text}
                                    </motion.h2>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Controls */}
                        <div className="h-16 border-t border-[#00f0ff]/20 bg-black/40 backdrop-blur-md flex items-center justify-between px-4 md:px-6 z-20 shrink-0">
                            <div className="flex gap-2 md:gap-4 shrink-0">
                                <button onClick={togglePlay} className="p-2 hover:bg-white/10 rounded-full transition-colors text-white" aria-label={isPlaying ? "Pause" : "Play"}>
                                    {isPlaying ? <Pause className="w-5 h-5 md:w-6 md:h-6" /> : <Play className="w-5 h-5 md:w-6 md:h-6" />}
                                </button>
                                <button onClick={() => setCurrentScene(0)} className="p-2 hover:bg-white/10 rounded-full transition-colors text-white" aria-label="Restart">
                                    <RotateCcw className="w-5 h-5 md:w-6 md:h-6" />
                                </button>
                            </div>
                            
                            <div className="flex-1 mx-4 md:mx-8 flex items-center gap-1 md:gap-2">
                                {scenes.map((_, idx) => (
                                    <div 
                                        key={idx}
                                        onClick={() => setCurrentScene(idx)}
                                        className="flex-1 h-1.5 md:h-2 rounded-full bg-gray-600 cursor-pointer overflow-hidden relative"
                                    >
                                        {(idx < currentScene || (idx === currentScene && !isPlaying)) && (
                                            <div className="absolute inset-0 bg-[#00f0ff]" />
                                        )}
                                        {idx === currentScene && isPlaying && (
                                            <motion.div 
                                                initial={{ width: "0%" }}
                                                animate={{ width: "100%" }}
                                                transition={{ duration: SCENE_DURATION / 1000, ease: "linear" }}
                                                className="absolute left-0 top-0 bottom-0 bg-[#00f0ff]"
                                                onAnimationComplete={() => {}}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                            
                            <div className="text-xs md:text-sm font-mono text-[#00f0ff]/70 shrink-0">
                                {currentScene + 1} / {scenes.length}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </main>
        </div>
    );
}
