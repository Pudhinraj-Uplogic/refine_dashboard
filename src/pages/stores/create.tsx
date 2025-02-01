import { useTranslate } from "@refinedev/core";
import { BellOutlined, CalendarOutlined, ClusterOutlined, LeftOutlined, LockOutlined, MailOutlined, PhoneOutlined, PlusCircleFilled, RightCircleOutlined, UserOutlined } from "@ant-design/icons";
import { useEffect, useMemo, useState } from "react";
import { useSelect } from "@refinedev/antd";
import CustomForm from "../../components/custom/form/CustomForm";
import { useFormProvider } from "../../context/FormProvider";
import { FaLocationDot } from "react-icons/fa6";
export const StoreCreate = () => {
  const t = useTranslate();

  const { selectProps: categorySelectProps } = useSelect<any>({
    resource: "categories",
    optionLabel: (item) => item.title,
    optionValue: (item) => item.id,
  });

  console.log("categorySelectProps", categorySelectProps.options);

  const { selectProps: productSelectProps } = useSelect<any>({
    resource: "products",
    optionLabel: (item) => `${item.name} - ${item.price}`,
    optionValue: (item) => item.id,
  });

  console.log("productSelectProps", productSelectProps.options);

  const { getSelectOption, setSelectOption, getEmpty } = useFormProvider();

  console.log("getSelectOption", getSelectOption);

  const [chdriver, setChDriver] = useState<any>([]);
  const array = [
    {
      id: 1,
      arry: [
        { label: "Zone d1", value: 1 },
        { label: "Zone d2", value: 2 },
        { label: "Zone d3", value: 3 },
      ],
    },
    {
      id: 2,
      arry: [
        { label: "Zone d4", value: 1 },
        { label: "Zone d5", value: 2 },
        { label: "Zone d6", value: 3 },
      ],
    },
    {
      id: 3,
      arry: [
        { label: "Zone d7", value: 1 },
        { label: "Zone d8", value: 2 },
        // {label:"d9",value:3}
      ],
    },
  ];

  useEffect(() => {
    setSelectOption(2);
  }, []);

  useEffect(() => {
    const newArray = array.filter((item) => {
      if (item.id === getSelectOption) {
        return item;
      }
    });
    // console.log("newArray", newArray[0].arry);
    setChDriver(newArray[0].arry);
  }, [getSelectOption]);

  const handleArray = useMemo(() => {
    const newArray = array.filter((item) => {
      if (item.id === getSelectOption) {
        return item;
      }
    });
    // console.log("newArray", newArray[0].arry);
    return newArray[0].arry;
  }, [getSelectOption]);

  const formItem = [
    {
      name: "image",
      label: "image",
      icon: <RightCircleOutlined />,
      rules: [],
      type: "image",
      // placeholder:"eg. Message",
      initialValue: "",
      required: false,
      row: false,
    },
    {
      id: 1,
      name: "title",
      label: "Name",
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
      // options: [],
      row: true,
    },
    {
      id: 2,
      name: "email",
      label: "Email",
      icon: <MailOutlined />,
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
        },
      ],
      type: "text",
      placeholder: "eg. store@example.com",
      initialValue: "",
      required: true,
      row: true,
    },
    {
      id: 3,
      name: "gsm",
      label: "Mobile Number",
      icon: <PhoneOutlined />,
      rules: [
        {
          required: true,
          message: "Please enter the Field",
        },
      ],
      type: "numberOnly",
      placeholder: "eg. 555-555-5555",
      initialValue: "",
      required: true,
      row: true,
    },
    {
      name: "password",
      label: "Password",
      icon: <LockOutlined />,
      rules: [
        {
          required: true,
          message: "Please enter the Field",
        },
      ],
      type: "password",
      placeholder: "eg. Password",
      initialValue: "",
      required: true,
      row:true,
      // options:chdriver
    },
    {
      id: 4,
      name: "isAvailable",
      label: "Available status", 
      icon: <BellOutlined />,
      rules: [
        {
          required: true,
          message: "Please enter the Field",
        },
      ],
      type: "segment",
      placeholder: "Please enter the Field",
      initialValue: 2,
      required: true,
      options: [
        {
          label: "Available",
          value: 1,
        },
        {
          label: "unAvailable",
          value: 2,
        }
      ],
      row: true,
    },
    {
      name: "isActive",
      label: "Status",
      icon: <BellOutlined />,
      rules: [],
      type: "switch",
      // placeholder:"eg. Message",
      initialValue: "",
      required: false,
      row: true,
    },
      
    {
      name: "checkbox",
      label: "Branch",
      icon: <UserOutlined />,
      rules: [],
      type: "checkBox",
      initialValue: [1],
      required: false,
      // row: true,
      options: [
        { label: "1", value: 1 },
        { label: "1 to 10", value: 2 },
        { label: "others", value: 3 },
      ],
    },
    {
      name: "Radio",
      label: "Location Type",
      icon: <UserOutlined />,
      rules: [],
      type: "radio",
      initialValue: [1],
      required: false,
      row: false,
      options: [
        { label: "Urban", value: 1 },
        { label: "Rural", value: 2 },
        // { label: "Transgender", value: 3 },  
      ],
    },
    {
      name: "products1",
      label: "Products",
      icon: <ClusterOutlined />,
      rules: [
        {
          required: true,
          message: "Please enter the Field",
        },
      ],
      type: "mulitpleSelect",
      placeholder: "eg. Select Products",
      initialValue: "",
      required: true,
      // row:true,
      options: productSelectProps.options,
    },
    {
      name: "categories",
      label: "Category",
      icon: <ClusterOutlined />,
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
      // row:true,
      options: categorySelectProps?.options,
    },

    {
      name: "places",
      label: "places",
      icon: <ClusterOutlined />,
      rules: [
        {
          required: true,
          message: "Please enter the Field",
        },
      ],
      type: "CustomSelect",
      placeholder: "eg. select places",
      initialValue: "",
      required: true,
      row:true,
      options: [
        { label: "madurai", value: 1 },
        { label: "chennai", value: 2 },
        { label: "kovai", value: 3 },
      ],
    },

    {
      name: "chdrivers",
      label: "Sub Zone",
      icon: <ClusterOutlined />,
      rules: [
        {
          required: true,
          message: "Please enter the Field",
        },
      ],
      type: "subSelect",
      placeholder: "eg. select sub Zones",
      initialValue: "",
      required: true,
      row:true,
      options: chdriver,
    },
    
    // {
    //   name: "number",
    //   label: "Number",
    //   icon: <UserOutlined />,
    //   // rules: [
    //   //   {
    //   //     required: true,
    //   //     message: "Please enter the Field",
    //   //   },
    //   // ],
    //   type: "numberOnly",
    //   placeholder: "eg. number",
    //   initialValue: "",
    //   // required: true,
    //   row: true,
    //   // options:chdriver
    // },


    {
      name: "createdeAt",
      label: "Created At",
      icon: <CalendarOutlined />,
      rules: [
        {
          required: true,
          message: "Please enter the Field",
        },
      ],
      type: "date",
      placeholder: "eg. select Date",
      initialValue: new Date(),
      required: false,
      row: true,
      format: "YYYY-MM-DD",
    },
    {
      name: "pickupDate",
      label: "Pickup At",
      icon: <CalendarOutlined />,
      rules: [
        {
          required: true,
          message: "Please enter the Field",
        },
      ],
      type: "rangeDate",
      placeholder: ["eg. start Date", "eg. End Date"],
      initialValue: new Date(),
      required: false,
      row: true,
      format: "YYYY-MM-DD",
    },
    {
      name: "time",
      label: "Time",
      icon: <CalendarOutlined />,
      rules: [
        {
          required: true,
          message: "Please enter the Field",
        },
      ],
      type: "time",
      placeholder: "eg. select Time",
      initialValue: new Date(),
      required: false,
      row: true,
      format: "HH:mm a",
    },
    {
      name: "timeRange",
      label: "TimeRange",
      icon: <CalendarOutlined />,
      rules: [
        {
          required: true,
          message: "Please enter the Field",
        },
      ],
      type: "timeRange",
      placeholder: ["eg. start Time", "eg. End Time"],
      initialValue: new Date(),
      required: false,
      row: true,
      format: "HH:mm a",
    },
    {
      name: "Hidden",
      type: "hidden",
      initialValue: 1,
    },
    {
      id: 5,
      name: ["address", "text"],
      label: "Address",
      icon: <UserOutlined />,
      rules: [
        {
          required: true,
          message: "Please enter the Field",
        },
      ],
      type: "textArea",
      placeholder: "eg. no-1, street-1, city-1",
      initialValue: "",
      required: true,
      row: false,
    },

    // {
    //   name: "message",
    //   label: "Message",
    //   icon: <UserOutlined />,
    //   rules: [],
    //   type: "textArea",
    //   placeholder: "eg. Message",
    //   initialValue: "",
    //   required: false,
    //   row: false,
    // },
    {
      name: "addMultiple",
      label: "Add Nomine",
      icon: <PlusCircleFilled />,
      rules: [],
      type: "addMultiple",
      // placeholder:"eg. Message",
      initialValue: "",
      required: false,
      row: false,
      options: [
        {
          name: "name",
          label: "Name",
          icon: <UserOutlined />,
          rules: [],
          type: "text",
          // placeholder:"eg. Message",
          initialValue: "",
          required: false,
          row: false,
          options: [],
        },
        {
          name: "phoneNumber",
          label: "mobile",
          icon: <PhoneOutlined />,
          rules: [],
          type: "numberOnly",
          // placeholder:"eg. Message",
          initialValue: "",
          required: false,
          row: false,
          options: [],
        },
      ],
    },
    {
      name:"googleAddressBar",
      label:"Address",
      icon:<FaLocationDot />,
      type:"googleAddressBar",
      rules:[],
      initialValue:"",
      required:false,
      row:false,
      options:[],
    }
  ];

  const datas = {
    formItem: formItem,
    resource: "stores",
    action: "create",
    disableForm: false,
    disableEdit: false,
    disableDelete: false,
    title: "Create Store",
    isModal: true,
  };

  return <CustomForm {...datas} />;
};
