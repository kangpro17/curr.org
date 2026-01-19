'use client';

import { useState, useEffect, useMemo } from 'react';
import { createClient } from '@/lib/supabaseClient';
import { Database } from '@/lib/types';
import { ExternalLink, Filter, Globe, FileText, Video, ClipboardList, Loader2, Link2, BookOpen } from 'lucide-react';

type ResourceLink = Database['public']['Tables']['resource_links']['Row'];

interface ResourceLinksPanelProps {
    standardCode: string;
}

export default function ResourceLinksPanel({ standardCode }: ResourceLinksPanelProps) {
    const [links, setLinks] = useState<ResourceLink[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeCategory, setActiveCategory] = useState<string>('all');

    const supabase = createClient();

    useEffect(() => {
        async function fetchLinks() {
            try {
                setLoading(true);
                setError(null);

                const { data, error } = await supabase
                    .from('resource_links')
                    .select('*')
                    .eq('standard_code', standardCode)
                    .eq('is_active', true)
                    .order('category', { ascending: true })
                    .order('created_at', { ascending: false });

                if (error) throw error;
                setLinks(data || []);
            } catch (err: any) {
                console.error('Error loading links:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchLinks();
    }, [standardCode, supabase]);

    const categories = useMemo(() => {
        const cats = Array.from(new Set(links.map(l => l.category))).filter((c): c is string => !!c);
        return cats;
    }, [links]);

    const filteredLinks = useMemo(() => {
        if (activeCategory === 'all') return links;
        return links.filter(l => l.category === activeCategory);
    }, [links, activeCategory]);

    const getIcon = (category: string | null) => {
        const cat = category?.toLowerCase() || '';
        if (cat.includes('영상') || cat.includes('비디오')) return <Video className="h-4 w-4" />;
        if (cat.includes('기관') || cat.includes('공공')) return <Globe className="h-4 w-4" />;
        if (cat.includes('보고서') || cat.includes('문서')) return <ClipboardList className="h-4 w-4" />;
        return <FileText className="h-4 w-4" />;
    };

    if (loading) {
        return (
            <div className="py-20 flex flex-col items-center justify-center bg-white rounded-[2.5rem] border border-gray-100 shadow-sm">
                <Loader2 className="h-10 w-10 text-indigo-400 animate-spin mb-4" />
                <p className="text-gray-400 font-bold">관련 자료를 불러오는 중입니다...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-8 bg-red-50 rounded-[2rem] border border-red-100 text-center">
                <p className="text-red-500 font-bold">오류가 발생했습니다: {error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-4 px-6 py-2 bg-red-500 text-white rounded-xl font-black text-sm"
                >
                    다시 시도
                </button>
            </div>
        );
    }

    if (links.length === 0) {
        return (
            <div className="py-20 flex flex-col items-center justify-center bg-white rounded-[2.5rem] border border-gray-100 shadow-sm text-center px-4">
                <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center mb-8 text-gray-200">
                    <Link2 className="h-10 w-10" />
                </div>
                <h4 className="text-2xl font-black text-gray-900 tracking-tight mb-3">아직 등록된 자료가 없습니다</h4>
                <p className="text-gray-400 font-medium max-w-xs mx-auto">
                    해당 성취기준에 대한 추천 자료를 준비 중입니다. 관리자에게 추가를 요청해 보세요.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-10 border-b border-[#004225]/10 pb-12">
                <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-[#004225] rounded-sm flex items-center justify-center border border-[#D4AF37]/30 shadow-2xl">
                        <Link2 className="h-8 w-8 text-[#D4AF37]" />
                    </div>
                    <div>
                        <h3 className="text-3xl font-serif font-black text-[#004225] tracking-tight">학습 자료 아카이브</h3>
                        <p className="text-lg text-[#004225]/60 font-serif italic">해당 성취기준 달성을 위한 엄선된 교육 자료입니다.</p>
                    </div>
                </div>

                {/* Category Filter Chips */}
                {categories.length > 0 && (
                    <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-hide">
                        <Filter className="h-5 w-5 text-[#004225]/40 shrink-0" />
                        <div className="flex gap-3">
                            <button
                                onClick={() => setActiveCategory('all')}
                                className={`px-6 py-3 rounded-sm text-[11px] font-black uppercase tracking-[0.2em] transition-all shadow-md ${activeCategory === 'all'
                                    ? 'bg-[#004225] text-white'
                                    : 'bg-white text-[#004225]/40 border border-[#004225]/10 hover:border-[#004225]'
                                    }`}
                            >
                                ALL RESOURCES
                            </button>
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-6 py-3 rounded-sm text-[11px] font-black uppercase tracking-[0.2em] transition-all shadow-md ${activeCategory === cat
                                        ? 'bg-[#004225] text-white'
                                        : 'bg-white text-[#004225]/40 border border-[#004225]/10 hover:border-[#004225]'
                                        }`}
                                >
                                    {cat.toUpperCase()}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Links Cards Grid - Large Thumbnails */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {filteredLinks.map((link) => (
                    <a
                        key={link.id}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative h-[300px] rounded-lg overflow-hidden aristocratic-border transition-all hover:scale-[1.02] hover:shadow-2xl"
                    >
                        {/* Background Image / Placeholder */}
                        <div className="absolute inset-0 british-green-gradient opacity-90 group-hover:opacity-100 transition-opacity" />

                        {/* Decorative Pattern / Icon */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:scale-110 transition-transform">
                            {link.category?.includes('영상') ? <Video className="w-40 h-40 text-white" /> : <BookOpen className="w-40 h-40 text-white" />}
                        </div>

                        {/* Content Overlay */}
                        <div className="relative h-full p-8 flex flex-col justify-end gap-4 z-10">
                            <div className="flex items-center gap-2">
                                <div className="p-2 bg-[#D4AF37] text-[#004225] rounded-sm">
                                    {getIcon(link.category)}
                                </div>
                                <span className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.3em]">{link.category || 'Curriculum'}</span>
                            </div>

                            <h5 className="text-2xl font-serif font-bold text-white leading-tight">
                                {link.title}
                            </h5>

                            <div className="flex justify-between items-center pt-4 border-t border-white/20">
                                <span className="text-xs font-bold text-white/70">{link.org}</span>
                                <ExternalLink className="h-5 w-5 text-[#D4AF37]" />
                            </div>
                        </div>

                        {/* Hover Effect Light */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#004225] via-transparent to-transparent opacity-60" />
                    </a>
                ))}
            </div>
        </div>
    );
}
