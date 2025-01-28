import { Form, Input, Segmented } from "antd";
import React from "react";

const RenderFormItem = ({Feild}: any) => {

  const renderFields = (formItem: any) => {
  const { type, name, initialValue, rules, options, disabled, placeholder } =
      formItem;
    switch (type) {
      case "text":
        return (
          <Form.Item
            style={{ width: "100%", padding: "0", margin: "0" }}
            initialValue={initialValue}
            name={name}
            rules={rules}>
            <Input placeholder={placeholder} disabled={disabled} />
          </Form.Item>
        );
      case "segment":
        return (
          <Form.Item
            style={{ width: "100%", padding: "0", margin: "0" }}
            initialValue={initialValue}
            name={name}
            rules={rules}>
            <Segmented
              options={options}
              placeholder={placeholder}
              disabled={disabled}
            />
          </Form.Item>
        );
      default:
        return null;
    }
  }  
  return (
    <>
      {renderFields(Feild)}
    </>
  );
};

export default RenderFormItem;
