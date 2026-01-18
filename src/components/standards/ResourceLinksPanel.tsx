'use client';

import { useState, useEffect, useMemo } from 'react';
import { createClient } from '@/lib/supabaseClient';
import { Database } from '@/lib/types';
import { ExternalLink, Filter, Globe, FileText, Video, ClipboardList, Loader2, Link2 } from 'lucide-react';

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
        <div className="space-y-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center">
                        <Link2 className="h-5 w-5 text-indigo-500" />
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-gray-900 tracking-tight">관련 자료</h3>
                        <p className="text-sm text-gray-400 font-medium tracking-tight">성취기준과 연결된 추천 학습 리소스입니다.</p>
                    </div>
                </div>

                {/* Category Filter Chips */}
                {categories.length > 0 && (
                    <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-hide">
                        <Filter className="h-4 w-4 text-gray-300 shrink-0" />
                        <div className="flex gap-2">
                            <button
                                onClick={() => setActiveCategory('all')}
                                className={`px-4 py-2 rounded-xl text-xs font-black transition-all whitespace-nowrap shadow-sm ${activeCategory === 'all'
                                    ? 'bg-indigo-600 text-white border-transparent'
                                    : 'bg-white text-gray-400 border border-gray-100 hover:border-gray-200'
                                    }`}
                            >
                                전체보기
                            </button>
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-4 py-2 rounded-xl text-xs font-black transition-all whitespace-nowrap shadow-sm ${activeCategory === cat
                                        ? 'bg-indigo-600 text-white border-transparent'
                                        : 'bg-white text-gray-400 border border-gray-100 hover:border-gray-200'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Links Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredLinks.map((link) => (
                    <a
                        key={link.id}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group bg-white p-8 rounded-[2rem] border border-gray-100 hover:border-indigo-200 hover:shadow-2xl hover:shadow-indigo-500/5 transition-all flex flex-col justify-between relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50/20 rounded-full -mr-12 -mt-12 transition-transform group-hover:scale-125" />

                        <div className="space-y-4 relative z-10">
                            <div className="flex justify-between items-start gap-4">
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                        <div className="p-2 bg-gray-50 rounded-lg text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                                            {getIcon(link.category)}
                                        </div>
                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{link.category || '기타 자료'}</span>
                                    </div>
                                    <h5 className="text-xl font-black text-gray-900 leading-tight group-hover:text-indigo-600 transition-colors">
                                        {link.title}
                                    </h5>
                                </div>
                                <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-200 transition-colors group-hover:bg-indigo-50 group-hover:text-indigo-400">
                                    <ExternalLink className="h-5 w-5" />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 pt-6 mt-6 border-t border-gray-50 relative z-10">
                            {link.org && (
                                <span className="text-xs font-black text-indigo-400 bg-indigo-50/50 px-3 py-1 rounded-lg">{link.org}</span>
                            )}
                            {link.tags && link.tags.map(tag => (
                                <span key={tag} className="text-[10px] font-bold text-gray-400 px-3 py-1 bg-gray-50 rounded-lg">#{tag}</span>
                            ))}
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
}
