import React, { useState, useEffect } from 'react';
import { ElementData } from '../data';
import { CATEGORIES } from '../constants';

interface QuizViewProps {
    elements: ElementData[];
    onBack: () => void;
}

const COMMON_Z = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 22, 24, 25, 26, 27, 28, 29, 30, 35, 47, 50, 53, 56, 74, 78, 79, 80, 82, 92];

export function QuizView({ elements, onBack }: QuizViewProps) {
    const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
    const [numQuestions, setNumQuestions] = useState<number>(10);
    const [selectedType, setSelectedType] = useState<string>('mixed');
    const [quizState, setQuizState] = useState<{ step: string, score: number, qIndex: number, currentQ: any, totalQ: number }>({ 
        step: 'start', score: 0, qIndex: 0, currentQ: null, totalQ: 10
    });

    const nextQuestion = (currentScore: number, qIndex: number, totalQ: number) => {
        if (qIndex >= totalQ) { 
            setQuizState(prev => ({ ...prev, step: 'end', score: currentScore, qIndex, currentQ: null })); 
            return; 
        }
        
        const QUESTION_TYPES = ['symbol_to_name', 'name_to_symbol', 'z_to_name', 'name_to_z', 'element_to_category'];
        const qType = selectedType === 'mixed' 
            ? QUESTION_TYPES[Math.floor(Math.random() * QUESTION_TYPES.length)]
            : selectedType;

        // Difficulty sets element pool
        let pool = elements;
        if (difficulty === 'easy') {
            pool = elements.filter(e => COMMON_Z.includes(e.z));
        } else if (difficulty === 'medium') {
            pool = elements.filter(e => e.z <= 83); // Stable elements up to Bismuth
        }

        const target = pool[Math.floor(Math.random() * pool.length)]; 
        
        let options: any[] = [];
        let questionText = "";
        let questionMain = "";

        if (qType === 'symbol_to_name') {
            questionText = "請問下列元素的中文名稱是？";
            questionMain = target.symbol;
            options = [target];
            while(options.length < 4) {
                const r = pool[Math.floor(Math.random() * pool.length)];
                if(!options.find(o => o.z === r.z)) options.push(r);
            }
        } else if (qType === 'name_to_symbol') {
            questionText = "請問下列元素的化學符號是？";
            questionMain = target.name;
            options = [target];
            while(options.length < 4) {
                const r = pool[Math.floor(Math.random() * pool.length)];
                if(!options.find(o => o.z === r.z)) options.push(r);
            }
        } else if (qType === 'z_to_name') {
            questionText = "請問原子序為下列數字的元素是？";
            questionMain = target.z.toString();
            options = [target];
            while(options.length < 4) {
                const r = pool[Math.floor(Math.random() * pool.length)];
                if(!options.find(o => o.z === r.z)) options.push(r);
            }
        } else if (qType === 'name_to_z') {
            questionText = `請問 ${target.name} (${target.symbol}) 的原子序是？`;
            questionMain = target.name;
            options = [target];
            while(options.length < 4) {
                const r = pool[Math.floor(Math.random() * pool.length)];
                if(!options.find(o => o.z === r.z)) options.push(r);
            }
        } else if (qType === 'element_to_category') {
            questionText = `請問 ${target.name} (${target.symbol}) 屬於哪個元素類別？`;
            questionMain = target.name;
            const allCats = Object.keys(CATEGORIES);
            options = [target.cat];
            while(options.length < 4) {
                const rCat = allCats[Math.floor(Math.random() * allCats.length)];
                if(!options.includes(rCat)) options.push(rCat);
            }
        }

        options.sort(() => Math.random() - 0.5);

        setQuizState({ 
            step: 'playing', 
            score: currentScore, 
            qIndex, 
            totalQ,
            currentQ: { type: qType, target, options, questionText, questionMain, answered: null, correct: null } 
        });
    };

    const startQuiz = () => { 
        nextQuestion(0, 0, numQuestions); 
    };

    const handleAnswer = (selectedOpt: any) => {
        if (quizState.currentQ.answered) return;
        
        let isCorrect = false;
        if (quizState.currentQ.type === 'element_to_category') {
            isCorrect = selectedOpt === quizState.currentQ.target.cat;
        } else {
            isCorrect = selectedOpt.z === quizState.currentQ.target.z;
        }
        
        setQuizState(prev => ({ ...prev, currentQ: { ...prev.currentQ, answered: selectedOpt, correct: isCorrect } }));
        setTimeout(() => { nextQuestion(quizState.score + (isCorrect ? 10 : 0), quizState.qIndex + 1, quizState.totalQ); }, 1500);
    };

    return (
        <main className="flex-1 w-full flex flex-col items-center justify-center p-4 md:p-8 overflow-auto relative" aria-labelledby="quiz-heading">
            <div className="scanlines" aria-hidden="true"></div>
            <div className="w-full max-w-xl glass-panel rounded-3xl shadow-[0_0_30px_rgba(0,240,255,0.1)] overflow-hidden border border-[#00f0ff]/30 relative z-10" aria-live="polite">
                <button onClick={onBack} aria-label="返回首頁" className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00f0ff] absolute top-4 left-4 text-[#00f0ff]/90 hover:text-[#00f0ff] font-mono font-bold z-10 transition-colors">⬅ 回首頁</button>
                
                {quizState.step === 'start' && (
                    <div className="p-8 md:p-10 text-center">
                        <div className="text-6xl mb-4 animate-bounce-slight filter drop-shadow-[0_0_10px_rgba(0,240,255,0.5)]" aria-hidden="true">🎯</div>
                        <h2 id="quiz-heading" className="text-3xl font-black text-white mb-2 tracking-widest glowing-text uppercase">化學隨堂測驗</h2>
                        <p className="text-[#a5f3fc] mb-8 font-mono text-sm">挑戰你的化學直覺與記憶力</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left mb-8">
                            {/* Difficulty Selection */}
                            <fieldset>
                                <legend className="text-[#00f0ff] font-mono text-xs uppercase tracking-widest mb-3 block">元素範圍</legend>
                                <div className="flex flex-col gap-2" role="radiogroup" aria-label="選擇元素範圍難度">
                                    {[
                                        { id: 'easy', label: '生活常用 (常見元素)' },
                                        { id: 'medium', label: '學術標準 (穩定元素)' },
                                        { id: 'hard', label: '全域挑戰 (118 元素)' }
                                    ].map(d => (
                                        <button key={d.id} role="radio" aria-checked={difficulty === d.id} onClick={() => setDifficulty(d.id as any)} className={`focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00f0ff] px-4 py-3 rounded-xl border font-bold text-sm transition-all ${difficulty === d.id ? 'bg-[#00f0ff]/20 border-[#00f0ff] text-[#00f0ff] shadow-[0_0_10px_rgba(0,240,255,0.2)]' : 'bg-white/5 border-white/20 text-white/70 hover:bg-white/10 hover:text-white'}`}>
                                            {d.label}
                                        </button>
                                    ))}
                                </div>
                                <div className="mt-4">
                                    <legend className="text-[#00f0ff] font-mono text-xs uppercase tracking-widest mb-3 block">測驗題數</legend>
                                    <div className="flex gap-2" role="radiogroup" aria-label="選擇測驗題數">
                                        {[5, 10, 20].map(n => (
                                            <button key={n} role="radio" aria-checked={numQuestions === n} onClick={() => setNumQuestions(n)} className={`focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00f0ff] flex-1 py-2 rounded-lg border font-mono text-xs font-bold transition-all ${numQuestions === n ? 'bg-[#00f0ff]/20 border-[#00f0ff] text-[#00f0ff]' : 'bg-white/5 border-white/20 text-white/70 hover:bg-white/10 hover:text-white'}`}>
                                                {n} 題
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </fieldset>
                            
                            {/* Type Selection */}
                            <fieldset>
                                <legend className="text-[#00f0ff] font-mono text-xs uppercase tracking-widest mb-3 block">題目類型</legend>
                                <div className="flex flex-col gap-2" role="radiogroup" aria-label="選擇題目難度">
                                    {[
                                        { id: 'mixed', label: '混合模式' },
                                        { id: 'name_to_symbol', label: '元素名稱 → 符號' },
                                        { id: 'symbol_to_name', label: '符號 → 元素名稱' },
                                        { id: 'z_to_name', label: '原子序 → 元素名稱' },
                                        { id: 'element_to_category', label: '元素屬性判定' }
                                    ].map(t => (
                                        <button key={t.id} role="radio" aria-checked={selectedType === t.id} onClick={() => setSelectedType(t.id)} className={`focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00f0ff] px-4 py-3 rounded-xl border font-bold text-sm transition-all ${selectedType === t.id ? 'bg-[#00f0ff]/20 border-[#00f0ff] text-[#00f0ff] shadow-[0_0_10px_rgba(0,240,255,0.2)]' : 'bg-white/5 border-white/20 text-white/70 hover:bg-white/10 hover:text-white'}`}>
                                            {t.label}
                                        </button>
                                    ))}
                                </div>
                            </fieldset>
                        </div>

                        <button onClick={startQuiz} className="focus:outline-none focus-visible:ring-4 focus-visible:ring-[#00f0ff] w-full py-5 bg-[#00f0ff]/30 hover:bg-[#00f0ff]/50 border border-[#00f0ff]/50 text-[#00f0ff] rounded-2xl font-black font-mono text-2xl shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all hover:scale-[1.02] active:scale-95">START QUIZ</button>
                    </div>
                )}

                {quizState.step === 'playing' && quizState.currentQ && (
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-6 pt-8 text-sm font-mono font-bold text-[#a5f3fc]" aria-live="polite">
                            <span>第 {quizState.qIndex + 1} / {quizState.totalQ} 題</span>
                            <span aria-hidden="true">範圍：{difficulty === 'easy' ? '生活' : difficulty === 'medium' ? '標準' : '全域'}</span>
                            <span>分數：{quizState.score}</span>
                        </div>
                        <div className="bg-black/40 rounded-2xl p-8 text-center mb-6 border border-white/10 shadow-inner relative overflow-hidden group" aria-live="assertive">
                            <div className="absolute top-2 right-2 text-[10px] text-white/40 font-mono tracking-tighter" aria-hidden="true">IDENTIFICATION PROTOCOL v1.0</div>
                            <p className="text-[#a5f3fc] font-mono text-xs mb-3 tracking-widest uppercase">{quizState.currentQ.questionText}</p>
                            <h3 className={`text-5xl md:text-7xl font-black text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] transition-transform group-hover:scale-105 ${['symbol_to_name', 'z_to_name'].includes(quizState.currentQ.type) ? 'font-mono' : ''}`}>
                                {quizState.currentQ.questionMain}
                            </h3>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" role="group" aria-label="選擇選項">
                            {quizState.currentQ.options.map((opt: any, idx: number) => {
                                let btnClass = "bg-white/5 border border-white/20 text-white hover:bg-white/10 hover:border-[#00f0ff]/50";
                                let isOptCorrect = false;
                                let isOptSelected = false;
                                
                                if (quizState.currentQ.type === 'element_to_category') {
                                    isOptCorrect = opt === quizState.currentQ.target.cat;
                                    isOptSelected = quizState.currentQ.answered === opt;
                                } else {
                                    isOptCorrect = opt.z === quizState.currentQ.target.z;
                                    isOptSelected = quizState.currentQ.answered && quizState.currentQ.answered.z === opt.z;
                                }

                                if (quizState.currentQ.answered) {
                                    if (isOptCorrect) btnClass = "bg-green-500/20 border-green-500 text-green-400 scale-[1.02] shadow-[0_0_15px_rgba(74,222,128,0.3)] z-10";
                                    else if (isOptSelected) btnClass = "bg-red-500/20 border-red-500 text-red-400 animate-shake shadow-[0_0_15px_rgba(248,113,113,0.3)]";
                                    else btnClass = "bg-black/20 border-transparent text-white/30 opacity-50 grayscale";
                                }
                                
                                let optText = "";
                                if (quizState.currentQ.type === 'symbol_to_name') optText = opt.name;
                                else if (quizState.currentQ.type === 'name_to_symbol') optText = opt.symbol;
                                else if (quizState.currentQ.type === 'z_to_name') optText = `${opt.symbol} (${opt.name})`;
                                else if (quizState.currentQ.type === 'name_to_z') optText = opt.z.toString();
                                else if (quizState.currentQ.type === 'element_to_category') optText = CATEGORIES[opt]?.label || opt;

                                return (
                                    <button key={idx} onClick={() => handleAnswer(opt)} aria-disabled={!!quizState.currentQ.answered} disabled={!!quizState.currentQ.answered} className={`focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00f0ff] py-4 rounded-xl font-bold text-lg md:text-xl transition-all shadow-sm ${btnClass} ${['name_to_symbol', 'name_to_z'].includes(quizState.currentQ.type) ? 'font-mono' : ''}`}>
                                        {optText}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}

                {quizState.step === 'end' && (
                    <div className="p-10 text-center" aria-live="polite">
                        <div className="text-7xl mb-4 filter drop-shadow-[0_0_10px_rgba(0,240,255,0.5)]" aria-hidden="true">
                            {quizState.score >= quizState.totalQ * 8 ? '🏆' : quizState.score >= quizState.totalQ * 5 ? '👍' : '📚'}
                        </div>
                        <h2 className="text-4xl font-black text-white mb-2 tracking-widest glowing-text uppercase">測驗結束！</h2>
                        <p className="text-[#a5f3fc] mb-2 font-mono text-sm uppercase">總得分</p>
                        <div className="text-8xl font-black text-[#00f0ff] mb-8 drop-shadow-[0_0_20px_rgba(0,240,255,0.6)]" aria-label={`分數: ${quizState.score}`}>{quizState.score}</div>
                        
                        <div className="flex flex-col gap-3">
                            <button onClick={startQuiz} className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00f0ff] w-full py-4 bg-[#00f0ff]/20 hover:bg-[#00f0ff]/40 border border-[#00f0ff]/50 text-[#00f0ff] rounded-2xl font-black font-mono text-xl shadow-[0_0_15px_rgba(0,240,255,0.2)] transition-all hover:scale-105 uppercase">再測一次</button>
                            <button onClick={() => setQuizState(prev => ({ ...prev, step: 'start' }))} className="focus:outline-none focus-visible:ring-2 focus-visible:ring-white w-full py-4 text-white/70 hover:text-[#00f0ff] font-bold font-mono text-sm transition-all uppercase tracking-widest underline decoration-white/30 hover:decoration-[#00f0ff]/40">返回設定</button>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
