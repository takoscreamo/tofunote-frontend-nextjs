import { FC, useEffect, useRef, useCallback, useState } from "react";
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
  // ポイント選択用state
  const [selectedDiary, setSelectedDiary] = useState<Diary | null>(null);
  const [popupPos, setPopupPos] = useState<{ x: number; y: number } | null>(null);

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
    if (data.length > 0) {
      drawLineChart(ctx, chartWidth, chartHeight, padding, data);
    }
  }, []); // 依存配列は必要に応じて調整

  useEffect(() => {
    // グラフ描画処理。drawChartを依存配列に含めることでESLint警告を回避
    const canvas = canvasRef.current;
    if (!canvas) return; // diaries.length === 0 でも描画する
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * (window.devicePixelRatio || 1);
    canvas.height = rect.height * (window.devicePixelRatio || 1);
    canvas.style.width = rect.width + "px";
    canvas.style.height = rect.height + "px";
    ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
    const sortedData = [...diaries].sort((a, b) => a.date.localeCompare(b.date));
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
    // ラベルの間引き
    const labelInterval = data.length > 10 ? Math.ceil(data.length / 10) : 1;
    data.forEach((diary, index) => {
      const x = padding.left + (chartWidth * index) / (data.length - 1);
      const date = new Date(diary.date);
      const dateStr = `${date.getMonth() + 1}/${date.getDate()}`;
      if (index % labelInterval === 0 || index === data.length - 1) {
        ctx.fillText(dateStr, x, height - padding.bottom + 30);
      }
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

  // 点の座標リストを計算する関数
  const getPointPositions = (rect: DOMRect, data: Diary[]) => {
    const { padding } = CHART_CONFIG;
    const width = rect.width;
    const height = rect.height;
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;
    if (data.length === 0) return [];
    if (data.length === 1) {
      const x = padding.left + chartWidth / 2;
      const y = padding.top + (chartHeight * (10 - data[0].mental)) / 9;
      return [{ x, y }];
    }
    return data.map((diary, index) => {
      const x = padding.left + (chartWidth * index) / (data.length - 1);
      const y = padding.top + (chartHeight * (10 - diary.mental)) / 9;
      return { x, y };
    });
  };

  // canvasクリック時の処理
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || diaries.length === 0) return;
    const rect = canvas.getBoundingClientRect();
    // クリック座標（canvas内座標に変換）
    const clickX = (e.clientX - rect.left);
    const clickY = (e.clientY - rect.top);
    // 点の座標リスト取得
    const sortedData = [...diaries].sort((a, b) => a.date.localeCompare(b.date));
    const points = getPointPositions(rect, sortedData);
    // 近い点を探す
    const radius = CHART_CONFIG.pointRadius + 4; // 少し余裕を持たせる
    for (let i = 0; i < points.length; i++) {
      const { x, y } = points[i];
      if (Math.hypot(x - clickX, y - clickY) <= radius) {
        setSelectedDiary(sortedData[i]);
        setPopupPos({ x, y });
        return;
      }
    }
    // どの点も押されていなければ非選択
    setSelectedDiary(null);
    setPopupPos(null);
  };

  return (
    <div style={{ width: "100%", height: 200, position: "relative", overflow: "visible" }}>
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: "100%" }}
        onClick={handleCanvasClick}
      />
      {/* ポップアップ表示 */}
      {selectedDiary && popupPos && (
        (() => {
          // 右端・左端・上下はみ出し防止ロジック
          const POPUP_WIDTH = 220; // ポップアップの想定最大幅
          const POPUP_HEIGHT = 120; // ポップアップの想定最大高さ
          const MARGIN = 8; // 余白
          let left = popupPos.x;
          let top = popupPos.y - 60;
          let transform = "translate(-50%, -100%)";
          if (typeof window !== "undefined") {
            const containerRect = canvasRef.current?.getBoundingClientRect();
            const containerWidth = containerRect?.width || window.innerWidth;
            const containerHeight = containerRect?.height || window.innerHeight;
            // 横方向
            if (popupPos.x + POPUP_WIDTH / 2 + MARGIN > containerWidth) {
              left = containerWidth - MARGIN;
              transform = "translate(-100%, -100%)";
            } else if (popupPos.x - POPUP_WIDTH / 2 - MARGIN < 0) {
              left = MARGIN;
              transform = "translate(0, -100%)";
            }
            // 縦方向
            const popupTop = popupPos.y - 60 - POPUP_HEIGHT;
            const popupBottom = popupPos.y - 60;
            if (popupTop < 0) {
              // 上にはみ出す場合は点の下に表示
              top = popupPos.y + 16; // 点の下に少し余白
              if (transform === "translate(-50%, -100%)") transform = "translate(-50%, 0)";
              if (transform === "translate(-100%, -100%)") transform = "translate(-100%, 0)";
              if (transform === "translate(0, -100%)") transform = "translate(0, 0)";
            } else if (popupBottom + POPUP_HEIGHT > containerHeight) {
              // 下にはみ出す場合は点の上に表示（上寄せ）
              top = containerHeight - POPUP_HEIGHT - MARGIN;
              // transformはそのまま
            }
          }
          return (
            <div
              style={{
                position: "absolute",
                left,
                top,
                background: "white",
                border: "1px solid #ccc",
                borderRadius: 8,
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                padding: 12,
                zIndex: 10000,
                minWidth: 180,
                maxWidth: POPUP_WIDTH,
                pointerEvents: "auto",
                transform,
                wordBreak: "break-word"
              }}
            >
              <div className="text-xs text-gray-500 mb-1">{selectedDiary.date}</div>
              <div className="font-bold text-teal-700 mb-1">メンタルスコア: {selectedDiary.mental}</div>
              <div className="text-sm text-gray-700 whitespace-pre-wrap">{selectedDiary.diary || "(メモなし)"}</div>
              <button
                className="mt-2 text-xs text-blue-500 hover:underline"
                onClick={() => { setSelectedDiary(null); setPopupPos(null); }}
                style={{ display: "block", marginLeft: "auto" }}
              >閉じる</button>
            </div>
          );
        })()
      )}
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