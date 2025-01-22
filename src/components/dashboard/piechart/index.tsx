import React from 'react';
import ReactDOM from 'react-dom';
import { Pie } from '@ant-design/plots';
import { PieConfig } from '@ant-design/plots/lib/interface';

export const PieChartFormat = () => {
  const config : any = {
    data: [
      { type: 'customer', value: 27 },
      { type: 'revenue', value: 25 },
      { type: 'Discount', value: 18 },
      { type: 'Sales', value: 15 },
    //   { type: '分类五', value: 10 },
    //   { type: '其他', value: 5 },
    ],
    angleField: 'value',
    colorField: 'type',
    innerRadius: 0.6,
    radius: 0.8,
    label: {
      text: 'value',
      style: {
        fontWeight: 'bold',
      },
    },
    legend: {
      color: {
        title: false,
        position: 'right',
        rowPadding: 5,
      },
    },
    annotations: [
      {
        type: 'text',
        style: {
          text: 'Routine',
          x: '50%',
          y: '50%',
          textAlign: 'center',
          fontSize: 40,
          fontStyle: 'bold',
        },
      },
    ],
    
  };
  return <Pie {...config} />;
};

