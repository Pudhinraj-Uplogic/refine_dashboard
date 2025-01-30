import { useTranslate } from "@refinedev/core";
import { ListButton, useSelect } from "@refinedev/antd";
import { Flex, Divider } from "antd";
import { LeftOutlined, UserOutlined } from "@ant-design/icons";
import { StoreForm } from "../../components";
import _debounce from "lodash/debounce";
import CustomForm from "../../components/custom/form/CustomForm";
import { useEffect, useState } from "react";
import { useFormProvider } from "../../context/FormProvider";

export const StoreEdit = () => {
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

  // const formItem = [
  //   {
  //     name: "title",
  //     label: "Title",
  //     icon: <UserOutlined />,
  //     rules: [
  //       {
  //         required: true,
  //         message: "Please enter the Field",
  //       },
  //     ],
  //     type: "text",
  //     placeholder: "eg. Store 1",
  //     initialValue: "",
  //     required: true,
  //     options: [],
  //   },
  //   {
  //     name: "email",
  //     label: "Email",
  //     icon: <UserOutlined />,
  //     rules: [
  //       {
  //         required: true,
  //         message: "Please enter the Field",
  //       },
  //     ],
  //     type: "text",
  //     placeholder: "eg. store@example.com",
  //     initialValue: "",
  //     required: true,
  //   },
  //   {
  //     name: "gsm",
  //     label: "Phone Number",
  //     icon: <UserOutlined />,
  //     rules: [
  //       {
  //         required: true,
  //         message: "Please enter the Field",
  //       },
  //     ],
  //     type: "text",
  //     placeholder: "eg. 555-555-5555",
  //     initialValue: "",
  //     required: true,
  //   },
  //   {
  //     name: "isActive",
  //     label: "Status",
  //     icon: <UserOutlined />,
  //     rules: [
  //       {
  //         required: true,
  //         message: "Please enter the Field",
  //       },
  //     ],
  //     type: "segment",
  //     placeholder: "Please enter the Field",
  //     initialValue: true,
  //     required: true,
  //     options: [
  //       {
  //         label: "Active",
  //         value: true,
  //       },
  //       {
  //         label: "Inactive",
  //         value: false,
  //       },
  //     ],
  //   },
  //   {
  //     name: ['address','text'],
  //     label: "Address",
  //     icon: <UserOutlined />,
  //     rules: [
  //       {
  //         required: true,
  //         message: "Please enter the Field",
  //       },
  //     ],
  //     type: "text",
  //     placeholder: "eg. no-1, street-1, city-1",
  //     initialValue: "",
  //     required: true,
  //   },
  // ];


  const { getSelectOption,  setSelectOption }= useFormProvider();

    console.log("getSelectOption", getSelectOption);

const [chdriver,setChDriver] = useState<any>([])
  const array = [
    {
      id:1,
      arry:[
        {label:"d1",value:1},
        {label:"d2",value:2},
        {label:"d3",value:3}
      ]
    },
    {
      id:2,
      arry:[
        {label:"d4",value:1},
        {label:"d5",value:2},
        {label:"d6",value:3}
      ]
    },
    {
      id:3,
      arry:[
        {label:"d7",value:1},
        {label:"d8",value:2},
        // {label:"d9",value:3}
      ]
    }
  ]

  useEffect(()=>{
    const newArray = array.filter((item)=>{
      if (item.id === getSelectOption) {
        return item
      } 
    })
    console.log("newArray",newArray[0].arry);
    setChDriver(newArray[0].arry)
  },[getSelectOption])


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
    {
      name: 'drivers',
      label: "drivers",
      icon: <UserOutlined />,
      rules: [
        {
          required: true,
          message: "Please enter the Field",
        },
      ],
      type: "CustomSelect",
      placeholder: "eg. select Drivers",
      initialValue: "",
      required: true,
      // row:true,
      options:[
        {label:"Driver 1",value:1},
        {label:"Driver 2",value:2},
        {label:"Driver 3",value:3},
      ]
    },
    
    {
      name: 'chdrivers',
      label: "Ch Drivers",
      icon: <UserOutlined />,
      rules: [
        {
          required: true,
          message: "Please enter the Field",
        },
      ],
      type: "subSelect",
      placeholder: "eg. select Drivers",
      initialValue: "",
      required: true,
      // row:true,
      options:chdriver
    },
    {
      name: 'password',
      label: "Password",
      icon: <UserOutlined />,
      rules: [
        {
          required: true,
          message: "Please enter the Field",
        },
      ],
      type: "password",
      placeholder: "Enter the Password",
      initialValue: "",
      required: true,
      // row:true,
      // options:chdriver
    },
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
      required: true,
      row:true,
      // options:categorySelectProps?.options
    },
  ];
  const datas = {
    formItem: formItem,
    resource: "stores",
    action: "edit",
    disableForm:false,
    disableEdit:false,
    disableDelete:false,
    title:"Stores",
    isModal:false,
  }
  
  return (
      <CustomForm {...datas} />
  );
};
