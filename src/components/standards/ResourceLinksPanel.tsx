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
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 border-b border-[#D4AF37]/10 pb-10">
                <div className="flex items-center gap-5">
                    <div className="w-14 h-14 bg-[#002147] rounded-sm flex items-center justify-center border border-[#D4AF37]/30 shadow-lg">
                        <Link2 className="h-6 w-6 text-[#D4AF37]" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-classic text-[#002147] tracking-widest">CURATED SCHOLARSHIP</h3>
                        <p className="text-sm text-[#002147]/50 font-serif italic">Scholarly resources assigned to this curriculum benchmark.</p>
                    </div>
                </div>

                {/* Category Filter Chips */}
                {categories.length > 0 && (
                    <div className="flex items-center gap-4 overflow-x-auto pb-1 scrollbar-hide">
                        <Filter className="h-4 w-4 text-[#D4AF37] shrink-0" />
                        <div className="flex gap-2">
                            <button
                                onClick={() => setActiveCategory('all')}
                                className={`px-5 py-2.5 rounded-sm text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-sm ${activeCategory === 'all'
                                    ? 'bg-[#002147] text-[#D4AF37] border-transparent'
                                    : 'bg-white text-[#002147]/40 border border-[#D4AF37]/10 hover:border-[#D4AF37]'
                                    }`}
                            >
                                SHOW ALL
                            </button>
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-5 py-2.5 rounded-sm text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-sm ${activeCategory === cat
                                        ? 'bg-[#002147] text-[#D4AF37] border-transparent'
                                        : 'bg-white text-[#002147]/40 border border-[#D4AF37]/10 hover:border-[#D4AF37]'
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredLinks.map((link) => (
                    <a
                        key={link.id}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group bg-[#FDFCF8] p-10 rounded-sm border-l-4 border-l-[#D4AF37] border-y border-r border-[#D4AF37]/10 hover:bg-[#002147] transition-all flex flex-col justify-between relative overflow-hidden shadow-sm hover:shadow-2xl"
                    >
                        <div className="space-y-6 relative z-10">
                            <div className="flex justify-between items-start gap-4">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-[#002147] text-[#D4AF37] rounded-xs group-hover:bg-white/10 transition-all">
                                            {getIcon(link.category)}
                                        </div>
                                        <span className="text-[9px] font-black text-[#002147]/40 group-hover:text-[#D4AF37] uppercase tracking-[0.3em] font-classic">{link.category || 'GENERAL RESOURCE'}</span>
                                    </div>
                                    <h5 className="text-2xl font-serif font-bold text-[#002147] leading-tight group-hover:text-white transition-colors">
                                        {link.title}
                                    </h5>
                                </div>
                                <div className="w-12 h-12 border border-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] group-hover:border-white/20 group-hover:text-white transition-all">
                                    <ExternalLink className="h-5 w-5" />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 pt-8 mt-8 border-t border-[#D4AF37]/10 group-hover:border-white/10 relative z-10">
                            {link.org && (
                                <span className="text-[10px] font-black text-[#D4AF37] bg-[#002147]/5 group-hover:bg-white/5 px-4 py-1.5 rounded-sm border border-[#D4AF37]/20 uppercase tracking-widest">{link.org}</span>
                            )}
                            {link.tags && link.tags.map(tag => (
                                <span key={tag} className="text-[9px] font-bold text-[#002147]/30 group-hover:text-white/30 px-3 py-1 bg-white/50 group-hover:bg-white/5 rounded-sm uppercase tracking-tighter">#{tag}</span>
                            ))}
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
}
