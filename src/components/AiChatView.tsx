import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, User, Lock, Send, KeyRound, Sparkles, ChevronLeft } from 'lucide-react';

interface AiChatViewProps {
    onBack: () => void;
}

interface Message {
    id: string;
    role: 'user' | 'ai';
    text: string;
}

export function AiChatView({ onBack }: AiChatViewProps) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [passwordInput, setPasswordInput] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [messages, setMessages] = useState<Message[]>([
        { id: 'initial', role: 'ai', text: '你好！我是你的 AI 化學助手。有任何關於化學元素或科學的問題嗎？' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (isAuthenticated) {
            scrollToBottom();
        }
    }, [messages, isAuthenticated]);

    const handlePasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (passwordInput === 'IRC') {
            setIsAuthenticated(true);
            setPasswordError('');
        } else {
            setPasswordError('密碼錯誤，請重新輸入');
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="flex flex-col h-[100dvh] w-full bg-[#02111d] text-white p-4 overflow-hidden absolute inset-0 items-center justify-center">
                <header className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 border-b border-[#00f0ff]/30 glass-panel z-20 shrink-0">
                    <div className="flex items-center space-x-4">
                        <button 
                            onClick={onBack}
                            className="p-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer group"
                            aria-label="返回上一頁"
                        >
                            <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                        </button>
                        <h1 className="text-xl md:text-2xl font-bold flex items-center gap-2">
                            <Bot className="w-6 h-6 text-[#00f0ff]" />
                            <span>AI 化學助手</span>
                        </h1>
                    </div>
                </header>

                <motion.div 
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
                    className="tech-card p-8 w-full max-w-md flex flex-col items-center space-y-6 mt-16 relative"
                >
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#00f0ff]/10 rounded-full blur-3xl pointer-events-none"></div>
                    <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#ff00ff]/10 rounded-full blur-3xl pointer-events-none"></div>

                    <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
                        className="w-20 h-20 rounded-full bg-gradient-to-br from-[#00f0ff]/20 to-[#00f0ff]/5 border border-[#00f0ff]/40 flex items-center justify-center mb-2 shadow-[0_0_30px_rgba(0,240,255,0.2)]"
                    >
                        <Lock className="w-10 h-10 text-[#00f0ff]" />
                    </motion.div>
                    
                    <div className="text-center space-y-2">
                        <h2 className="text-3xl font-bold glowing-text tracking-wider">訪問認證</h2>
                        <p className="text-gray-400 text-sm tracking-widest uppercase">Terminal Access Required</p>
                    </div>
                    
                    <form onSubmit={handlePasswordSubmit} className="w-full flex flex-col space-y-6 relative z-10">
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <KeyRound className="h-5 w-5 text-[#00f0ff]/50 group-focus-within:text-[#00f0ff] transition-colors" />
                            </div>
                            <input
                                type="password"
                                value={passwordInput}
                                onChange={(e) => setPasswordInput(e.target.value)}
                                placeholder="請輸入訪問密碼"
                                className="w-full bg-black/50 border border-[#00f0ff]/30 rounded-xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-[#00f0ff] focus:ring-1 focus:ring-[#00f0ff] transition-all text-center tracking-[0.5em] font-mono text-lg shadow-inner"
                                autoFocus
                            />
                            <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-[#00f0ff]/50 to-transparent scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500"></div>
                        </div>
                        
                        <AnimatePresence>
                            {passwordError && (
                                <motion.p 
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="text-[#ff3366] text-sm text-center font-bold bg-[#ff3366]/10 py-2 rounded-lg border border-[#ff3366]/30"
                                >
                                    {passwordError}
                                </motion.p>
                            )}
                        </AnimatePresence>
                        
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-[#00f0ff]/20 to-[#00f0ff]/10 hover:from-[#00f0ff]/40 hover:to-[#00f0ff]/20 border border-[#00f0ff]/50 text-[#00f0ff] px-6 py-4 rounded-xl font-bold transition-all hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-2 group cursor-pointer"
                        >
                            <span>系統解鎖</span>
                            <Sparkles className="w-5 h-5 group-hover:animate-spin" />
                        </button>
                    </form>
                </motion.div>
            </div>
        );
    }


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput('');
        setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', text: userMessage }]);
        setIsLoading(true);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
            
            // Reconstruct chat history for context
            const contents = messages.map(msg => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.text}`).join('\n') + `\nUser: ${userMessage}`;
            
            const response = await ai.models.generateContent({
                model: "gemini-3.1-pro-preview",
                contents: contents,
                config: {
                    systemInstruction: "你是一個專業但親切的化學助手，名為「恆河水 AI」。你的任務是幫助使用者回答化學、元素週期表相關的問題。請用繁體中文回答，並且解釋得淺顯易懂。",
                }
            });

            if (response.text) {
                setMessages(prev => [...prev, { id: Date.now().toString() + '_ai', role: 'ai', text: response.text || '' }]);
            } else {
                 setMessages(prev => [...prev, { id: Date.now().toString() + '_err', role: 'ai', text: '抱歉，我無法提供回答。' }]);
            }
        } catch (error) {
            console.error(error);
            setMessages(prev => [...prev, { id: Date.now().toString() + '_err', role: 'ai', text: '抱歉，與 AI 連線時發生錯誤。請確認您的 API Key 是否正確。' }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-[100dvh] w-full bg-[#02111d] text-white p-0 overflow-hidden absolute inset-0">
            <header className="flex items-center justify-between p-4 border-b border-[#00f0ff]/30 glass-panel z-20 shrink-0 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
                <div className="flex items-center space-x-4">
                    <button 
                        onClick={onBack}
                        className="p-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer group"
                        aria-label="返回上一頁"
                    >
                        <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                    </button>
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-[#00f0ff]/10 rounded-lg border border-[#00f0ff]/30 shadow-[0_0_10px_rgba(0,240,255,0.2)]">
                            <Bot className="w-6 h-6 text-[#00f0ff]" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold flex items-center gap-2">
                                <span>恆河水 AI</span>
                                <span className="text-[10px] px-2 py-0.5 bg-gradient-to-r from-[#00f0ff]/30 to-[#4ade80]/30 text-white rounded-full font-mono border border-[#00f0ff]/50 shadow-[0_0_5px_rgba(0,240,255,0.5)]">BETA</span>
                            </h1>
                            <p className="text-xs text-[#00f0ff]/70 font-mono tracking-widest uppercase">Chemical Assistant</p>
                        </div>
                    </div>
                </div>
            </header>
            
            <main className="flex-1 overflow-y-auto px-4 py-8 custom-scrollbar flex flex-col space-y-6 relative">
                 <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none mix-blend-screen"></div>
                
                {messages.map((msg, index) => (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index === messages.length - 1 ? 0.1 : 0 }}
                        key={msg.id} 
                        className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div className={`flex gap-3 max-w-[85%] md:max-w-[75%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                            
                            <div className="flex-shrink-0 mt-auto mb-1">
                                {msg.role === 'user' ? (
                                    <div className="w-8 h-8 rounded-full bg-[#ff00ff]/20 border border-[#ff00ff]/50 flex items-center justify-center shadow-[0_0_10px_rgba(255,0,255,0.2)]">
                                        <User className="w-4 h-4 text-[#ff00ff]" />
                                    </div>
                                ) : (
                                    <div className="w-8 h-8 rounded-full bg-[#00f0ff]/20 border border-[#00f0ff]/50 flex items-center justify-center shadow-[0_0_10px_rgba(0,240,255,0.2)]">
                                        <Bot className="w-4 h-4 text-[#00f0ff]" />
                                    </div>
                                )}
                            </div>

                            <div className={`p-4 rounded-2xl relative group ${
                                msg.role === 'user' 
                                    ? 'bg-gradient-to-br from-[#ff00ff]/10 to-[#ff00ff]/5 border border-[#ff00ff]/30 text-white rounded-br-sm shadow-[0_4px_15px_rgba(255,0,255,0.1)]' 
                                    : 'bg-gradient-to-br from-[#0a2540] to-[#041f2e] border border-[#00f0ff]/30 text-[#e2e8f0] rounded-bl-sm shadow-[0_4px_15px_rgba(0,240,255,0.1)]'
                            }`}>
                                <div className={`absolute w-2 h-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                                    msg.role === 'user' ? '-left-4 top-1/2 -translate-y-1/2 bg-[#ff00ff]' : '-right-4 top-1/2 -translate-y-1/2 bg-[#00f0ff]'
                                } shadow-[0_0_8px_currentColor]`}></div>
                                <p className="whitespace-pre-wrap text-sm md:text-base leading-relaxed tracking-wide">{msg.text}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
                
                {isLoading && (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-start w-full"
                    >
                        <div className="flex gap-3 max-w-[85%] md:max-w-[75%]">
                            <div className="flex-shrink-0 mt-auto mb-1">
                                <div className="w-8 h-8 rounded-full bg-[#00f0ff]/20 border border-[#00f0ff]/50 flex items-center justify-center shadow-[0_0_10px_rgba(0,240,255,0.2)]">
                                    <Bot className="w-4 h-4 text-[#00f0ff] animate-pulse" />
                                </div>
                            </div>
                            <div className="p-4 rounded-2xl bg-gradient-to-br from-[#0a2540] to-[#041f2e] border border-[#00f0ff]/30 text-[#e2e8f0] rounded-bl-sm flex items-center space-x-2 h-[52px]">
                                <div className="flex gap-1.5 items-center justify-center">
                                    <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0 }} className="w-2 h-2 rounded-full bg-[#00f0ff] shadow-[0_0_5px_#00f0ff]"></motion.div>
                                    <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-2 h-2 rounded-full bg-[#00f0ff] shadow-[0_0_5px_#00f0ff]"></motion.div>
                                    <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-2 h-2 rounded-full bg-[#00f0ff] shadow-[0_0_5px_#00f0ff]"></motion.div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
                <div ref={messagesEndRef} className="h-4" />
            </main>

            <footer className="p-4 md:p-6 glass-panel border-t border-[#00f0ff]/30 shrink-0 shadow-[0_-4px_20px_rgba(0,0,0,0.5)] z-20">
                <form onSubmit={handleSubmit} className="flex gap-3 max-w-4xl mx-auto relative group">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="向 AI 助手發送訊息..."
                        className="flex-1 bg-black/50 border border-[#00f0ff]/30 rounded-full pl-6 pr-14 py-4 text-white focus:outline-none focus:border-[#00f0ff] focus:ring-1 focus:ring-[#00f0ff] transition-all shadow-inner text-base tracking-wide placeholder:text-gray-500"
                        disabled={isLoading}
                    />
                    <button
                        type="submit"
                        disabled={!input.trim() || isLoading}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-[#00f0ff]/20 hover:bg-[#00f0ff]/40 text-[#00f0ff] rounded-full transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] disabled:hover:shadow-none"
                        aria-label="發送訊息"
                    >
                        <Send className="w-5 h-5 ml-0.5" />
                    </button>
                </form>
                <div className="max-w-4xl mx-auto mt-2 text-center">
                    <p className="text-[10px] text-gray-500 font-mono tracking-widest">Powered by Google Gemini / GANGES AI SYSTEM</p>
                </div>
            </footer>
        </div>
    );
}
