import { FC, useEffect, useRef, useCallback } from "react";
import type { components } from "@/types/openapi";

// Diary型
export type Diary = components["schemas"]["Diary"];

interface Props {
  diaries: Diary[];
}

// グラフの設定
const CHART_CONFIG = {
  colors: {
    mental: "#14b8a6",
    sleep: "rgba(20, 184, 166, 0.2)",
    sleepBorder: "rgba(20, 184, 166, 0.4)",
    devTime: "rgba(20, 184, 166, 0.2)",
    devTimeBorder: "rgba(20, 184, 166, 0.4)",
    grid: "#e5e7eb",
    text: "#6b7280",
  },
  padding: {
    top: 20,      // 40 → 20
    bottom: 60,   // 100 → 60
    left: 40,
    right: 40,
  },
  barWidth: 0.25,
  barSpacing: 0.1,
  lineWidth: 2,
  pointRadius: 4,
} as const;

export const MultiMetricChart: FC<Props> = ({ diaries }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // drawChartはuseEffectの依存配列に含める必要があるため、useCallbackでメモ化する
  const drawChart = useCallback((
    ctx: CanvasRenderingContext2D,
    rect: DOMRect,
    data: Diary[]
    // sleepScores: number[],
    // devTimeScores: number[]
  ) => {
    const { width, height } = rect;
    const { padding } = CHART_CONFIG;
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;
    ctx.clearRect(0, 0, width, height);
    drawGrid(ctx, width, height, chartWidth, chartHeight, padding);
    drawLabels(ctx, width, height, chartWidth, chartHeight, padding, data);
    // drawBarCharts(ctx, chartWidth, chartHeight, padding, data, sleepScores, devTimeScores); // 棒グラフは一旦非表示
    drawLineChart(ctx, chartWidth, chartHeight, padding, data);
  }, []); // 依存配列は必要に応じて調整

  useEffect(() => {
    // グラフ描画処理。drawChartを依存配列に含めることでESLint警告を回避
    const canvas = canvasRef.current;
    if (!canvas || diaries.length === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = rect.width + "px";
    canvas.style.height = rect.height + "px";
    ctx.scale(dpr, dpr);
    const sortedData = [...diaries].sort((a, b) => a.date.localeCompare(b.date));
    // const sleepScores = sortedData.map(() => Math.floor(Math.random() * 5) + 5);
    // const devTimeScores = sortedData.map(() => Math.floor(Math.random() * 4) + 1);
    drawChart(ctx, rect, sortedData);
  }, [diaries, drawChart]); // drawChartを依存配列に追加し、ESLint警告を防ぐ

  const drawGrid = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    chartWidth: number,
    chartHeight: number,
    padding: typeof CHART_CONFIG.padding
  ) => {
    ctx.strokeStyle = CHART_CONFIG.colors.grid;
    ctx.lineWidth = 1;

    // 水平グリッド線
    for (let i = 1; i <= 10; i++) {
      const y = padding.top + (chartHeight * (10 - i)) / 9;
      // グリッド線
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(width - padding.right, y);
      ctx.stroke();
      ctx.fillStyle = CHART_CONFIG.colors.text;
      ctx.font = "12px Arial";
      ctx.textAlign = "end";
      // 1の位の位置が揃うように、monospaceフォントを使い、描画位置も微調整
      ctx.font = "12px 'Menlo', 'Consolas', 'monospace'";
      ctx.fillText(i.toString().padStart(2, ' '), padding.left - 10, y + 4);
    }
  };

  const drawLabels = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    chartWidth: number,
    chartHeight: number,
    padding: typeof CHART_CONFIG.padding,
    data: Diary[]
  ) => {
    // X軸ラベル（日付）
    ctx.textAlign = "center";
    ctx.font = "12px Arial";
    if (data.length === 1) {
      // 1件だけの場合は中央に日付を描画
      const x = padding.left + chartWidth / 2;
      const date = new Date(data[0].date);
      const dateStr = `${date.getMonth() + 1}/${date.getDate()}`;
      ctx.fillText(dateStr, x, height - padding.bottom + 30);
      return;
    }
    data.forEach((diary, index) => {
      const x = padding.left + (chartWidth * index) / (data.length - 1);
      const date = new Date(diary.date);
      const dateStr = `${date.getMonth() + 1}/${date.getDate()}`;
      ctx.fillText(dateStr, x, height - padding.bottom + 30);
    });
  };

  // drawBarCharts関数自体も未使用なのでコメントアウト
  // const drawBarCharts = (
  //   ctx: CanvasRenderingContext2D,
  //   chartWidth: number,
  //   chartHeight: number,
  //   padding: typeof CHART_CONFIG.padding,
  //   data: Diary[],
  //   sleepScores: number[],
  //   devTimeScores: number[]
  // ) => {
  //   const barWidth = (chartWidth / data.length) * CHART_CONFIG.barWidth;
  //   const barSpacing = (chartWidth / data.length) * CHART_CONFIG.barSpacing;

  //   data.forEach((_, index) => {
  //     const baseX = padding.left + (chartWidth * index) / (data.length - 1);

  //     // 睡眠スコアの棒グラフ（左）
  //     const sleepX = baseX - barWidth / 2 - barSpacing / 2;
  //     const sleepScore = sleepScores[index];
  //     const sleepBarHeight = (chartHeight * sleepScore) / 10;
  //     const sleepY = padding.top + chartHeight - sleepBarHeight;

  //     ctx.fillStyle = CHART_CONFIG.colors.sleep;
  //     ctx.fillRect(sleepX, sleepY, barWidth, sleepBarHeight);
  //     ctx.strokeStyle = CHART_CONFIG.colors.sleepBorder;
  //     ctx.lineWidth = 1;
  //     ctx.strokeRect(sleepX, sleepY, barWidth, sleepBarHeight);

  //     // 個人開発時間の棒グラフ（右）
  //     const devX = baseX + barWidth / 2 + barSpacing / 2;
  //     const devScore = devTimeScores[index];
  //     const devBarHeight = (chartHeight * devScore) / 10;
  //     const devY = padding.top + chartHeight - devBarHeight;

  //     ctx.fillStyle = CHART_CONFIG.colors.devTime;
  //     ctx.fillRect(devX, devY, barWidth, devBarHeight);
  //     ctx.strokeStyle = CHART_CONFIG.colors.devTimeBorder;
  //     ctx.strokeRect(devX, devY, barWidth, devBarHeight);
  //   });
  // };

  const drawLineChart = (
    ctx: CanvasRenderingContext2D,
    chartWidth: number,
    chartHeight: number,
    padding: typeof CHART_CONFIG.padding,
    data: Diary[]
  ) => {
    if (data.length === 0) return;

    ctx.strokeStyle = CHART_CONFIG.colors.mental;
    ctx.lineWidth = CHART_CONFIG.lineWidth;

    if (data.length === 1) {
      // データが1件だけの場合、その点のみ中央に描画
      const x = padding.left + chartWidth / 2;
      const y = padding.top + (chartHeight * (10 - data[0].mental)) / 9;
      ctx.beginPath();
      ctx.arc(x, y, CHART_CONFIG.pointRadius, 0, 2 * Math.PI);
      ctx.fillStyle = CHART_CONFIG.colors.mental;
      ctx.fill();
      return;
    }

    // 2件以上の場合は折れ線グラフ
    ctx.beginPath();
    data.forEach((diary, index) => {
      const x = padding.left + (chartWidth * index) / (data.length - 1);
      const y = padding.top + (chartHeight * (10 - diary.mental)) / 9;
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();

    // データポイント
    ctx.fillStyle = CHART_CONFIG.colors.mental;
    data.forEach((diary, index) => {
      const x = padding.left + (chartWidth * index) / (data.length - 1);
      const y = padding.top + (chartHeight * (10 - diary.mental)) / 9;
      ctx.beginPath();
      ctx.arc(x, y, CHART_CONFIG.pointRadius, 0, 2 * Math.PI);
      ctx.fill();
    });
  };

  // 平均スコア計算
  const total = diaries.length;
  const avg = total === 0 ? 0 : diaries.reduce((sum, d) => sum + d.mental, 0) / total;
  const avgRounded = Math.round(avg * 10) / 10;
  let tofuType = { name: '', img: '', range: '' };
  if (avg >= 1 && avg < 4) tofuType = { name: '絹豆腐メンタル', img: '/tofu-kinu.png', range: '1~3' };
  else if (avg >= 4 && avg < 7) tofuType = { name: '木綿豆腐メンタル', img: '/tofu-momen.png', range: '4~6' };
  else if (avg >= 7 && avg < 10) tofuType = { name: '厚揚げメンタル', img: '/tofu-atuage.png', range: '7~9' };
  else if (avg === 10) tofuType = { name: '鋼のメンタル', img: '/tofu-hagane.png', range: '10' };

  return (
    <div style={{ width: "100%", height: 200 }}>
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: "100%" }}
      />
      {/* 平均スコアと豆腐アイコン表示 */}
      {total > 0 && (
        <div className="flex flex-col items-center mt-6">
          <div className="text-sm text-gray-600 mt-1">あなたの期間平均スコア: <span className="font-bold text-teal-700">{avgRounded}</span>（{tofuType.range}）</div>
          <div className="flex items-center gap-2">
            <img src={tofuType.img} alt={tofuType.name} width={40} height={40} />
            <span className="text-lg font-bold text-gray-800">{tofuType.name}</span>
          </div>
        </div>
      )}
    </div>
  );
}; 