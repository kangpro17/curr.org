import BannerCarousel from "@/components/common/BannerCarousel";
import StandardsExplorer from "@/components/standards/StandardsExplorer";
import { getStandards } from "@/lib/parsing";
import { AlertCircle } from "lucide-react";

export default async function Home() {
  const standards = await getStandards();

  return (
    <div className="flex flex-col gap-0 pb-24">
      {/* Visual Header / Banner */}
      <BannerCarousel />

      {/* Search & Explorer Section */}
      <section className="container mx-auto px-4 -mt-24 relative z-20">
        <div className="max-w-6xl mx-auto space-y-16">
          {/* Intro Text */}
          <div className="hidden sm:block space-y-6 text-center md:text-left">
            <h2 className="text-5xl md:text-7xl font-serif text-[#002147] tracking-tight drop-shadow-md">
              The Grand Archive
            </h2>
            <div className="h-1 w-24 bg-[#D4AF37] mx-auto md:mx-0 shadow-lg" />
            <p className="text-xl text-[#002147]/60 font-serif italic max-w-2xl leading-relaxed">
              Explore the 2022 Revised Curriculum Standards with precision and elegance.{"\n"}
              A curated collection of educational benchmarks for excellence.
            </p>
          </div>

          {standards && standards.length > 0 ? (
            <StandardsExplorer standards={standards} />
          ) : (
            <div className="bg-white rounded-sm p-20 border border-[#D4AF37]/20 flex flex-col items-center text-center space-y-6 shadow-2xl">
              <div className="w-20 h-20 bg-[#F1F0E8] rounded-full flex items-center justify-center border border-[#D4AF37]/30">
                <AlertCircle className="h-10 w-10 text-[#D4AF37]" />
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-classic text-[#002147] tracking-widest">ARCHIVE UNAVAILABLE</h3>
                <p className="text-[#002147]/40 font-serif italic max-w-sm mx-auto">
                  The registry is currently undergoing maintenance. Please return at your earliest convenience.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      {standards && standards.length > 0 && (
        <section className="container mx-auto px-4 mt-32">
          <div className="max-w-6xl mx-auto bg-[#002147] rounded-sm p-16 border-l-8 border-[#D4AF37] flex flex-col md:flex-row items-center justify-between gap-12 shadow-2xl">
            <div className="space-y-4 text-center md:text-left">
              <h4 className="text-3xl font-serif text-[#D4AF37] tracking-tight">Institutional Metrics</h4>
              <p className="text-white/50 font-serif italic text-lg leading-relaxed">Providing real-time tracking of educational standards and RDF-linked datasets.</p>
            </div>
            <div className="flex gap-8">
              <div className="px-12 py-8 bg-white/5 border border-white/10 rounded-sm text-center space-y-2 backdrop-blur-sm">
                <p className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.3em]">Total Archives</p>
                <p className="text-5xl font-classic text-white tracking-widest leading-none">{standards.length}</p>
              </div>
              <div className="px-12 py-8 bg-[#D4AF37] rounded-sm text-center space-y-2 shadow-xl">
                <p className="text-[10px] font-black text-[#002147] uppercase tracking-[0.3em]">Faculties</p>
                <p className="text-5xl font-classic text-[#002147] tracking-widest leading-none">3</p>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
