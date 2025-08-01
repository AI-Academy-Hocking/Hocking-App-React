import React from 'react';

export default function StyleExample() {
  return (
    <div className="p-8 space-y-8">
      <h2 className="text-2xl font-bold text-white mb-4">Style Comparison</h2>
      
      {/* Current Style */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white">Current Style</h3>
        <div className="h-40 bg-[linear-gradient(90deg,theme(colors.yellow.500)_0%,theme(colors.blue.800)_5%,theme(colors.blue.800)_95%,theme(colors.yellow.500)_100%),linear-gradient(180deg,theme(colors.yellow.500)_0%,theme(colors.blue.800)_25%,theme(colors.blue.800)_75%,theme(colors.yellow.500)_100%)] rounded-lg border border-yellow-500 shadow-[0_0_0_1px_#eab308,0_0_2px_#eab308,0_0_4px_#eab308,0_0_6px_#eab308,0_0_8px_#eab308,0_0_10px_#eab308,0_0_20px_#eab308,0_0_30px_#eab308,0_0_40px_#eab308]">
        </div>
      </div>

      {/* Proposed Style */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white">Proposed Style</h3>
        <div className="h-40 bg-[linear-gradient(90deg,theme(colors.yellow.500)_0%,theme(colors.yellow.500)_8%,theme(colors.blue.800)_12%,theme(colors.blue.800)_88%,theme(colors.yellow.500)_92%,theme(colors.yellow.500)_100%),linear-gradient(180deg,rgba(234,179,8,0.95)_0%,rgba(234,179,8,0.85)_10%,theme(colors.blue.800)_18%,theme(colors.blue.800)_82%,rgba(234,179,8,0.85)_90%,rgba(234,179,8,0.95)_100%)] rounded-lg border border-yellow-500 shadow-[0_0_0_4px_#eab308,0_0_8px_#eab308,0_0_16px_#eab308,0_0_32px_#eab308,0_0_48px_#eab308]">
        </div>
      </div>
    </div>
  );
} 
