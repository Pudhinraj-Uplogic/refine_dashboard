import { TinyArea, TinyAreaConfig } from "@ant-design/plots";

type Props = {
  data : number[]
  height: number;
  width: number;
  colorCode?: string
};

export const TinyFormatCard = ({data ,height, width ,colorCode='#158078'}: Props) => {


  const config: TinyAreaConfig = {
    data,
    width,
    height,
    smooth: true,
    style: {
      fill: `linear-gradient(10deg, 0, 0, 0.2, ${colorCode}, ${colorCode}`,
      fillOpacity: 0.2,
    },
    line: {
      style: {
        stroke: `${colorCode}`,
        strokeWidth: 2,
      },
    },
    color: colorCode,
  };

  return <TinyArea {...config} />;
};
