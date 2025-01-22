import { Suspense } from "react";
import { useTranslate } from "@refinedev/core";
import { Area, type AreaConfig } from "@ant-design/plots";
import dayjs from "dayjs";

import { useConfigProvider } from "../../../context";

type Props = {
  data: AreaConfig["data"];
  height: number;
  colorCode?: string
};

export const DailyRevenue = ({ data, height ,colorCode='#158078' }: Props) => {
  const t = useTranslate();
  const { mode } = useConfigProvider();

  const config: AreaConfig = {
    isStack: false,
    data: data,
    xField: "timeText",
    yField: "value",
    seriesField: "state",
    animation: true,
    startOnZero: false,
    smooth: true,
    legend: false,
    xAxis: {
      range: [0, 1],
      label: {
        formatter: (v) => {
          if (data.length > 7) {
            return dayjs(v).format("MM/DD");
          }

          return dayjs(v).format("ddd");
        },
      },
    },
    yAxis: {
      label: {
        formatter: (v) => {
          return `$${Number(v) / 1000}k`;
        },
      },
    },
    tooltip: {
      formatter: (data) => {
        return {
          name: t("dashboard.revenue.title"),
          value: new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(data.value),
        };
      },
    },
    theme: mode,
    areaStyle: () => {
      return  { fill: `l(270) 0:#fff 1:${colorCode} ` };
    },
    color: () => {
      return `${colorCode}`;
    },
  };

  return (
    <Suspense>
      <Area {...config} height={height} />
    </Suspense>
  );
};
