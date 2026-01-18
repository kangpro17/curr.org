'use client';

import { useState } from 'react';
import { Star, CheckCircle2, AlertCircle, Loader2, Send } from 'lucide-react';

interface SurveyFormProps {
    standardCode: string;
}

const HELPFUL_TAGS = [
    "자료가 유익함",
    "찾기 쉬움",
    "설명이 명확함",
    "디자인이 좋음",
    "링크가 다양함",
    "내용이 정확함"
];

export default function SurveyForm({ standardCode }: SurveyFormProps) {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [comment, setComment] = useState('');
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const toggleTag = (tag: string) => {
        setSelectedTags(prev =>
            prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (rating === 0) {
            setStatus('error');
            setErrorMessage('별점을 선택해 주세요.');
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
                    comment
                })
            });

            if (!res.ok) throw new Error('설문 제출에 실패했습니다.');

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
                <h4 className="text-3xl font-black tracking-tighter mb-2">소중한 의견 감사합니다!</h4>
                <p className="text-indigo-100/70 font-medium mb-8">여러분의 피드백이 더 나은 서비스를 만듭니다.</p>
                <button
                    onClick={() => { setStatus('idle'); setRating(0); setSelectedTags([]); setComment(''); }}
                    className="text-white/60 text-sm font-bold hover:text-white underline underline-offset-4"
                >
                    다시 제출하기
                </button>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-gray-100 shadow-xl shadow-indigo-500/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/50 rounded-full -mr-32 -mt-32 blur-3xl" />

            <form onSubmit={handleSubmit} className="relative z-10 space-y-10 group">
                <div className="space-y-2">
                    <h4 className="text-2xl font-black text-gray-900 tracking-tight">이 성취기준이 도움이 되었나요?</h4>
                    <p className="text-gray-400 font-medium text-sm">여러분의 평가가 운영에 큰 도움이 됩니다.</p>
                </div>

                {/* Rating */}
                <div className="space-y-4">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest block">만족도 점수</label>
                    <div className="flex items-center gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                onMouseEnter={() => setHoverRating(star)}
                                onMouseLeave={() => setHoverRating(0)}
                                onClick={() => setRating(star)}
                                className="transition-transform active:scale-90"
                            >
                                <Star
                                    className={`h-10 w-10 transition-colors ${(hoverRating || rating) >= star
                                            ? 'fill-yellow-400 text-yellow-400'
                                            : 'text-gray-100'
                                        }`}
                                />
                            </button>
                        ))}
                        {rating > 0 && (
                            <span className="ml-4 text-xl font-black text-yellow-500">{rating}점</span>
                        )}
                    </div>
                </div>

                {/* Tags */}
                <div className="space-y-4">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest block">무엇이 좋았나요? (다중 선택)</label>
                    <div className="flex flex-wrap gap-2">
                        {HELPFUL_TAGS.map(tag => (
                            <button
                                key={tag}
                                type="button"
                                onClick={() => toggleTag(tag)}
                                className={`px-5 py-2 rounded-xl text-sm font-bold transition-all ${selectedTags.includes(tag)
                                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                                        : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
                                    }`}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Comment */}
                <div className="space-y-4">
                    <div className="flex justify-between items-end">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest">기타 의견 (선택)</label>
                        <span className={`text-[10px] font-bold ${comment.length > 300 ? 'text-red-500' : 'text-gray-300'}`}>
                            {comment.length} / 300
                        </span>
                    </div>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value.slice(0, 300))}
                        placeholder="더 보완할 점이 있다면 자유롭게 적어주세요."
                        className="w-full h-32 p-6 bg-gray-50 rounded-2xl border border-transparent focus:border-indigo-100 focus:bg-white outline-none text-sm font-medium transition-all resize-none"
                    />
                </div>

                {/* Status Messages */}
                {status === 'error' && (
                    <div className="flex items-center gap-2 p-4 bg-red-50 rounded-xl text-red-500 text-sm font-bold animate-in fade-in slide-in-from-top-2">
                        <AlertCircle className="h-4 w-4" />
                        {errorMessage}
                    </div>
                )}

                {/* Submit */}
                <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full h-16 bg-gray-900 text-white rounded-2xl font-black hover:bg-black transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-xl"
                >
                    {status === 'submitting' ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                        <>
                            <Send className="h-5 w-5" />
                            설문 제출하기
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}
