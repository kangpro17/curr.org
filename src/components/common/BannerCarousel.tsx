'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Database } from '@/lib/types';
import { ChevronLeft, ChevronRight, ExternalLink, Image as ImageIcon } from 'lucide-react';
import { createClient } from '@/lib/supabaseClient';

type Banner = Database['public']['Tables']['banners']['Row'];

export default function BannerCarousel() {
    const [banners, setBanners] = useState<Banner[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [isPaused, setIsPaused] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const supabase = createClient();

    const fetchBanners = useCallback(async () => {
        try {
            setLoading(true);
            const now = new Date().toISOString();

            // Fetch all active banners, filter dates on client
            const { data, error } = await (supabase
                .from('banners') as any)
                .select('*')
                .eq('is_active', true)
                .order('sort_order', { ascending: true });

            if (error) throw error;

            const filteredData = ((data as any[]) || []).filter((banner: any) => {
                const satisfiesStart = !banner.start_at || banner.start_at <= now;
                const satisfiesEnd = !banner.end_at || banner.end_at >= now;
                return satisfiesStart && satisfiesEnd;
            });

            setBanners(filteredData);
        } catch (err) {
            console.error('Failed to fetch banners:', err);
        } finally {
            setLoading(false);
        }
    }, [supabase]);

    useEffect(() => {
        fetchBanners();
    }, [fetchBanners]);

    const nextSlide = useCallback(() => {
        if (banners.length === 0) return;
        setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, [banners.length]);

    const prevSlide = useCallback(() => {
        if (banners.length === 0) return;
        setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
    }, [banners.length]);

    const startTimer = useCallback(() => {
        if (banners.length <= 1 || isPaused) return;
        stopTimer();
        timerRef.current = setInterval(nextSlide, 4000); // 4 seconds interval
    }, [banners.length, nextSlide, isPaused]);

    const stopTimer = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    };

    useEffect(() => {
        startTimer();
        return () => stopTimer();
    }, [startTimer]);

    const handleDotClick = (index: number) => {
        setCurrentIndex(index);
        // Momentary pause is handled by mouseEnter/Leave usually, 
        // but explicit interaction can reset timer
        stopTimer();
        startTimer();
    };

    if (loading || banners.length === 0) {
        if (loading) return (
            <div className="bg-gray-50 border-t border-gray-100 py-12">
                <div className="container mx-auto px-4">
                    <div className="h-48 md:h-64 bg-gray-200 animate-pulse rounded-[2.5rem]" />
                </div>
            </div>
        );
        return null; // Don't show anything if no banners
    }

    return (
        <section
            className="bg-gray-50/50 border-t border-gray-100 py-16 overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-8">
                    <div className="space-y-1">
                        <h3 className="text-2xl font-black text-gray-900 tracking-tight">추천 학습 콘텐츠</h3>
                        <p className="text-sm text-gray-400 font-medium">선별된 고품질 교육 자료를 탐색해 보세요.</p>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="hidden sm:flex gap-3">
                        <button
                            aria-label="Previous banner"
                            onClick={prevSlide}
                            className="p-3 bg-white rounded-2xl border border-gray-100 hover:border-indigo-200 hover:text-indigo-600 transition-all shadow-sm group"
                        >
                            <ChevronLeft className="h-5 w-5 text-gray-400 group-hover:text-indigo-600" />
                        </button>
                        <button
                            aria-label="Next banner"
                            onClick={nextSlide}
                            className="p-3 bg-white rounded-2xl border border-gray-100 hover:border-indigo-200 hover:text-indigo-600 transition-all shadow-sm group"
                        >
                            <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-indigo-600" />
                        </button>
                    </div>
                </div>

                <div className="relative group/carousel">
                    <div className="relative overflow-hidden rounded-[3rem] shadow-2xl shadow-indigo-500/5 aspect-[21/9] md:aspect-[3/1]">
                        <div
                            className="flex transition-transform duration-1000 cubic-bezier(0.4, 0, 0.2, 1) h-full"
                            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                        >
                            {banners.map((banner) => (
                                <a
                                    key={banner.id}
                                    href={banner.link_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="min-w-full relative h-full block overflow-hidden group/item"
                                >
                                    {/* Image or Placeholder */}
                                    {banner.image_url ? (
                                        <img
                                            src={banner.image_url}
                                            alt={banner.title || 'Learning Banner'}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover/item:scale-105"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-indigo-50 to-white flex items-center justify-center">
                                            <ImageIcon className="h-16 w-16 text-indigo-100" />
                                        </div>
                                    )}

                                    {/* Glass Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent flex flex-col justify-center p-8 md:p-16">
                                        <div className="max-w-xl space-y-4">
                                            {banner.subtitle && (
                                                <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-lg text-white/80 text-[10px] font-black uppercase tracking-[0.2em] animate-in fade-in slide-in-from-bottom-2">
                                                    {banner.subtitle}
                                                </span>
                                            )}
                                            <h4 className="text-white text-3xl md:text-5xl font-black tracking-tighter leading-tight animate-in fade-in slide-in-from-bottom-4 duration-500">
                                                {banner.title}
                                            </h4>
                                            <div className="flex items-center gap-2 text-indigo-400 group-hover/item:text-indigo-300 transition-colors font-black text-sm pt-2">
                                                <span>자세히 보기</span>
                                                <ExternalLink className="h-4 w-4" />
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Pagination Indicators */}
                    <div className="absolute bottom-10 left-10 md:left-16 flex gap-2 z-20">
                        {banners.map((_, idx) => (
                            <button
                                key={idx}
                                aria-label={`Go to slide ${idx + 1}`}
                                onClick={() => handleDotClick(idx)}
                                className={`h-1.5 rounded-full transition-all duration-500 ${currentIndex === idx
                                    ? 'w-10 bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)]'
                                    : 'w-2 bg-white/30 hover:bg-white/50'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
