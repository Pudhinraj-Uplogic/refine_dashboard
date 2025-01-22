import { Suspense } from "react";
import { useTranslate } from "@refinedev/core";
import { Area, Line, TinyArea, type AreaConfig  } from "@ant-design/plots";
import dayjs from "dayjs";

import { useConfigProvider } from "../../../context";

type Props = {
  data: AreaConfig["data"];
  height: number;
  width: number;
  colorCode?: string;
};

export const GeneralCard = ({ data, height , width ,colorCode ='#158078' }: Props) => {
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
            return null;
          }

          return null;
        },
      },
    },
    yAxis: {
      label: {
        formatter: (v) => {
          return null
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
    // theme: mode,
    areaStyle: () => {
      return { fill: `l(270) 0:#fff 1:${colorCode}`,fillOpacity:0.2 };
      ;
    },
    // color: () => {
    //   // return mode === "dark" ? "#65A9F3" : "#1677FF";
    
    // },

    line: {
      style: {
        stroke: `${colorCode}`,
        strokeWidth: 2,
      },
    },
   
    // width:,
  };




  return (
    <Suspense>
      <Area {...config} height={height}  width={width}/>

      {/* <Line {...config} height={height}  width={width}/> */}

    </Suspense>
  );
};
