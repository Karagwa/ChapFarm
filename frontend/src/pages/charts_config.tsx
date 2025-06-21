// src/charts-config.ts
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';

export const registerCharts = () => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Tooltip,
    Legend,
    Title
  );
  console.log('Chart.js components registered globally.');
};