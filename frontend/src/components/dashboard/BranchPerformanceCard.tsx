import { Building2 } from "lucide-react";

import { fmt } from "../../utils/currency";

interface BranchData {
  branch: string;
  revenue: number;
  pct: number;
  trend: string;
}

interface BranchPerformanceCardProps {
  branches: BranchData[];
}

export function BranchPerformanceCard({
  branches,
}: BranchPerformanceCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <h3 className="font-bold text-gray-900 mb-5">
        Performa Cabang
      </h3>

      <div className="space-y-4">
        {branches.map((branch) => (
          <div key={branch.branch}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Building2 className="w-3.5 h-3.5 text-gray-400" />

                <span className="text-sm font-medium text-gray-700">
                  {branch.branch}
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <span className="text-sm font-bold text-gray-900">
                  {fmt(branch.revenue)}
                </span>

                <span className="text-xs text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">
                  {branch.trend}
                </span>
              </div>
            </div>

            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full"
                style={{
                  width: `${branch.pct}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}