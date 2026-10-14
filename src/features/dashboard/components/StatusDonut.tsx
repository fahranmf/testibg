"use client";

import type { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";

import type { StatusSummary } from "../dashboard.types";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function StatusDonut({
  news,
  activities,
}: {
  news: StatusSummary;
  activities: StatusSummary;
}) {
  const series = [
    news.draft + activities.draft,
    news.published + activities.published,
    news.archived + activities.archived,
  ];

  const total = series.reduce((sum, value) => sum + value, 0);

  const options: ApexOptions = {
    colors: ["#f79009", "#12b76a", "#a3a3a3"],
    labels: ["Draft", "Published", "Archived"],
    chart: {
      fontFamily: "Montserrat, sans-serif",
      type: "donut",
      toolbar: { show: false },
    },
    dataLabels: { enabled: false },
    legend: {
      show: true,
      position: "bottom",
      horizontalAlign: "center",
      fontFamily: "Montserrat, sans-serif",
      fontSize: "12px",
      markers: { size: 6 },
      itemMargin: { horizontal: 8, vertical: 4 },
    },
    stroke: { width: 0 },
    plotOptions: {
      pie: {
        donut: {
          size: "72%",
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: "12px",
              fontFamily: "Montserrat, sans-serif",
              color: "#737373",
              offsetY: 20,
            },
            value: {
              show: true,
              fontSize: "24px",
              fontWeight: 700,
              fontFamily: "Montserrat, sans-serif",
              color: undefined,
              offsetY: -14,
            },
            total: {
              show: true,
              showAlways: true,
              label: "Total Konten",
              fontSize: "12px",
              fontFamily: "Montserrat, sans-serif",
              color: "#737373",
              formatter: () => String(total),
            },
          },
        },
      },
    },
    tooltip: {
      y: { formatter: (val: number) => `${val} konten` },
    },
  };

  return (
    <section className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.07] dark:bg-white/[0.025]">
      <div className="border-b border-gray-100 px-5 py-4 dark:border-white/5">
        <h3 className="text-sm font-bold tracking-tight text-gray-900 dark:text-white">
          Status Konten
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Berita &amp; aktivitas
        </p>
      </div>

      <div className="px-2 py-3">
        <ReactApexChart
          options={options}
          series={series}
          type="donut"
          height={280}
        />
      </div>
    </section>
  );
}
