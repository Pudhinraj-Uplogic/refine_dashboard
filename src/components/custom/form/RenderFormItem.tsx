import { DatePicker, Form, Input, Segmented, Select } from "antd";
import dayjs from "dayjs";
import React from "react";
import type { FormItems } from "./types.form";
import { useFormProvider } from "../../../context/FormProvider";
import { set } from "lodash";

const RenderFormItem = (props: any) => {



  const { getSelectOption,  setSelectOption, setEmpty ,getEmpty }= useFormProvider();

  console.log("getSelectOption", getSelectOption);

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
          console.log("options", options, initialValue);
        return (
          <Form.Item
            style={{ width: "100%", padding: "0", margin: "0" }}
            initialValue={initialValue ? initialValue : null}
            name={name}
            rules={rules}
            
            getValueProps={(value) => ({ value: value ? value : null })}
            >
            <Select options={options} placeholder={placeholder} disabled={disabled} />
          </Form.Item>
        );
        case "CustomSelect":
          // console.log("options", options);
        return (
          <Form.Item
            style={{ width: "100%", padding: "0", margin: "0" }}
            initialValue={initialValue ? initialValue : null}
            name={name}
            rules={rules}>
            <Select options={options} placeholder={placeholder}
             disabled={disabled} 
             onChange={(value) => {
              // console.log("value", value);

               setSelectOption(value);
               setEmpty(false)
             }}
             />
          </Form.Item>
        );
        case "subSelect":
          console.log("options  fdg", options, initialValue,getEmpty);



        return (
          <Form.Item
            style={{ width: "100%", padding: "0", margin: "0" }}
            initialValue={initialValue ? initialValue : null}
            name={name}
            rules={rules}
            getValueProps={(value) => ({ value: value ? !getEmpty ? initialValue : value : null })}
            >
            <Select options={options} placeholder={placeholder}
             disabled={disabled} 
             onChange={(value) => { 
              // console.log("value", value);
              //  setSelectOption(value);
               setEmpty(true)
             }}
             />
          </Form.Item>
        );
        case "mulitpleSelect":
        return (
          <Form.Item
            style={{ width: "100%", padding: "0", margin: "0" }}
            initialValue={initialValue ? initialValue : null}
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
      {renderFields(props)}
    </>
  );
};

export default RenderFormItem;
