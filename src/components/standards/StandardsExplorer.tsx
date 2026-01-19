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
                        <div className="flex bg-[#f0f7f3] p-2 rounded-lg border border-[#004225]/10 self-start shadow-inner">
                            {subjects.map(sub => (
                                <button
                                    key={sub}
                                    onClick={() => setActiveSubject(sub)}
                                    className={`px-10 py-3 rounded-md text-[11px] font-black tracking-[0.2em] uppercase transition-all ${activeSubject === sub
                                        ? 'bg-[#004225] text-white shadow-xl'
                                        : 'text-[#004225]/40 hover:text-[#004225] hover:bg-white/50'
                                        }`}
                                >
                                    {sub}
                                </button>
                            ))}
                        </div>

                        {/* Search Bar */}
                        <div className="relative flex-1 max-w-xl group">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-[#004225]/30 group-focus-within:text-[#004225] transition-colors" />
                            <input
                                type="text"
                                placeholder="성취기준 검색..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-14 pr-12 py-5 bg-[#f0f7f3] rounded-lg border border-transparent focus:border-[#004225]/20 focus:bg-white outline-none text-sm font-bold text-[#004225] transition-all placeholder:text-[#004225]/20 tracking-wide"
                            />
                        </div>
                    </div>

                    {/* Filter Bar (Dropdown and Status) */}
                    <div className="flex items-center justify-between pt-6 border-t border-[#004225]/5">
                        <div className="flex items-center gap-8">
                            <div className="relative">
                                <button
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="flex items-center gap-3 px-6 py-3 bg-white rounded-lg border border-[#004225]/10 text-xs font-black text-[#004225]/60 hover:border-[#004225]/30 transition-all shadow-sm"
                                >
                                    <Layers className="h-4 w-4 text-[#004225]/40" />
                                    <span>{selectedCategory === 'all' ? '전체 영역 필터' : selectedCategory}</span>
                                    <ChevronDown className={`h-3 w-3 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                                </button>
                            </div>
                        </div>

                        <p className="text-[11px] font-black text-[#004225] uppercase tracking-[0.3em] font-serif">
                            FOUND ARCHIVES: {filteredStandards.length}
                        </p>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            {filteredStandards.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {filteredStandards.map((s) => (
                        <Link
                            key={s.id}
                            href={`/standard/${s.code}`}
                            className="group bg-white p-12 rounded-lg border border-[#004225]/10 hover:border-[#004225] hover:shadow-2xl transition-all flex flex-col items-start gap-8 relative overflow-hidden aristocratic-border"
                        >
                            <div className="absolute top-0 right-0 w-40 h-40 bg-[#004225]/5 rounded-full -mr-20 -mt-20 transition-all group-hover:scale-110 group-hover:bg-[#004225]/10" />

                            <div className="w-16 h-16 bg-[#f0f7f3] border border-[#004225]/5 rounded-lg flex items-center justify-center transition-all group-hover:bg-[#004225] relative z-10">
                                <BookOpen className="h-8 w-8 text-[#004225] group-hover:text-white transition-colors" />
                            </div>

                            <div className="space-y-4 relative z-10">
                                <h4 className="text-3xl font-serif font-black text-[#004225] tracking-tight flex items-center gap-3">
                                    {s.code}
                                    <ChevronRight className="h-5 w-5 text-[#D4AF37] group-hover:translate-x-1 transition-transform" />
                                </h4>
                                <p className="text-[#002115]/80 font-serif text-xl leading-relaxed line-clamp-3 h-[6.5rem] overflow-hidden">
                                    {s.content}
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-3 pt-8 mt-auto border-t border-[#004225]/5 w-full relative z-10">
                                <span className="px-4 py-2 bg-[#004225] text-white text-[10px] font-black rounded-sm uppercase tracking-widest">
                                    {s.subject}
                                </span>
                                <span className="px-4 py-2 bg-[#f0f7f3] text-[#004225] text-[10px] font-black rounded-sm border border-[#004225]/10 uppercase tracking-widest">
                                    {s.grade_level}
                                </span>
                                <span className="px-4 py-2 bg-white text-[#D4AF37] text-[10px] font-black rounded-sm border border-[#D4AF37]/20 uppercase tracking-widest">
                                    {s.category}
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
