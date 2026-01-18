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
        <div className="min-h-screen bg-[#FDFCF8] pb-32">
            {/* Detailed Header Section */}
            <div className="bg-[#002147] border-b-4 border-[#D4AF37] shadow-xl pt-16 pb-20">
                <div className="container mx-auto px-4">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-[10px] font-black text-[#D4AF37] hover:text-white uppercase tracking-[0.3em] mb-12 transition-all group"
                    >
                        <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-1" />
                        BACK TO ARCHIVES
                    </Link>

                    <div className="max-w-5xl space-y-10">
                        <div className="flex flex-col gap-8">
                            {/* Prominent Code Chip */}
                            <div className="flex items-center gap-6">
                                <div className="px-8 py-3 bg-[#D4AF37] text-[#002147] text-2xl font-classic tracking-widest rounded-sm shadow-2xl">
                                    {standard.code}
                                </div>
                                <h2 className="text-[#D4AF37]/60 font-classic uppercase tracking-[0.4em] text-[10px] hidden sm:block">
                                    Royal Academy Curriculum Standard
                                </h2>
                            </div>

                            {/* Badge Metadata Row */}
                            <div className="flex flex-wrap gap-4">
                                <div className="flex items-center gap-3 px-5 py-2 bg-white/5 border border-white/10 rounded-sm">
                                    <BookOpen className="h-4 w-4 text-[#D4AF37]" />
                                    <span className="text-[10px] font-black text-white/80 uppercase tracking-widest">{standard.subject}</span>
                                </div>
                                <div className="flex items-center gap-3 px-5 py-2 bg-white/5 border border-white/10 rounded-sm">
                                    <Layers className="h-4 w-4 text-[#D4AF37]" />
                                    <span className="text-[10px] font-black text-white/80 uppercase tracking-widest">{standard.category}</span>
                                </div>
                                <div className="flex items-center gap-3 px-5 py-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-sm">
                                    <GraduationCap className="h-4 w-4 text-[#D4AF37]" />
                                    <span className="text-[10px] font-black text-[#D4AF37] uppercase tracking-widest">{standard.grade_level}</span>
                                </div>
                            </div>
                        </div>

                        {/* Main Content Title */}
                        <div className="relative border-l-2 border-[#D4AF37]/30 pl-8">
                            <h1 className="text-4xl md:text-6xl font-serif text-white tracking-tight leading-[1.1] drop-shadow-lg">
                                {standard.content}
                            </h1>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content & Integration Sections */}
            <div className="container mx-auto px-4 -mt-10 relative z-20">
                <div className="max-w-5xl space-y-24">
                    <div className="bg-white p-12 rounded-sm border border-[#D4AF37]/20 shadow-2xl shadow-[#D4AF37]/5">
                        {/* Related Resources Panel */}
                        <ResourceLinksPanel standardCode={standard.code} />
                    </div>

                    <div className="bg-[#002147] p-12 rounded-sm border-t-4 border-[#D4AF37] shadow-2xl">
                        {/* Satisfaction Survey Section */}
                        <h3 className="text-2xl font-classic text-[#D4AF37] mb-8 tracking-widest text-center">FEEDBACK ARCHIVE</h3>
                        <SurveyForm standardCode={standard.code} />
                    </div>
                </div>
            </div>
        </div>
    );
}
