import {   useTranslate } from "@refinedev/core";
import { LeftOutlined, UserOutlined } from "@ant-design/icons";
import CustomFormModal from "../../components/custom/form/CustomFormModal";
import { useState } from "react";
import { useSelect } from "@refinedev/antd";

export const StoreCreate = () => {
  const t = useTranslate();

  
    const { selectProps: categorySelectProps } = useSelect<any>({
      resource: "categories",
      optionLabel:(item)=>item.title,
      optionValue:(item)=>item.id,
  
    });
  
    console.log("categorySelectProps", categorySelectProps.options);

    const { selectProps: productSelectProps } = useSelect<any>({
      resource: "products",
      optionLabel:(item)=>`${item.name} - ${item.price}`,
      optionValue:(item)=>item.id,
    });
  
    console.log("productSelectProps", productSelectProps.options);

  const formItem = [
    {
      id:1,
      name: "title",
      label: "Title",
      icon: <UserOutlined />,
      rules: [
        {
          required: true,
          message: "Please enter the Field",
        },
      ],
      type: "text",
      placeholder: "eg. Store 1",
      initialValue: "",
      required: true,
      options: [],
      row:true,
    },
    {
      id:2,
      name: "email",
      label: "Email",
      icon: <UserOutlined />,
      rules: [
        {
          required: true,
          message: "Please enter the valid Email",
        },
        // {
        //   type: "email",
        //   message: "Invalid email format",
        // },
        {
          pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          message: "Invalid email format",
        }
      ],
      type: "text",
      placeholder: "eg. store@example.com",
      initialValue: "",
      required: true,
      row:true,
    },
    {
      id:3,
      name: "gsm",
      label: "Phone Number",
      icon: <UserOutlined />,
      rules: [
        {
          required: true,
          message: "Please enter the Field",
        },
      ],
      type: "text",
      placeholder: "eg. 555-555-5555",
      initialValue: "",
      required: true,
      row:true
    },
    {
      id:4,
      name: "isActive",
      label: "Status",
      icon: <UserOutlined />,
      rules: [
        {
          required: true,
          message: "Please enter the Field",
        },
      ],
      type: "segment",
      placeholder: "Please enter the Field",
      initialValue: true,
      required: true,
      options: [
        {
          label: "Active",
          value: true,
        },
        {
          label: "Inactive",
          value: false,
        },
      ],
      row:true,
    },
    {
      id:5,
      name: ['address', 'text'],
      label: "Address",
      icon: <UserOutlined />,
      rules: [
        {
          required: true,
          message: "Please enter the Field",
        },
      ],
      type: "text",
      placeholder: "eg. no-1, street-1, city-1",
      initialValue: "",
      required: true,
      row:true,
    },
    {
      name: 'products1',
      label: "Products",
      icon: <UserOutlined />,
      rules: [
        {
          required: true,
          message: "Please enter the Field",
        },
      ],
      type: "mulitpleSelect",
      placeholder: "eg. no-1, street-1, city-1",
      initialValue: "",
      required: true,
      row:true,
      options:productSelectProps.options
    },
    {
      name: 'categories',
      label: "Category",
      icon: <UserOutlined />,
      rules: [
        {
          required: true,
          message: "Please enter the Field",
        },
      ],
      type: "select",
      placeholder: "eg. select Categories",
      initialValue: "",
      required: true,
      row:true,
      options:categorySelectProps?.options
    },
    ,
    {
      name: 'createdeAt',
      label: "Created At",
      icon: <UserOutlined />,
      rules: [
        {
          required: true,
          message: "Please enter the Field",
        },
      ],
      type: "date",
      // placeholder: "eg. select Categories",
      initialValue: new Date(),
      required: false,
      row:true,
      // options:categorySelectProps?.options
    },
  ];

  const datas = {
    formItem: formItem,
    resource: "stores",
    action: "create",
    disableForm:false,
    disableEdit:false,
    disableDelete:false,
    title:"Create Store",
    isModal:true ,
  }

  return (
     <CustomFormModal  {...datas}  />
  );
};
