import React from 'react';

export default function StyleTest() {
  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto space-y-12">
        <h1 className="text-3xl font-bold text-white mb-8">Style Comparison</h1>
        
        {/* Current Style */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Current Style</h2>
          <div className="h-40 bg-[linear-gradient(90deg,theme(colors.yellow.500)_0%,theme(colors.blue.800)_5%,theme(colors.blue.800)_95%,theme(colors.yellow.500)_100%),linear-gradient(180deg,theme(colors.yellow.500)_0%,theme(colors.blue.800)_25%,theme(colors.blue.800)_75%,theme(colors.yellow.500)_100%)] rounded-lg border border-yellow-500 shadow-[0_0_0_1px_#eab308,0_0_2px_#eab308,0_0_4px_#eab308,0_0_6px_#eab308,0_0_8px_#eab308,0_0_10px_#eab308,0_0_20px_#eab308,0_0_30px_#eab308,0_0_40px_#eab308]">
          </div>
        </div>

        {/* Proposed Style */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Proposed Style</h2>
          <div className="h-40 bg-[linear-gradient(90deg,theme(colors.yellow.500)_0%,theme(colors.yellow.500)_8%,theme(colors.blue.800)_12%,theme(colors.blue.800)_88%,theme(colors.yellow.500)_92%,theme(colors.yellow.500)_100%),linear-gradient(180deg,rgba(234,179,8,0.95)_0%,rgba(234,179,8,0.85)_10%,theme(colors.blue.800)_18%,theme(colors.blue.800)_82%,rgba(234,179,8,0.85)_90%,rgba(234,179,8,0.95)_100%)] rounded-lg border border-yellow-500 shadow-[0_0_0_4px_#eab308,0_0_8px_#eab308,0_0_16px_#eab308,0_0_32px_#eab308,0_0_48px_#eab308]">
          </div>
        </div>

        {/* Key Differences */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-white mb-4">Key Differences</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>Wider yellow bands on the sides (8% vs 5%)</li>
            <li>More intense yellow at the top and bottom (95% opacity vs solid)</li>
            <li>Thicker yellow bands at top/bottom (10% vs 25%)</li>
            <li>Stronger glow effect with larger shadow spread</li>
            <li>More gradual transition between colors</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 