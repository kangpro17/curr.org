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

            const { error } = await (supabase
                .from('surveys') as any)
                .insert({
                    standard_code: standardCode,
                    rating,
                    helpful_tags: selectedTags,
                    comment: comment.slice(0, 300)
                });

            if (error) throw error;

            setStatus('success');
        } catch (err: any) {
            setStatus('error');
            setErrorMessage(err.message || '알 수 없는 오류가 발생했습니다.');
        }
    };

    if (status === 'success') {
        return (
            <div className="bg-indigo-600 rounded-[2.5rem] p-12 text-white text-center animate-in fade-in zoom-in duration-500 shadow-2xl shadow-indigo-500/20">
                <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="h-10 w-10 text-white" />
                </div>
                <h4 className="text-3xl font-black tracking-tighter mb-2">제출되었습니다!</h4>
                <p className="text-indigo-100/70 font-medium mb-8">소중한 의견을 남겨주셔서 감사합니다.</p>
                <button
                    onClick={() => { setStatus('idle'); setRating(0); setSelectedTags([]); setComment(''); }}
                    className="px-8 py-3 bg-white/10 hover:bg-white/20 rounded-2xl text-white text-sm font-black transition-all"
                >
                    다른 의견 남기기
                </button>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-gray-100 shadow-xl shadow-indigo-500/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/50 rounded-full -mr-32 -mt-32 blur-3xl" />

            <form onSubmit={handleSubmit} className="relative z-10 space-y-10 group">
                <div className="space-y-2">
                    <h4 className="text-2xl font-black text-gray-900 tracking-tight">만족도 설문</h4>
                    <p className="text-gray-400 font-medium text-sm">본 성취기준 정보가 도움이 되었나요? 의견을 남겨주세요.</p>
                </div>

                {/* Rating - Stars */}
                <div className="space-y-4">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest block">만족도 평가 (필수)</label>
                    <div className="flex items-center gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                onMouseEnter={() => setHoverRating(star)}
                                onMouseLeave={() => setHoverRating(0)}
                                onClick={() => setRating(star)}
                                className="transition-transform active:scale-90 p-1"
                            >
                                <Star
                                    className={`h-10 w-10 transition-all ${(hoverRating || rating) >= star
                                        ? 'fill-yellow-400 text-yellow-400 scale-110'
                                        : 'text-gray-100 fill-gray-100'
                                        }`}
                                />
                            </button>
                        ))}
                        {rating > 0 && (
                            <span className="ml-4 text-xl font-black text-yellow-500 animate-in fade-in slide-in-from-left-2">{rating}점</span>
                        )}
                    </div>
                </div>

                {/* Helpful Tags - Checkboxes */}
                <div className="space-y-4">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest block">무엇이 좋았나요? (다중 선택)</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {HELPFUL_TAGS.map(tag => (
                            <button
                                key={tag}
                                type="button"
                                onClick={() => toggleTag(tag)}
                                className={`px-4 py-3 rounded-xl text-xs font-black transition-all text-left flex items-center gap-2 ${selectedTags.includes(tag)
                                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20 ring-1 ring-transparent'
                                    : 'bg-gray-50 text-gray-400 border border-transparent hover:border-gray-200'
                                    }`}
                            >
                                <div className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all ${selectedTags.includes(tag) ? 'bg-white border-white text-indigo-600' : 'bg-white border-gray-200 text-transparent'
                                    }`}>
                                    <CheckCircle2 className="h-3 w-3 fill-current" />
                                </div>
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Comment Area */}
                <div className="space-y-4">
                    <div className="flex justify-between items-end">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest">기타 의견 (선택)</label>
                        <span className={`text-[10px] font-bold transition-colors ${comment.length > 300 ? 'text-red-500' : 'text-gray-300'}`}>
                            {comment.length} / 300
                        </span>
                    </div>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="전공 혹은 학습에 도움이 된 부분이나 보안할 점을 자유롭게 적어주세요."
                        className="w-full h-32 p-6 bg-gray-50 rounded-[1.5rem] border border-transparent focus:border-indigo-100 focus:bg-white outline-none text-sm font-medium transition-all resize-none shadow-inner"
                    />
                </div>

                {/* Status UI */}
                {status === 'error' && (
                    <div className="flex items-center gap-3 p-5 bg-red-50 rounded-2xl text-red-500 text-sm font-bold animate-in fade-in slide-in-from-top-2 border border-red-100">
                        <AlertCircle className="h-5 w-5 shrink-0" />
                        {errorMessage}
                    </div>
                )}

                {/* Submit Action */}
                <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="group w-full h-16 bg-gray-900 text-white rounded-[1.5rem] font-black hover:bg-black hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-xl shadow-gray-900/10"
                >
                    {status === 'submitting' ? (
                        <Loader2 className="h-6 w-6 animate-spin" />
                    ) : (
                        <>
                            <Send className="h-5 w-5 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            설문 제출하기
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}
