"use client";
import { useEffect, useState } from "react";
import { type UseFormProps, useGetToPath, useGo } from "@refinedev/core";
import { ListButton, SaveButton, useDrawerForm } from "@refinedev/antd";
import {
  Form,
  Input,
  Card,
  Divider,
  Segmented,
  Avatar,
  Upload,
  Button,
  Flex,
  Checkbox,
  DatePicker,
  Select,
  TimePicker,
  Slider,
  Switch,
  Modal,
} from "antd";
import { useSearchParams } from "react-router-dom";
import { API_URL, BASE_URL } from "../../utils/Constants";
import moment from "moment";
import { dataProvider } from "../../Provider/dataProvider";
import dayjs from "dayjs";
import { useConfigProvider } from "../../context";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { FormItemHorizontal } from "../..";
type Props = {
  formData: any[];
  resource: any;
  action: UseFormProps["action"];
};

export const CustomFilter = (formProps) => {
  const { mode } = useConfigProvider();
  const { filterDatas, filterEnable, setFilterEnable, tableData } =
    formProps.props;
  const [form] = Form.useForm();
  const go = useGo();
  const getToPath = useGetToPath();
  // console.log(tableData, "formPropsformProps");
  const [filterData, setFilterData] = useState(filterDatas);
  const [optionsVal, setOptions] = useState([]);
  useEffect(() => {
    let optionValues = [];
    filterDatas.forEach((field) => {
      optionValues.push(field.options ? field.options : "");
    });
    console.log(optionValues, "OPTIONS");
    setOptions(optionValues);
  }, [filterDatas]);
  const onChangeValue = (value: any, index: number) => {
    console.log(value, "value", index);
    const newFilters = [...filterData];
    newFilters[index] = {
      ...newFilters[index],
      value: value ? value : "",
    };
    console.log(newFilters, "newFilters");
    setFilterData(newFilters);
    // form.setFieldValue(newFilters);
  };

  const handleCancel = () => {
    tableData.filterCancel();
    const transformFilters = (details: any) => {
      console.log(details, "detailssssssssss");
      return details.map((filter: any) => ({
        field: filter.name,
        operator: filter.operator,
        value: filter.value,
      }));
    };
    const newFilters = transformFilters(tableData.filterDatass);
    console.log(filterData, "newFilters");
    tableData?.setFilters(newFilters);
    setFilterEnable(false);
  };
  const renderFormField = (field: any, index: any) => {
    const { name, placeholder, heading, icon, initialValue, options, type } =
      field;
    const currentFilter = filterData[index] || { value: "" };
    // console.log(field, "currentFilter");
    switch (type) {
      case "string":
        return (
          <FormItemHorizontal
            initialValue={currentFilter.value || ""}
            icon={icon}
            label={heading}
            name={name}
          >
            <Input
              placeholder={placeholder}
              onChange={(e) => {
                onChangeValue(e.target.value, index);
              }}
            />
          </FormItemHorizontal>
        );

      case "select":
        return (
          <FormItemHorizontal
            icon={icon}
            label={heading}
            name={name}
            initialValue={currentFilter.value || ""}
          >
            <Select
              placeholder={placeholder}
              id={name}
              options={optionsVal[index]?.map((opt: any) => ({
                label: opt?.label,
                value: opt?.value,
              }))}
              suffixIcon={<DownOutlined />}
              defaultValue={initialValue}
              onChange={(e) => {
                onChangeValue(e, index);
              }}
              allowClear={true}
            />
          </FormItemHorizontal>
        );
        case "positiveDecimals":
          return (
            <FormItemHorizontal
              initialValue={currentFilter.value || ""}
              icon={icon}
              label={heading}
              name={name}
            >
              <Input
                placeholder={placeholder}
                type="number"
                min={0}
                step="0.01" 
                onChange={(e) => {
                  const value = parseFloat(e.target.value);
                  if (!isNaN(value) && value >= 0) {
                   
                    onChangeValue(value, index); 
                  } else {
                    
                    onChangeValue("", index);
                  }
                }}
              />
            </FormItemHorizontal>
          );
          case "numberOnly":
  return (
    <FormItemHorizontal
      initialValue={currentFilter.value || ""}
      icon={icon}
      label={heading}
      name={name}
    >
      <Input
        placeholder={placeholder}
        type="number"
        min={0}
        step="1" 
        onChange={(e) => {
          const value = parseInt(e.target.value, 10); 
          if (!isNaN(value) && value >= 0) {
            
            onChangeValue(value, index);
          } else {
           
            onChangeValue("", index);
          }
        }}
      />
    </FormItemHorizontal>
  );

        

      case "hidden":
        return (
          <Form.Item name={name} hidden>
            <Input type="hidden" />
          </Form.Item>
        );
      default:
        return null;
    }
  };

  const onFinish = () => {
    const transformFilters = (details: any) => {
      tableData?.setfilterDatas(details);
      return details.map((filter: any) => ({
        field: filter.name,
        operator: filter.operator,
        value: filter.value,
      }));
    };
    const newFilters = transformFilters(filterData);
    console.log(newFilters, "newFilters");
    tableData?.setFilters(newFilters);
    setFilterEnable(false);
  };
  return (
    <Form {...formProps} layout="horizontal">
      <Card>
      <Modal
        title="Filter"
        centered
        open={filterEnable}
        onOk={onFinish}
        onCancel={handleCancel}
        width={800}
        okText={"Filter"}
        cancelText={"Clear"}
      >
        {/* <Card> */}
        {filterDatas.map((field, index) => (
          <div key={index}>
            {renderFormField(field, index)}
            <Divider style={{ margin: 0 }} />
          </div>
        ))}
        {/* <Flex
          align="center"
          //   justify="space-between"
          style={{ paddingTop: "16px" }}
        >
          <>
            <ListButton icon={false} onClick={handleCancel}>
              Clear
            </ListButton>
            <Button
              type="primary"
              htmlType="submit"
              onClick={onFinish}
              style={{ marginLeft: "15px" }}
            >
              Filter
            </Button>
          </>
        </Flex> */}
      </Modal>
      </Card>
    </Form>
  );
};
