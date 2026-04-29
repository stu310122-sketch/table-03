import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function SplashScreen() {
    const [phase, setPhase] = useState<'welcome' | 'hidden'>('welcome');

    useEffect(() => {
        // Hide entire splash screen
        const timer = setTimeout(() => {
            setPhase('hidden');
        }, 3500);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    return (
        <AnimatePresence>
            {phase !== 'hidden' && (
                <motion.div
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#02111d] overflow-hidden"
                >
                    {/* Background effects consistent with the app theme */}
                    <div className="absolute inset-0 opacity-20 pointer-events-none" 
                         style={{ backgroundImage: 'radial-gradient(circle, #00f0ff 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
                    </div>
                    
                    <AnimatePresence mode="wait">
                        {phase === 'welcome' && (
                            <motion.div
                                key="welcome"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -20, opacity: 0, transition: { duration: 0.4 } }}
                                transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
                                className="relative z-10 text-center px-6"
                            >
                                <motion.h1 
                                    className="text-3xl md:text-5xl font-black text-white mb-6 tracking-widest glowing-text"
                                    animate={{ 
                                        textShadow: [
                                            "0 0 10px rgba(0, 240, 255, 0.5)", 
                                            "0 0 25px rgba(0, 240, 255, 0.8)", 
                                            "0 0 10px rgba(0, 240, 255, 0.5)"
                                        ]
                                    }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    歡迎來到恆河水元素週期表
                                </motion.h1>
                                
                                <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: "100%" }}
                                    transition={{ delay: 0.5, duration: 1.5, ease: "easeInOut" }}
                                    className="h-[2px] bg-gradient-to-r from-transparent via-[#00f0ff] to-transparent max-w-sm mx-auto shadow-[0_0_8px_#00f0ff]"
                                />
                                
                                <motion.p 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 0.9 }}
                                    transition={{ delay: 1.0, duration: 0.8 }}
                                    className="mt-6 font-mono font-bold text-lg text-[#00f0ff] tracking-[0.3em] uppercase drop-shadow-[0_0_8px_rgba(0,240,255,0.5)]"
                                >
                                    Made By IRC
                                </motion.p>

                                <motion.p 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 0.6 }}
                                    exit={{ opacity: 0, transition: { duration: 0.2 } }}
                                    transition={{ delay: 1.6, duration: 0.5 }}
                                    className="mt-8 text-[#00f0ff] font-mono text-xs tracking-widest uppercase"
                                >
                                    Loading Exploratory Systems...
                                </motion.p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
