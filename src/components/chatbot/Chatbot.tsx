'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

const FAQ_DATA = [
    { q: '사이트 사용법을 알려주세요', a: '홈 화면에서 성취기준을 검색하거나 필터링하여 원하는 자료를 찾으실 수 있습니다. 상세 페이지에서는 관련 학습 자료와 만족도 조사가 제공됩니다.' },
    { q: '성취기준이란 무엇인가요?', a: '성취기준은 학생들이 학습을 통해 도달해야 할 지식, 기능, 태도의 도달 점을 국가 수준에서 제시한 것입니다.' },
    { q: '자료가 열리지 않아요', a: '관련 학습 자료는 외부 공공기관 사이트로 연결됩니다. 팝업 차단 설정을 확인하시거나 네트워크 상태를 점검해주세요.' },
    { q: '의견을 남기고 싶어요', a: '성취기준 상세 페이지 하단의 설문조사 영역에서 소중한 의견을 자유롭게 남기실 수 있습니다.' },
];

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ role: 'bot' | 'user'; text: string }[]>([
        { role: 'bot', text: '안녕하세요! 2022 개정 교육과정 도우미 챗봇입니다. 무엇을 도와드릴까요?' }
    ]);
    const [input, setInput] = useState('');
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = (text: string) => {
        if (!text.trim()) return;

        setMessages(prev => [...prev, { role: 'user', text }]);

        // Simulate bot thinking
        setTimeout(() => {
            const faqMatch = FAQ_DATA.find(item => text.includes(item.q) || item.q.includes(text));
            const response = faqMatch
                ? faqMatch.a
                : '죄송합니다. 질문하신 내용에 대한 답변을 찾지 못했습니다. "사이트 사용법" 등의 키워드로 질문해주세요.';

            setMessages(prev => [...prev, { role: 'bot', text: response }]);
        }, 500);

        setInput('');
    };

    return (
        <>
            {/* Floating Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 p-4 bg-indigo-600 text-white rounded-full shadow-2xl hover:bg-indigo-700 hover:scale-110 transition-all z-50 group"
            >
                <MessageCircle className="h-6 w-6" />
                <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    궁금한 점을 물어보세요!
                </span>
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-24 right-6 w-80 sm:w-96 h-[500px] bg-white rounded-2xl shadow-2xl border flex flex-col z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    {/* Header */}
                    <div className="p-4 bg-indigo-600 text-white rounded-t-2xl flex items-center justify-between">
                        <div className="flex items-center gap-2 font-bold">
                            <Bot className="h-5 w-5" />
                            <span>교육과정 도움봇</span>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded transition-colors">
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Messages */}
                    <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.role === 'user'
                                        ? 'bg-indigo-600 text-white rounded-tr-none'
                                        : 'bg-white border text-gray-800 shadow-sm rounded-tl-none'
                                    }`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* FAQ Quick Buttons */}
                    <div className="p-2 bg-gray-50 border-t flex gap-2 overflow-x-auto no-scrollbar">
                        {FAQ_DATA.map((item, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleSend(item.q)}
                                className="whitespace-nowrap px-3 py-1 bg-white border rounded-full text-xs text-indigo-600 hover:bg-indigo-50 transition-colors"
                            >
                                {item.q}
                            </button>
                        ))}
                    </div>

                    {/* Input */}
                    <form
                        onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
                        className="p-4 bg-white rounded-b-2xl border-t flex gap-2"
                    >
                        <input
                            type="text"
                            placeholder="메시지를 입력하세요..."
                            className="flex-1 text-sm outline-none focus:ring-1 focus:ring-indigo-500 rounded px-2"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <button type="submit" className="p-2 text-indigo-600 hover:bg-indigo-50 rounded transition-colors">
                            <Send className="h-5 w-5" />
                        </button>
                    </form>
                </div>
            )}
        </>
    );
}
