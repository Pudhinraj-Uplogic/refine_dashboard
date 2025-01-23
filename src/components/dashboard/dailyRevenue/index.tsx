import { Suspense } from "react";
import { useTranslate } from "@refinedev/core";
import { Area, Line, type AreaConfig } from "@ant-design/plots";
import dayjs from "dayjs";

import { useConfigProvider } from "../../../context";
import { trace } from "console";

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
            return dayjs(v).format("MMM/DD");
          }

          return dayjs(v).format("ddd");
        },
      },
    },
    yAxis: {
      label: {
        formatter: (v) => {
          return `${Number(v) / 1000} k`;
        },
      },
      grid:{
        alternateColor:"white",
        line :{
          style:{
            color:"red",
            fill:"yellow",
            lineDash:[4,4],
          }
        }
      }
    },
    // tooltip: false,
    
    tooltip: {
      showMarkers: true,
      follow: true,
      // marker: {
      //   style: {
      //     fill: "red",
      //   },
      // },
      // showTitle:true,
      // position: "left",
      // title:"hi",
      // container: <>hi</>,
      // formatter: (data) => {
      //   return {
      //     name: t("dashboard.revenue.title"),
      //     value: new Intl.NumberFormat("en-US", {
      //       style: "currency",
      //       currency: "USD",
      //     }).format(data.value),
      //   };
      // },
    },
  //   tooltip: {
  //     showTitle: true, // Display the title (default is true)
  //     showMarkers: true, // Show markers for tooltip items
  //     shared: true, // Share the tooltip for multiple items (e.g., stacked data)
  //     domStyles: { // Custom CSS styles for the tooltip
  //         'g2-tooltip': {
  //             backgroundColor: 'cyan',
  //             // boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
  //         },
  //         'g2-tooltip-title': {
  //             fontWeight: 'bold',
  //             color: '#333',
  //         },
  //     },
  //     position:"top"
  // },

//   tooltip: {
//     showTitle: true,
//     showMarkers: true,
//     shared: true,
//     position: 'top',
//     formatter: (datum) => ({
//         name: 'Sales',
//         value: `$${datum.value.toLocaleString()}`,
//     }),
//     customContent: (title, items) => `
//         <div style="padding: 10px; background: #fff; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.15);">
//             <h4 style="margin: 0; color: #333;">${title}</h4>
//             ${items
//                 .map(
//                     item => `
//                     <div style="margin-top: 5px; display: flex; align-items: center;">
//                         <span style="background: ${item.color}; width: 10px; height: 10px; border-radius: 50%; margin-right: 5px;"></span>
//                         <span>${item.name}: ${item.value}</span>
//                     </div>`
//                 )
//                 .join('')}
//         </div>`,
// },
  
  

  // annotations: [
  //     {
  //         type: 'line',
  //         start: ['Mar 14', 'min'],
  //         end: ['Mar 14', 'max'],
  //         style: {
  //             stroke: '#FF7A45',
  //             lineDash: [4, 4],
  //         },
  //     },
  //     {
  //         type: 'line',
  //         start: ['min', 3560],
  //         end: ['max', 3560],
  //         style: {
  //             stroke: '#FF7A45',
  //             lineDash: [4, 4],
  //         },
  //     },
  // ],
    theme: mode,
    areaStyle: () => {
      return  { 
        fill: `l(270) 0:#fff 1:${colorCode} `,
        // lineDash: [1, 4],
        // lineWidth: 2,
        // lineJoin: "round",
        // points:2,
        // fillOpacity: 1,
        // strokeOpacity:1,
        // stroke: "red",
        // opacity:1,
        // lineWidth:24,
        // lineHeight:50
        
    };
    },
    color: () => {
      return `${colorCode}`;
    },
  };




  return (
    <Suspense>
      <Area {...config} height={height} />
            {/* <Line {...config} height={height}/> */}

    </Suspense>
  );
};
