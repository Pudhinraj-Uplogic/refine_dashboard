import { Checkbox, DatePicker, Form, Input, Segmented, Select, TimePicker } from "antd";
import dayjs from "dayjs";
import React from "react";
import type { FormItems } from "./types.form";
import { useFormProvider } from "../../../context/FormProvider";

const RenderFormItem = (props: FormItems) => {
  const { getSelectOption, setSelectOption, setEmpty, getEmpty } =
    useFormProvider();

  console.log("getSelectOption", getSelectOption);

  const renderFields = (formItem: FormItems) => {
    const {
      type,
      name,
      initialValue,
      rules,
      options,
      disabled,
      placeholder,
      format,
    } = formItem;
    switch (type) {
      case "text":
        return (
          <Form.Item
            style={{ width: "100%", padding: "0", margin: "0" }}
            initialValue={initialValue}
            name={name}
            rules={rules}>
            <Input
              placeholder={placeholder || "eg. John Doe"}
              disabled={disabled}
            />
          </Form.Item>
        );
      case "password":
        return (
          <Form.Item
            style={{ width: "100%", padding: "0", margin: "0" }}
            initialValue={initialValue}
            name={name}
            rules={rules}>
            <Input.Password
              placeholder={placeholder || "eg. Password"}
              disabled={disabled}
            />
          </Form.Item>
        );
      case "numberOnly":
        if (rules) {
          const rulesNumberOnly = rules?.map((rule: any) => {
            return {
              ...rule,
              pattern: /^[0-9]*$/,
              message: "Only numbers are allowed",
            };
          });

          console.log("rulesNumberOnly", rulesNumberOnly);
        }
        const rulesNumberOnly = [
          {
            pattern: /^[0-9]*$/,
            message: "Only numbers are allowed",
          },
        ];

        return (
          <Form.Item
            style={{ width: "100%", padding: "0", margin: "0" }}
            initialValue={initialValue}
            name={name}
            rules={rulesNumberOnly}>
            <Input
              placeholder={placeholder || "eg. 123"}
              disabled={disabled}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
                e.target.value = value;
              }}
              // type="number"
            />
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
              placeholder={placeholder || "Select Options"}
              disabled={disabled}
            />
          </Form.Item>
        );
      case "select":
        // console.log("options", options, initialValue);
        return (
          <Form.Item
            style={{ width: "100%", padding: "0", margin: "0" }}
            initialValue={initialValue ? initialValue : null}
            name={name}
            rules={rules}
            getValueProps={(value) => ({ value: value ? value : null })}>
            <Select
              options={options}
              placeholder={placeholder || "Select Options"}
              disabled={disabled}
            />
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
            <Select
              options={options}
              placeholder={placeholder || "Select Options"}
              disabled={disabled}
              onChange={(value) => {
                // console.log("value", value);

                setSelectOption(value);
                setEmpty(false);
              }}
            />
          </Form.Item>
        );
      case "subSelect":
        // console.log("options  fdg", options, initialValue,getEmpty);
        return (
          <Form.Item
            style={{ width: "100%", padding: "0", margin: "0" }}
            initialValue={initialValue ? initialValue : null}
            name={name}
            rules={rules}
            getValueProps={(value) => ({
              value: value ? (!getEmpty ? initialValue : value) : null,
            })}>
            <Select
              options={options}
              placeholder={placeholder || "Select Options"}
              disabled={disabled}
              onChange={(value) => {
                // console.log("value", value);
                //  setSelectOption(value);
                setEmpty(true);
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
            <Select
              mode="multiple"
              options={options}
              placeholder={placeholder || "Select Options"}
              disabled={disabled}
            />
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
            <DatePicker
              placeholder={placeholder || "Select date"}
              disabled={disabled}
              format={format || "YYYY-MM-DD"}
              style={{ width: "100%" }}
            />
          </Form.Item>
        );
      case "rangeDate":
        // console.log("options?.minDate",options, options[0]?.minDate,options[0]?.maxDate);
        //   const minDateRange: any = options?.minDate
        //   ? dayjs(options.minDate)
        //   : null;
        // const maxDateRange: any = options?.maxDate
        //   ? dayjs(options.maxDate)
        //   : null;
        // console.log("initialValue", initialValue);
        const initialRangeValue = initialValue
          ? [dayjs(initialValue[0]), dayjs(initialValue[1]).add(1, "day")]
          : [];
        return (
          <Form.Item
            style={{ width: "100%", padding: "0", margin: "0" }}
            initialValue={initialRangeValue ? initialRangeValue : null}
            name={name}
            // getValueProps={(value) => ({ value: value ? dayjs(value) : null })}
            rules={rules}>
            <DatePicker.RangePicker
              placeholder={placeholder || ["eg. start Date", "eg. End Date"]}
              disabled={disabled}
              format={format || "YYYY-MM-DD"}
              style={{ width: "100%" }}
            />
          </Form.Item>
        );
      case "time":
        return (
          <Form.Item
            style={{ width: "100%", padding: "0", margin: "0" }}
            initialValue={initialValue ? dayjs(initialValue) : null}
            name={name}
            getValueProps={(value) => ({ value: value ? dayjs(value) : null })}
            rules={rules}>
            <TimePicker
              placeholder={placeholder || "Select time"}
              disabled={disabled}
              format={format || "HH:mm a"}
              use12Hours={true}
              style={{ width: "100%" }}
            />
          </Form.Item>
        );
        case "timeRange":
          const initialRangeTime = initialValue
          ? [dayjs(initialValue[0]), dayjs(initialValue[1]).add(1, "day")]
          : [];
          return (
            <Form.Item
              style={{ width: "100%", padding: "0", margin: "0" }}
              initialValue={initialRangeTime ? initialRangeTime : null}
              name={name}
              getValueProps={(value) => ({ value: value ? dayjs(value) : null })}
              rules={rules}>
              <TimePicker.RangePicker
                placeholder={placeholder || ["eg. start time", "eg. end time"]}
                disabled={disabled}
                format={format || "HH:mm a"}
                use12Hours={true}
                style={{ width: "100%" }}
              />
            </Form.Item>
          );
      case "textArea":
        return (
          <Form.Item
            style={{ width: "100%", padding: "0", margin: "0" }}
            initialValue={initialValue ? initialValue : null}
            name={name}
            rules={rules}>
            <Input.TextArea
              placeholder={placeholder}
              disabled={disabled}
              rows={4} // Adjust the number of rows as needed
            />
          </Form.Item>
        );
      case "hidden":
        return (
          <Form.Item
            style={{ width: "100%", padding: "0", margin: "0" }}
            initialValue={initialValue ? initialValue : null}
            name={name}
            rules={rules}>
            <Input
              placeholder={placeholder}
              disabled={disabled}
              type="hidden"
            />
          </Form.Item>
        );
        case "switch":
          return (
            <Form.Item
              style={{ width: "100%", padding: "0", margin: "0" }}
              initialValue={initialValue ? initialValue : null}
              name={name}
              rules={rules}>
              <Input
                placeholder={placeholder}
                disabled={disabled}
                type="hidden"
              />
            </Form.Item>
          );
          case "checkBox":
            console.log("options", options);
            return (
              <Form.Item
                style={{ width: "100%", padding: "0", margin: "0" }}
                initialValue={initialValue ? initialValue : null}
                name={name}
                rules={rules}>
                <Checkbox.Group
                  options={options}
                  disabled={disabled}
                />
              </Form.Item>
            );
      default:
        return null;
    }
  };
  return <>{renderFields(props)}</>;
};

export default RenderFormItem;
