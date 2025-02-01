import { Space } from 'antd';
import React from 'react'
import FormTemplate from '../FormTemplate';
import { MinusCircleOutlined } from '@ant-design/icons';

type Props={
    key?:any;
    name?:string | any;
    options:any;
    removeKey?:any;
    restFields?:any
}

const AddMultiple = (props :Props) => {

    const {key, name, options, removeKey, ...restFields} = props

  return (
    <Space
    style={{
      display: "flex",
      marginBottom: 8,
      // backgroundColor: "red",
    }}
    align="baseline"
    key={key}
    wrap>
    {options.map((option: any, index: any) => {
      const result = {
        ...option,
        name: [
          name,
          option.label.toLowerCase().replace(/\s+/g, ""),
        ],
        ...restFields,
        label: option.label,
        isTiny: true,
      };
      // console.log("option", option);
      return (
        <>
          <FormTemplate item={result} />
        </>
      );
    })}
    <MinusCircleOutlined onClick={() => removeKey(name)} />
  </Space>
  )
}

export default AddMultiple