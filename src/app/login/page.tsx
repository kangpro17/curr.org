'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { LogIn, Mail, Lock, Loader2, AlertCircle, ShieldCheck } from 'lucide-react';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const supabase = createClient();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Check for specific admin credentials
        if (email === 'ABC' && password === '1234') {
            router.push('/admin');
            router.refresh();
            setLoading(false);
            return;
        }

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            router.push('/admin');
            router.refresh();
        } catch (err: any) {
            setError(err.message || '로그인에 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                {/* Logo / Header */}
                <div className="text-center mb-10 space-y-2">
                    <div className="w-16 h-16 bg-white rounded-3xl shadow-xl shadow-indigo-500/10 flex items-center justify-center mx-auto mb-6">
                        <ShieldCheck className="h-8 w-8 text-indigo-600" />
                    </div>
                    <h1 className="text-3xl font-black text-[#004225] tracking-tighter">관리자 로그인</h1>
                    <p className="text-gray-400 font-medium text-sm">시스템 관리를 위해 인증이 필요합니다.</p>
                </div>

                {/* Login Form */}
                <div className="bg-white rounded-[2.5rem] p-10 shadow-xl shadow-indigo-500/5 border border-gray-100 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/50 rounded-full -mr-32 -mt-32 blur-3xl" />

                    <form onSubmit={handleLogin} className="relative z-10 space-y-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">이메일 주소</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-300" />
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="admin@example.com"
                                        className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl border border-transparent focus:border-indigo-100 focus:bg-white outline-none text-sm font-bold transition-all"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">비밀번호</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-300" />
                                    <input
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl border border-transparent focus:border-indigo-100 focus:bg-white outline-none text-sm font-bold transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        {error && (
                            <div className="flex items-center gap-2 p-4 bg-red-50 rounded-xl text-red-500 text-xs font-bold border border-red-100 animate-in fade-in slide-in-from-top-2">
                                <AlertCircle className="h-4 w-4 shrink-0" />
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-5 bg-gray-900 text-white rounded-2xl font-black hover:bg-black transition-all shadow-xl disabled:opacity-50 flex items-center justify-center gap-3 relative overflow-hidden group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-indigo-500 opacity-0 group-hover:opacity-10 transition-opacity" />
                            {loading ? (
                                <Loader2 className="h-5 w-5 animate-spin" />
                            ) : (
                                <>
                                    <LogIn className="h-5 w-5" />
                                    계속하기
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Footer info */}
                <p className="mt-10 text-center text-xs font-bold text-gray-300 tracking-wide uppercase">
                    RDF Knowledge Graph Management System
                </p>
            </div>
        </div>
    );
}
