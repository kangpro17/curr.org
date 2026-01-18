'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabaseClient';
import Link from 'next/link';
import {
    ExternalLink,
    Image as ImageIcon,
    Settings,
    FileText,
    ArrowRight,
    Loader2
} from 'lucide-react';

export default function AdminDashboard() {
    const [stats, setStats] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        async function fetchStats() {
            try {
                const [
                    { count: linksCount },
                    { count: surveysCount },
                    { count: bannersCount }
                ] = await Promise.all([
                    supabase.from('resource_links').select('*', { count: 'exact', head: true }),
                    supabase.from('surveys').select('*', { count: 'exact', head: true }),
                    supabase.from('banners').select('*', { count: 'exact', head: true })
                ]);

                setStats([
                    { label: '활성 자료 링크', value: linksCount || 0, icon: ExternalLink, trend: '+12%', color: 'text-indigo-600', bg: 'bg-indigo-50' },
                    { label: '누적 설문 응답', value: surveysCount || 0, icon: FileText, trend: '+5%', color: 'text-green-600', bg: 'bg-green-50' },
                    { label: '운영 중인 배너', value: bannersCount || 0, icon: ImageIcon, trend: 'stable', color: 'text-amber-600', bg: 'bg-amber-50' },
                ]);
            } catch (err) {
                console.error('Failed to fetch stats:', err);
            } finally {
                setLoading(false);
            }
        }
        fetchStats();
    }, [supabase]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="h-8 w-8 text-indigo-600 animate-spin mb-4" />
                <p className="text-gray-400 font-bold">통계 데이터를 불러오는 중...</p>
            </div>
        );
    }

    return (
        <div className="space-y-10">
            {/* Welcome Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">대시보드</h1>
                    <p className="text-gray-400 font-medium">시스템 현황을 한눈에 파악하고 관리하세요.</p>
                </div>
                <div className="flex gap-3">
                    <Link
                        href="/"
                        className="px-4 py-2 text-sm font-bold text-gray-400 hover:text-indigo-600 transition-colors flex items-center gap-2"
                    >
                        서비스 홈
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all group">
                        <div className="flex justify-between items-start mb-6">
                            <div className={`p-4 ${stat.bg} ${stat.color} rounded-2xl transition-transform group-hover:scale-110`}>
                                <stat.icon className="h-6 w-6" />
                            </div>
                            <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest bg-gray-50 px-2 py-1 rounded-md">{stat.trend}</span>
                        </div>
                        <div className="space-y-1">
                            <p className="text-gray-400 text-xs font-black uppercase tracking-wider">{stat.label}</p>
                            <p className="text-4xl font-black text-gray-900">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Manage Links Card */}
                <Link
                    href="/admin/links"
                    className="group bg-indigo-600 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl shadow-indigo-500/20"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl group-hover:scale-125 transition-transform" />
                    <div className="relative z-10 space-y-6">
                        <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                            <Settings className="h-6 w-6" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-black tracking-tight mb-2">자료 링크 관리</h3>
                            <p className="text-indigo-100/70 font-medium text-sm leading-relaxed">
                                성취기준별 공공기관 자료, 영상, 학습 리소스를{"\n"}
                                직접 추가하고 비활성화 상태를 관리합니다.
                            </p>
                        </div>
                        <div className="inline-flex items-center gap-2 text-white font-black text-sm pt-4">
                            링크 관리하기 <ArrowRight className="h-4 w-4" />
                        </div>
                    </div>
                </Link>

                {/* Manage Banners Card */}
                <Link
                    href="/admin/banners"
                    className="group bg-gray-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl"
                >
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full -mr-32 -mb-32 blur-3xl group-hover:scale-125 transition-transform" />
                    <div className="relative z-10 space-y-6">
                        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-indigo-400">
                            <ImageIcon className="h-6 w-6" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-black tracking-tight mb-2">배너 및 공지 관리</h3>
                            <p className="text-white/40 font-medium text-sm leading-relaxed">
                                메인 화면의 학습 추천 배너와 공지사항을{"\n"}
                                기간별로 스케줄링하여 관리할 수 있습니다.
                            </p>
                        </div>
                        <div className="inline-flex items-center gap-2 text-white font-black text-sm pt-4">
                            배너 관리하기 <ArrowRight className="h-4 w-4" />
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
}
