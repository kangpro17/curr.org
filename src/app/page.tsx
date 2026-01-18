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
      <section className="container mx-auto px-4 -mt-20 relative z-20">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Intro Text */}
          <div className="hidden sm:block space-y-4 text-center md:text-left drop-shadow-sm">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
              성취기준 탐색기
            </h2>
            <p className="text-lg text-gray-500 font-medium max-w-2xl">
              2022 개정 교육과정의 핵심 성취기준을{"\n"}
              교과별, 영역별로 자유롭게 검색하고 탐색하세요.
            </p>
          </div>

          {standards && standards.length > 0 ? (
            <StandardsExplorer standards={standards} />
          ) : (
            <div className="bg-white rounded-[2.5rem] p-20 border-2 border-dashed border-gray-100 flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center">
                <AlertCircle className="h-8 w-8 text-red-400" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-black text-gray-900">데이터를 불러올 수 없습니다</h3>
                <p className="text-gray-400 font-medium max-w-sm mx-auto">
                  성취기준 데이터를 파싱하는 중 오류가 발생했거나 데이터가 비어있습니다.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      {standards && standards.length > 0 && (
        <section className="container mx-auto px-4 mt-24">
          <div className="max-w-6xl mx-auto bg-gray-50 rounded-[2.5rem] p-12 border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-2 text-center md:text-left">
              <h4 className="text-2xl font-black text-gray-900 tracking-tight">데이터로 보는 성취기준</h4>
              <p className="text-gray-400 font-medium">실시간 데이터베이스 및 RDF 연동을 통해 최신 정보를 제공합니다.</p>
            </div>
            <div className="flex gap-4">
              <div className="px-8 py-4 bg-white rounded-2xl shadow-sm border border-gray-100 text-center space-y-1">
                <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">총 데이터</p>
                <p className="text-3xl font-black text-gray-900 leading-none">{standards.length}</p>
              </div>
              <div className="px-8 py-4 bg-white rounded-2xl shadow-sm border border-gray-100 text-center space-y-1">
                <p className="text-[10px] font-black text-green-400 uppercase tracking-widest">교과 수</p>
                <p className="text-3xl font-black text-gray-900 leading-none">3</p>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
