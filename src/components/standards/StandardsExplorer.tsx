'use client';

import { useState, useMemo, useEffect } from 'react';
import { Standard } from '@/lib/types';
import Link from 'next/link';
import { Search, Filter, X, ChevronDown, ChevronRight, BookOpen, Layers, GraduationCap } from 'lucide-react';

interface StandardsExplorerProps {
    standards: Standard[];
}

export default function StandardsExplorer({ standards }: StandardsExplorerProps) {
    const [activeSubject, setActiveSubject] = useState<string>('국어');
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Debounce search query
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(searchQuery);
        }, 300);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    // Reset filters when subject changes
    useEffect(() => {
        setSelectedCategory('all');
        setSearchQuery('');
        setDebouncedQuery('');
    }, [activeSubject]);

    // Sort subjects: Korean, Math, Science
    const subjects = useMemo(() => {
        const subs = Array.from(new Set(standards.map(s => s.subject))).filter(Boolean);
        const order = ['국어', '수학', '과학'];
        return order.filter(o => subs.includes(o)).concat(subs.filter(s => !order.includes(s)));
    }, [standards]);

    // Available categories for the active subject
    const categories = useMemo(() => {
        const filteredBySubject = standards.filter(s => s.subject === activeSubject);
        return Array.from(new Set(filteredBySubject.map(s => s.category))).filter(Boolean);
    }, [standards, activeSubject]);

    // Filtering logic
    const filteredStandards = useMemo(() => {
        return standards.filter(s => {
            const matchSubject = s.subject === activeSubject;
            const matchCategory = selectedCategory === 'all' || s.category === selectedCategory;
            const matchSearch = debouncedQuery === '' ||
                s.code.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
                s.content.toLowerCase().includes(debouncedQuery.toLowerCase());

            return matchSubject && matchCategory && matchSearch;
        });
    }, [standards, activeSubject, selectedCategory, debouncedQuery]);

    const handleReset = () => {
        setSearchQuery('');
        setDebouncedQuery('');
    };

    return (
        <div className="space-y-8 relative">
            {/* Sticky Header: Tabs & Search */}
            <div className="sticky top-20 z-30 space-y-4">
                <div className="bg-white/80 backdrop-blur-xl p-4 rounded-[2rem] border border-gray-100 shadow-xl shadow-indigo-500/5 space-y-4">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        {/* Subject Tabs */}
                        <div className="flex bg-[#F1F0E8] p-1.5 rounded-sm border border-[#D4AF37]/20 self-start shadow-inner">
                            {subjects.map(sub => (
                                <button
                                    key={sub}
                                    onClick={() => setActiveSubject(sub)}
                                    className={`px-8 py-2.5 rounded-sm text-[10px] font-black tracking-[0.2em] uppercase transition-all ${activeSubject === sub
                                        ? 'bg-[#002147] text-[#D4AF37] shadow-lg'
                                        : 'text-[#002147]/40 hover:text-[#002147] hover:bg-white/50'
                                        }`}
                                >
                                    {sub}
                                </button>
                            ))}
                        </div>

                        {/* Search Bar */}
                        <div className="relative flex-1 max-w-xl group">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#D4AF37]/50 group-focus-within:text-[#D4AF37] transition-colors" />
                            <input
                                type="text"
                                placeholder="SEARCH ARCHIVES..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-12 py-4 bg-[#F1F0E8] rounded-sm border border-transparent focus:border-[#D4AF37]/30 focus:bg-white outline-none text-xs font-bold text-[#002147] transition-all placeholder:text-[#002147]/20 tracking-widest uppercase"
                            />
                            {searchQuery && (
                                <button
                                    onClick={handleReset}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-red-50 rounded-full text-[#D4AF37] transition-all"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Filter Bar (Dropdown and Status) */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                        <div className="flex items-center gap-6">
                            <div className="relative">
                                <button
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-gray-100 text-xs font-black text-gray-600 hover:border-indigo-200 transition-all shadow-sm"
                                >
                                    <Layers className="h-4 w-4 text-indigo-400" />
                                    <span>{selectedCategory === 'all' ? '전체 영역' : selectedCategory}</span>
                                    <ChevronDown className={`h-3 w-3 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {isDropdownOpen && (
                                    <>
                                        <div className="fixed inset-0 z-40" onClick={() => setIsDropdownOpen(false)} />
                                        <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl border border-gray-100 shadow-2xl z-50 p-2 animate-in fade-in slide-in-from-top-2">
                                            <button
                                                onClick={() => { setSelectedCategory('all'); setIsDropdownOpen(false); }}
                                                className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition-all ${selectedCategory === 'all' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-400 hover:bg-gray-50 hover:text-gray-900'}`}
                                            >
                                                전체 영역 (All)
                                            </button>
                                            {categories.map(cat => (
                                                <button
                                                    key={cat}
                                                    onClick={() => { setSelectedCategory(cat); setIsDropdownOpen(false); }}
                                                    className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition-all ${selectedCategory === cat ? 'bg-indigo-50 text-indigo-600' : 'text-gray-400 hover:bg-gray-50 hover:text-gray-900'}`}
                                                >
                                                    {cat}
                                                </button>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        <p className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.3em] font-classic">
                            ARCHIVE COUNT: {filteredStandards.length}
                        </p>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            {filteredStandards.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredStandards.map((s) => (
                        <Link
                            key={s.id}
                            href={`/standard/${s.code}`}
                            className="group bg-white p-10 rounded-sm border border-[#D4AF37]/20 hover:border-[#D4AF37] hover:shadow-[0_20px_50px_rgba(212,175,55,0.1)] transition-all flex flex-col items-start gap-6 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150" />

                            <div className="w-14 h-14 bg-[#F1F0E8] border border-[#D4AF37]/10 rounded-sm flex items-center justify-center transition-colors group-hover:bg-[#002147] relative z-10">
                                <BookOpen className="h-6 w-6 text-[#D4AF37] group-hover:text-white transition-colors" />
                            </div>

                            <div className="space-y-3 relative z-10">
                                <h4 className="text-2xl font-classic text-[#002147] tracking-[0.1em] flex items-center gap-2">
                                    {s.code}
                                    <ChevronRight className="h-4 w-4 text-[#D4AF37] group-hover:translate-x-1 transition-transform" />
                                </h4>
                                <p className="text-[#002147]/80 font-serif text-lg leading-relaxed line-clamp-3 h-[5.5rem] overflow-hidden">
                                    {s.content}
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-2 pt-6 mt-auto border-t border-[#D4AF37]/10 w-full relative z-10">
                                <span className="px-3 py-1 bg-[#002147] text-[#D4AF37] text-[9px] font-black rounded-xs uppercase tracking-widest">
                                    {s.subject}
                                </span>
                                <span className="px-3 py-1 bg-[#F1F0E8] text-[#002147] text-[9px] font-black rounded-xs border border-[#D4AF37]/20 uppercase tracking-widest">
                                    {s.grade_level}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="py-32 flex flex-col items-center justify-center text-center bg-white rounded-[3rem] border-2 border-dashed border-gray-100 shadow-inner">
                    <div className="w-20 h-20 bg-gray-50 rounded-3xl shadow-sm flex items-center justify-center mb-8">
                        <Search className="h-10 w-10 text-gray-200" />
                    </div>
                    <h3 className="text-2xl font-black text-gray-900 tracking-tight mb-3">찾으시는 성취기준이 없습니다</h3>
                    <p className="text-gray-400 font-medium max-w-sm">검색어의 오타를 확인하거나 필터를 변경해 보세요.</p>
                    <button
                        onClick={handleReset}
                        className="mt-8 px-6 py-3 bg-gray-900 text-white rounded-2xl font-black text-sm hover:scale-105 transition-transform"
                    >
                        검색 조건 초기화
                    </button>
                </div>
            )}
        </div>
    );
}
