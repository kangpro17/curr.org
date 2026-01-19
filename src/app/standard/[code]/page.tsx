import { getStandards } from "@/lib/parsing";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, BookOpen, Layers, GraduationCap } from "lucide-react";
import ResourceLinksPanel from "@/components/standards/ResourceLinksPanel";
import SurveyForm from "@/components/survey/SurveyForm";

interface PageProps {
    params: Promise<{ code: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
    const standards = await getStandards();
    return standards.map((s) => ({
        code: s.code,
    }));
}

export default async function StandardDetail({ params }: PageProps) {
    const { code } = await params;
    const decodedCode = decodeURIComponent(code);
    const standards = await getStandards();
    const standard = standards.find((s: any) => s.code === decodedCode);

    // If no match found, trigger Next.js 404
    if (!standard) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-[#FDFCF8] pb-40">
            {/* Detailed Header Section */}
            <div className="british-green-gradient border-b-8 border-[#D4AF37] shadow-2xl pt-24 pb-32 relative overflow-hidden">
                {/* Decorative Pattern overlay could go here */}
                <div className="container mx-auto px-6 relative z-10">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-3 text-xs font-black text-[#D4AF37] hover:text-white uppercase tracking-[0.4em] mb-16 transition-all group"
                    >
                        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-2" />
                        아카이브로 돌아가기
                    </Link>

                    <div className="max-w-6xl space-y-12">
                        <div className="flex flex-col gap-10">
                            {/* Prominent Code Chip */}
                            <div className="flex items-center gap-8">
                                <div className="px-10 py-4 bg-[#D4AF37] text-[#004225] text-3xl font-serif font-black tracking-widest rounded-lg shadow-2xl">
                                    {standard.code}
                                </div>
                                <h2 className="text-[#D4AF37]/50 font-serif uppercase tracking-[0.5em] text-xs hidden md:block">
                                    국가 교육과정 성취기준 아카이브
                                </h2>
                            </div>

                            {/* Badge Metadata Row */}
                            <div className="flex flex-wrap gap-5">
                                <div className="flex items-center gap-4 px-6 py-3 bg-white/10 border border-white/20 rounded-lg backdrop-blur-md">
                                    <BookOpen className="h-5 w-5 text-[#D4AF37]" />
                                    <span className="text-xs font-black text-white uppercase tracking-widest">{standard.subject}</span>
                                </div>
                                <div className="flex items-center gap-4 px-6 py-3 bg-white/10 border border-white/20 rounded-lg backdrop-blur-md">
                                    <Layers className="h-5 w-5 text-[#D4AF37]" />
                                    <span className="text-xs font-black text-white uppercase tracking-widest">{standard.category}</span>
                                </div>
                                <div className="flex items-center gap-4 px-6 py-3 bg-[#D4AF37]/20 border border-[#D4AF37]/40 rounded-lg">
                                    <GraduationCap className="h-5 w-5 text-[#D4AF37]" />
                                    <span className="text-xs font-black text-[#D4AF37] uppercase tracking-widest">{standard.grade_level}</span>
                                </div>
                            </div>
                        </div>

                        {/* Main Content Title */}
                        <div className="relative border-l-4 border-[#D4AF37]/40 pl-10">
                            <h1 className="text-5xl md:text-7xl font-serif text-white tracking-tight leading-[1.2] drop-shadow-2xl">
                                {standard.content}
                            </h1>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content & Integration Sections */}
            <div className="container mx-auto px-6 -mt-16 relative z-20">
                <div className="max-w-6xl space-y-32">
                    <div className="bg-white p-16 rounded-xl border border-[#004225]/10 shadow-2xl shadow-[#004225]/5 aristocratic-border">
                        {/* Related Resources Panel */}
                        <ResourceLinksPanel standardCode={standard.code} />
                    </div>

                    <div className="british-green-gradient p-16 rounded-xl border-t-8 border-[#D4AF37] shadow-3xl">
                        {/* Satisfaction Survey Section */}
                        <div className="text-center mb-16 space-y-4">
                            <h3 className="text-3xl font-serif font-black text-[#D4AF37] tracking-widest uppercase">실시간 교육 환류</h3>
                            <p className="text-xl text-white/60 font-serif italic">해당 성취기준에 대한 여러분의 소중한 의견을 남겨주세요.</p>
                        </div>
                        <SurveyForm standardCode={standard.code} />
                    </div>
                </div>
            </div>
        </div>
    );
}
