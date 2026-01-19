'use client';

import { useState } from 'react';
import { Star, CheckCircle2, AlertCircle, Loader2, Send } from 'lucide-react';
import { createClient } from '@/lib/supabaseClient';

interface SurveyFormProps {
    standardCode: string;
}

const HELPFUL_TAGS = [
    "자료가 유익함",
    "찾기 쉬움",
    "설명이 명확함",
    "링크가 다양함",
    "디자인이 깔끔함",
    "더 많은 자료가 필요함"
];

export default function SurveyForm({ standardCode }: SurveyFormProps) {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [comment, setComment] = useState('');
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const supabase = createClient();

    const toggleTag = (tag: string) => {
        setSelectedTags(prev =>
            prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (rating === 0) {
            setStatus('error');
            setErrorMessage('만족도 별점을 선택해 주세요.');
            return;
        }
        if (comment.length > 300) {
            setStatus('error');
            setErrorMessage('의견은 300자 이내로 작성해 주세요.');
            return;
        }

        try {
            setStatus('submitting');

            const res = await fetch('/api/surveys', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    standard_code: standardCode,
                    rating,
                    helpful_tags: selectedTags,
                    comment: comment.slice(0, 300)
                })
            });

            if (!res.ok) throw new Error('제출에 실패했습니다.');

            setStatus('success');
        } catch (err: any) {
            setStatus('error');
            setErrorMessage(err.message || '알 수 없는 오류가 발생했습니다.');
        }
    };

    if (status === 'success') {
        return (
            <div className="bg-[#004225] rounded-xl p-16 text-white text-center animate-in fade-in zoom-in duration-500 shadow-3xl border-t-8 border-[#D4AF37]">
                <div className="w-24 h-24 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-8 border border-white/20">
                    <CheckCircle2 className="h-12 w-12 text-[#D4AF37]" />
                </div>
                <h4 className="text-4xl font-serif font-black tracking-tight mb-4">소중한 의견 감사합니다!</h4>
                <p className="text-xl text-white/60 font-serif italic mb-10">여러분의 피드백이 더 나은 교육 환경을 만듭니다.</p>
                <button
                    onClick={() => { setStatus('idle'); setRating(0); setSelectedTags([]); setComment(''); }}
                    className="px-10 py-4 bg-[#D4AF37] hover:bg-[#D4AF37]/80 rounded-lg text-[#004225] text-sm font-black transition-all shadow-2xl"
                >
                    다른 의견 남기기
                </button>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl p-12 md:p-16 border border-[#004225]/10 shadow-3xl relative overflow-hidden aristocratic-border">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#004225]/5 rounded-full -mr-40 -mt-40 blur-3xl" />

            <form onSubmit={handleSubmit} className="relative z-10 space-y-12 group">
                <div className="space-y-4">
                    <h4 className="text-3xl font-serif font-black text-[#004225] tracking-tight">교육 만족도 설문</h4>
                    <p className="text-lg text-[#004225]/60 font-serif italic">해당 성취기준 정보가 실제 수업 설계에 도움이 되었나요?</p>
                </div>

                {/* Rating - Stars */}
                <div className="space-y-6">
                    <label className="text-xs font-black text-[#004225]/40 uppercase tracking-[0.3em] block">OVERALL SATISFACTION</label>
                    <div className="flex items-center gap-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                onMouseEnter={() => setHoverRating(star)}
                                onMouseLeave={() => setHoverRating(0)}
                                onClick={() => setRating(star)}
                                className="transition-all active:scale-95 p-1"
                            >
                                <Star
                                    className={`h-12 w-12 transition-all ${(hoverRating || rating) >= star
                                        ? 'fill-[#D4AF37] text-[#D4AF37] scale-110 drop-shadow-lg'
                                        : 'text-[#004225]/5 fill-[#004225]/5'
                                        }`}
                                />
                            </button>
                        ))}
                        {rating > 0 && (
                            <span className="ml-6 text-2xl font-black text-[#D4AF37] animate-in fade-in slide-in-from-left-4">{rating}점</span>
                        )}
                    </div>
                </div>

                {/* Helpful Tags - Checkboxes */}
                <div className="space-y-6">
                    <label className="text-xs font-black text-[#004225]/40 uppercase tracking-[0.3em] block">KEY STRENGTHS</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {HELPFUL_TAGS.map(tag => (
                            <button
                                key={tag}
                                type="button"
                                onClick={() => toggleTag(tag)}
                                className={`px-6 py-4 rounded-lg text-sm font-black transition-all text-left flex items-center gap-4 border ${selectedTags.includes(tag)
                                    ? 'bg-[#004225] text-white border-[#004225] shadow-xl'
                                    : 'bg-[#f0f7f3] text-[#004225]/50 border-transparent hover:border-[#004225]/20'
                                    }`}
                            >
                                <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${selectedTags.includes(tag) ? 'bg-[#D4AF37] border-[#D4AF37] text-[#004225]' : 'bg-white border-[#004225]/10 text-transparent'
                                    }`}>
                                    <CheckCircle2 className="h-4 w-4 fill-current" />
                                </div>
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Comment Area */}
                <div className="space-y-6">
                    <div className="flex justify-between items-end">
                        <label className="text-xs font-black text-[#004225]/40 uppercase tracking-[0.3em]">ADDITIONAL COMMENTARY</label>
                        <span className={`text-[10px] font-black tracking-widest ${comment.length > 300 ? 'text-red-500' : 'text-[#004225]/20'}`}>
                            {comment.length} / 300
                        </span>
                    </div>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="전공 혹은 학습에 도움이 된 부분이나 보완할 점을 자유롭게 기록해 주세요."
                        className="w-full h-40 p-8 bg-[#f0f7f3] rounded-xl border border-transparent focus:border-[#004225]/20 focus:bg-white outline-none text-base font-serif transition-all resize-none shadow-inner"
                    />
                </div>

                {/* Status UI */}
                {status === 'error' && (
                    <div className="flex items-center gap-4 p-6 bg-red-50 rounded-xl text-red-600 text-sm font-black animate-in fade-in slide-in-from-top-4 border border-red-100 uppercase tracking-widest">
                        <AlertCircle className="h-6 w-6 shrink-0" />
                        {errorMessage}
                    </div>
                )}

                {/* Submit Action */}
                <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="group w-full h-20 bg-[#004225] text-white rounded-xl font-black hover:bg-black hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-4 shadow-3xl text-lg uppercase tracking-[0.2em]"
                >
                    {status === 'submitting' ? (
                        <Loader2 className="h-8 w-8 animate-spin" />
                    ) : (
                        <>
                            <Send className="h-6 w-6 transform group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform text-[#D4AF37]" />
                            학습 환류 제출하기
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}
