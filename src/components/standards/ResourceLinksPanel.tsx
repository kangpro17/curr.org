'use client';

import { useState, useMemo } from 'react';
import { ExternalLink, Filter, Video, FileText, BookOpen, Sparkles } from 'lucide-react';

interface ResourceLink {
    id: string;
    title: string;
    url: string;
    category: string;
    org: string;
    color: string; // Platform-specific color
}

interface ResourceLinksPanelProps {
    standardCode: string;
}

// Hardcoded resource data with real working links
const MOCK_RESOURCES: Record<string, ResourceLink[]> = {
    '9국01-01': [
        { id: '1', title: '상황에 맞는 언어 예절과 대화법', url: 'https://mid.ebs.co.kr', category: '영상 강의', org: 'EBS', color: 'bg-gradient-to-br from-green-400 to-green-600' },
        { id: '2', title: '중학 국어 - 언어 예절과 효과적인 말하기', url: 'https://www.youtube.com/results?search_query=중학+국어+언어+예절', category: '학습 영상', org: 'YouTube', color: 'bg-gradient-to-br from-red-500 to-red-700' },
        { id: '3', title: '국어 듣기말하기 학습 자료', url: 'https://www.edunet.net', category: '학습지', org: '에듀넷티클리어', color: 'bg-gradient-to-br from-blue-400 to-blue-600' },
        { id: '4', title: '중학교 국어 듣기·말하기 영역', url: 'https://cls.edunet.net', category: '온라인 강의', org: 'e학습터', color: 'bg-gradient-to-br from-indigo-400 to-indigo-600' },
    ],
    '9국01-02': [
        { id: '5', title: '공감적 듣기와 비언어적 의사소통', url: 'https://mid.ebs.co.kr', category: '영상 강의', org: 'EBS', color: 'bg-gradient-to-br from-green-400 to-green-600' },
        { id: '6', title: '상대방의 마음을 읽는 대화법', url: 'https://www.youtube.com/results?search_query=중학+국어+공감적+듣기', category: '학습 영상', org: 'YouTube', color: 'bg-gradient-to-br from-red-500 to-red-700' },
        { id: '7', title: 'The Power of Listening', url: 'https://ed.ted.com/search?qs=listening+skills', category: '교육 영상', org: 'TED-Ed', color: 'bg-gradient-to-br from-orange-400 to-orange-600' },
    ],
    '9수01-01': [
        { id: '8', title: '소인수분해의 원리와 방법', url: 'https://mid.ebs.co.kr', category: '영상 강의', org: 'EBS', color: 'bg-gradient-to-br from-green-400 to-green-600' },
        { id: '9', title: '소인수분해 개념과 문제풀이', url: 'https://www.youtube.com/results?search_query=중학+수학+소인수분해', category: '학습 영상', org: 'YouTube', color: 'bg-gradient-to-br from-red-500 to-red-700' },
        { id: '10', title: '소인수분해 일일 학습', url: 'https://www.11math.com', category: '문제 풀이', org: '일일수학', color: 'bg-gradient-to-br from-yellow-400 to-yellow-600' },
        { id: '11', title: '소인수분해 기초', url: 'https://ko.khanacademy.org/math/arithmetic/factors-multiples', category: '온라인 강의', org: '칸 아카데미', color: 'bg-gradient-to-br from-teal-400 to-teal-600' },
        { id: '12', title: '소인수분해 개념 정리', url: 'https://www.ebsmath.co.kr', category: '수학 강의', org: 'EBSMath', color: 'bg-gradient-to-br from-purple-400 to-purple-600' },
    ],
    '9과07-02': [
        { id: '13', title: '태양의 구조와 활동', url: 'https://mid.ebs.co.kr', category: '영상 강의', org: 'EBS', color: 'bg-gradient-to-br from-green-400 to-green-600' },
        { id: '14', title: '태양 활동과 지구 영향', url: 'https://www.youtube.com/results?search_query=중학+과학+태양+활동', category: '학습 영상', org: 'YouTube', color: 'bg-gradient-to-br from-red-500 to-red-700' },
        { id: '15', title: 'The Sun and Solar Activity', url: 'https://ed.ted.com/search?qs=sun+solar+activity', category: '교육 영상', org: 'TED-Ed', color: 'bg-gradient-to-br from-orange-400 to-orange-600' },
        { id: '16', title: '태양계와 우주 학습', url: 'https://www.scienceall.com', category: '과학 자료', org: '사이언스올', color: 'bg-gradient-to-br from-cyan-400 to-cyan-600' },
    ],
};

