import { DatePicker, Form, Input, Segmented, Select } from "antd";
import dayjs from "dayjs";
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
        case "select":

        console.log("initialValue s", initialValue);
        return (
          <Form.Item
            style={{ width: "100%", padding: "0", margin: "0" }}
            initialValue={initialValue}
            name={name}
            rules={rules}>
            <Select options={options} placeholder={placeholder} disabled={disabled} />
          </Form.Item>
        );
        case "mulitpleSelect":

        console.log("initialValue s", initialValue);
        return (
          <Form.Item
            style={{ width: "100%", padding: "0", margin: "0" }}
            initialValue={initialValue}
            name={name}
            rules={rules}>
            <Select mode="multiple" options={options} placeholder={placeholder} disabled={disabled} />
          </Form.Item>
        );
        case "date":
          return (
            <Form.Item
              style={{ width: "100%", padding: "0", margin: "0" }}
              initialValue={initialValue ? dayjs(initialValue) : null}
              name={name}
              getValueProps={(value) => ({ value: value ? dayjs(value) : null })}
              rules={rules}>
                <DatePicker placeholder={placeholder} disabled={disabled}  format="YYYY-MM-DD" />
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
