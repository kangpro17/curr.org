'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabaseClient';
import { Database } from '@/lib/types';
import { Search, Plus, Trash2, Edit2, Check, X, Loader2, Link as LinkIcon, Globe, FileText, Video, ExternalLink } from 'lucide-react';

type ResourceLink = Database['public']['Tables']['resource_links']['Row'];

export default function AdminLinks() {
    const [links, setLinks] = useState<ResourceLink[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [isEditing, setIsEditing] = useState<string | null>(null);
    const [formData, setFormData] = useState<Partial<ResourceLink>>({});

    const supabase = createClient();

    useEffect(() => {
        fetchLinks();
    }, []);

    const fetchLinks = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('resource_links')
            .select('*')
            .order('created_at', { ascending: false });

        if (!error) setLinks(data || []);
        setLoading(false);
    };

    const handleToggleActive = async (id: string, current: boolean) => {
        const { error } = await (supabase
            .from('resource_links') as any)
            .update({ is_active: !current })
            .eq('id', id);
        if (!error) fetchLinks();
    };

    const handleDelete = async (id: string) => {
        if (!confirm('정말 삭제하시겠습니까?')) return;
        const { error } = await supabase
            .from('resource_links')
            .delete()
            .eq('id', id);
        if (!error) fetchLinks();
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        const action = isEditing === 'new'
            ? (supabase.from('resource_links') as any).insert([formData])
            : (supabase.from('resource_links') as any).update(formData).eq('id', isEditing!);

        const { error } = await action;
        if (!error) {
            setIsEditing(null);
            setFormData({});
            fetchLinks();
        }
    };

    const filteredLinks = links.filter(l =>
        l.title.toLowerCase().includes(search.toLowerCase()) ||
        l.standard_code.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">자료 링크 관리</h1>
                    <p className="text-gray-400 font-medium">성취기준별 외부 학습 리소스를 관리합니다.</p>
                </div>
                <button
                    onClick={() => { setIsEditing('new'); setFormData({ is_active: true, standard_code: '', title: '', url: '', category: '학습자료' }); }}
                    className="px-6 py-3 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-500 shadow-lg shadow-indigo-500/20 transition-all flex items-center gap-2"
                >
                    <Plus className="h-5 w-5" />
                    신규 링크 추가
                </button>
            </div>

            {/* Filter & Search */}
            <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4">
                <Search className="h-5 w-5 text-gray-300 ml-2" />
                <input
                    type="text"
                    placeholder="성취기준 코드 또는 제목 검색..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="flex-1 bg-transparent border-none outline-none text-sm font-bold text-gray-900"
                />
            </div>

            {/* Table Section */}
            <div className="bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-gray-50">
                                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">성취기준</th>
                                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">제목 / URL</th>
                                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">카테고리</th>
                                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">상태 / 관리</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {loading ? (
                                <tr><td colSpan={4} className="px-8 py-20 text-center"><Loader2 className="h-8 w-8 animate-spin mx-auto text-indigo-400" /></td></tr>
                            ) : filteredLinks.length === 0 ? (
                                <tr><td colSpan={4} className="px-8 py-20 text-center text-gray-300 font-bold">검색 결과가 없습니다.</td></tr>
                            ) : (
                                filteredLinks.map(link => (
                                    <tr key={link.id} className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="px-8 py-6 font-black text-indigo-600 tabular-nums">{link.standard_code}</td>
                                        <td className="px-8 py-6">
                                            <div className="space-y-0.5">
                                                <p className="font-bold text-gray-900">{link.title}</p>
                                                <a href={link.url} target="_blank" className="text-xs text-gray-400 hover:text-indigo-400 flex items-center gap-1">
                                                    {link.url.slice(0, 40)}... <ExternalLink className="h-3 w-3" />
                                                </a>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="px-3 py-1 bg-gray-50 text-gray-400 text-[10px] font-black rounded-lg uppercase tracking-wider">{link.category}</span>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => handleToggleActive(link.id, link.is_active)}
                                                    className={`p-2 rounded-xl transition-all ${link.is_active ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}
                                                >
                                                    {link.is_active ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                                                </button>
                                                <button
                                                    onClick={() => { setIsEditing(link.id); setFormData(link); }}
                                                    className="p-2 bg-gray-50 text-gray-400 rounded-xl hover:bg-gray-900 hover:text-white transition-all shadow-sm"
                                                >
                                                    <Edit2 className="h-4 w-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(link.id)}
                                                    className="p-2 bg-gray-100 text-gray-300 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Simple Form Modal Placeholder (Ideally separate component) */}
            {isEditing && (
                <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <div className="bg-white rounded-[2.5rem] w-full max-w-lg p-10 shadow-2xl animate-in fade-in zoom-in duration-300 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/50 rounded-full -mr-32 -mt-32 blur-3xl" />

                        <form onSubmit={handleSave} className="relative z-10 space-y-8">
                            <h2 className="text-2xl font-black text-gray-900 tracking-tight">링크 정보 {isEditing === 'new' ? '추가' : '수정'}</h2>

                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">성취기준 코드</label>
                                        <input
                                            type="text" required value={formData.standard_code || ''}
                                            onChange={e => setFormData({ ...formData, standard_code: e.target.value })}
                                            className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-transparent focus:border-indigo-100 focus:bg-white outline-none text-sm font-bold transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">카테고리</label>
                                        <select
                                            value={formData.category || ''}
                                            onChange={e => setFormData({ ...formData, category: e.target.value })}
                                            className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-transparent focus:border-indigo-100 focus:bg-white outline-none text-sm font-bold transition-all"
                                        >
                                            <option>학습자료</option>
                                            <option>영상</option>
                                            <option>공공기관</option>
                                            <option>보고서</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">제목</label>
                                    <input
                                        type="text" required value={formData.title || ''}
                                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-transparent focus:border-indigo-100 focus:bg-white outline-none text-sm font-bold transition-all"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">URL</label>
                                    <input
                                        type="url" required value={formData.url || ''}
                                        onChange={e => setFormData({ ...formData, url: e.target.value })}
                                        className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-transparent focus:border-indigo-100 focus:bg-white outline-none text-sm font-bold transition-all"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <button type="button" onClick={() => setIsEditing(null)} className="flex-1 py-4 bg-gray-50 text-gray-400 rounded-2xl font-black hover:bg-gray-100 transition-all">취소</button>
                                <button type="submit" className="flex-1 py-4 bg-indigo-600 text-white rounded-2xl font-black hover:bg-indigo-500 shadow-xl shadow-indigo-500/10 transition-all">저장하기</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