// Default resources for standards not in mock data
const DEFAULT_RESOURCES: ResourceLink[] = [
    { id: 'default-1', title: 'EBS 중학 강의', url: 'https://mid.ebs.co.kr', category: '영상 강의', org: 'EBS', color: 'bg-gradient-to-br from-green-400 to-green-600' },
    { id: 'default-2', title: 'YouTube 학습 영상', url: 'https://www.youtube.com', category: '학습 영상', org: 'YouTube', color: 'bg-gradient-to-br from-red-500 to-red-700' },
    { id: 'default-3', title: '에듀넷 학습 자료', url: 'https://www.edunet.net', category: '학습 자료', org: '에듀넷티클리어', color: 'bg-gradient-to-br from-blue-400 to-blue-600' },
];

export default function ResourceLinksPanel({ standardCode }: ResourceLinksPanelProps) {
    const [activeCategory, setActiveCategory] = useState<string>('all');

    // Get resources for this standard or use defaults
    const links = MOCK_RESOURCES[standardCode] || DEFAULT_RESOURCES;

    const categories = useMemo(() => {
        const cats = Array.from(new Set(links.map(l => l.category)));
        return cats;
    }, [links]);

    const filteredLinks = useMemo(() => {
        if (activeCategory === 'all') return links;
        return links.filter(l => l.category === activeCategory);
    }, [links, activeCategory]);

    const getIcon = (category: string) => {
        const cat = category.toLowerCase();
        if (cat.includes('영상') || cat.includes('비디오')) return <Video className="h-5 w-5" />;
        if (cat.includes('문제')) return <FileText className="h-5 w-5" />;
        return <BookOpen className="h-5 w-5" />;
    };

    return (
        <div className="space-y-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-8 border-b-2 border-purple-100">
                <div className="flex items-center gap-5">
                    <div className="w-16 h-16 purple-gradient rounded-3xl flex items-center justify-center shadow-lg">
                        <Sparkles className="h-8 w-8 text-white" />
                    </div>
                    <div>
                        <h3 className="text-3xl font-black text-gray-900">학습 자료 📚</h3>
                        <p className="text-lg text-gray-500 font-medium">성취기준 달성을 위한 엄선된 교육 자료입니다</p>
                    </div>
                </div>

                {/* Category Filter Chips */}
                {categories.length > 1 && (
                    <div className="flex items-center gap-3 overflow-x-auto pb-2">
                        <Filter className="h-5 w-5 text-gray-400 shrink-0" />
                        <div className="flex gap-2">
                            <button
                                onClick={() => setActiveCategory('all')}
                                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${activeCategory === 'all'
                                        ? 'yellow-button shadow-lg'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                전체 자료
                            </button>
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${activeCategory === cat
                                            ? 'yellow-button shadow-lg'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Resource Cards Grid - Chunky Design */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredLinks.map((link) => (
                    <a
                        key={link.id}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group chunky-card overflow-hidden hover:scale-105 transition-all duration-300 hover:shadow-2xl"
                    >
                        {/* Colorful Top Section with Platform Color */}
                        <div className={`${link.color} h-40 flex items-center justify-center relative overflow-hidden`}>
                            {/* Large Icon */}
                            <div className="text-white/20 absolute">
                                {getIcon(link.category)}
                            </div>
                            <div className="relative z-10 text-center p-4">
                                <div className="text-white/90 text-sm font-bold mb-2">{link.org}</div>
                                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto">
                                    {getIcon(link.category)}
                                </div>
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="p-6 space-y-4">
                            {/* Category Badge */}
                            <div className="inline-block px-3 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded-full">
                                {link.category}
                            </div>

                            {/* Title */}
                            <h5 className="text-lg font-bold text-gray-900 leading-tight line-clamp-2 group-hover:text-purple-600 transition-colors">
                                {link.title}
                            </h5>

                            {/* Footer */}
                            <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                                <span className="text-sm font-medium text-gray-500">{link.org}</span>
                                <ExternalLink className="h-5 w-5 text-purple-500 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </a>
                ))}
            </div>

            {/* Empty State */}
            {filteredLinks.length === 0 && (
                <div className="chunky-card p-16 text-center space-y-4">
                    <div className="text-6xl emoji">📭</div>
                    <h4 className="text-2xl font-black text-gray-900">자료가 없습니다</h4>
                    <p className="text-gray-500 font-medium">다른 카테고리를 선택해보세요</p>
                </div>
            )}
        </div>
    );
}
