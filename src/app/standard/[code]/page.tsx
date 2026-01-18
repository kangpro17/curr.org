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
        code: encodeURIComponent(s.code),
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
        <div className="min-h-screen bg-gray-50/50 pb-32">
            {/* Detailed Header Section */}
            <div className="bg-white border-b border-gray-100 shadow-sm">
                <div className="container mx-auto px-4 py-12">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-indigo-600 mb-10 transition-colors group"
                    >
                        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                        성취기준 목록으로 돌아가기
                    </Link>

                    <div className="max-w-4xl space-y-8">
                        <div className="flex flex-col gap-6">
                            {/* Prominent Code Chip */}
                            <div className="flex items-center gap-4">
                                <div className="px-6 py-2 bg-indigo-600 text-white text-lg font-black rounded-2xl shadow-lg shadow-indigo-500/20 tracking-tighter">
                                    {standard.code}
                                </div>
                                <h2 className="text-gray-400 font-bold uppercase tracking-[0.3em] text-[10px]">
                                    2022 Revised Curriculum Standard
                                </h2>
                            </div>

                            {/* Badge Metadata Row */}
                            <div className="flex flex-wrap gap-3">
                                <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-xl border border-gray-100 shadow-sm">
                                    <BookOpen className="h-4 w-4 text-indigo-400" />
                                    <span className="text-xs font-black text-gray-600 uppercase tracking-widest">{standard.subject}</span>
                                </div>
                                <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-xl border border-gray-100 shadow-sm">
                                    <Layers className="h-4 w-4 text-indigo-400" />
                                    <span className="text-xs font-black text-gray-600 uppercase tracking-widest">{standard.category}</span>
                                </div>
                                <div className="flex items-center gap-2 px-4 py-2 bg-indigo-50/50 rounded-xl border border-indigo-50 shadow-sm">
                                    <GraduationCap className="h-4 w-4 text-indigo-500" />
                                    <span className="text-xs font-black text-indigo-600 uppercase tracking-widest">{standard.grade_level}</span>
                                </div>
                            </div>
                        </div>

                        {/* Main Content Title */}
                        <div className="relative">
                            <div className="absolute -left-6 top-0 bottom-0 w-1 bg-indigo-600 rounded-full opacity-20" />
                            <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tighter leading-[1.15] pl-2 drop-shadow-sm">
                                {standard.content}
                            </h1>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content & Integration Sections */}
            <div className="container mx-auto px-4 mt-16">
                <div className="max-w-4xl space-y-20">

                    {/* Related Resources Panel */}
                    <ResourceLinksPanel standardCode={standard.code} />

                    {/* Satisfaction Survey Section */}
                    <SurveyForm standardCode={standard.code} />

                </div>
            </div>
        </div>
    );
}
