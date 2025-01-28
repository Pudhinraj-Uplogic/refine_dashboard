import { useTranslate } from "@refinedev/core";
import { ListButton } from "@refinedev/antd";
import { Flex, Divider, Grid } from "antd";
import { LeftOutlined, UserOutlined } from "@ant-design/icons";
import { StoreForm } from "../../components";
import FormItem from "../../components/custom/form/RenderFormItem";
import CustomForm from "../../components/custom/form/CustomForm";
import { redirect } from "react-router";

export const StoreCreate = () => {
  const t = useTranslate();


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
    },
    {
      id:2,
      name: "email",
      label: "Email",
      icon: <UserOutlined />,
      rules: [
        {
          required: true,
          message: "Please enter the Field",
        },
      ],
      type: "text",
      placeholder: "eg. store@example.com",
      initialValue: "",
      required: true,
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
    },
    {
      id:5,
      name: "address",
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
    },
  ];

  const grid=[[1,3],5,[2,4]]

  const datas = {
    formItem: formItem,
    resource: "stores",
    action: "create",
    disableForm:false,
    disableEdit:false,
    disableDelete:false,
    grid:grid
  }
  

  return (
    <>
      <Flex>
        <ListButton icon={<LeftOutlined />}>{t("stores.stores")}</ListButton>
      </Flex>
      <Divider />
      <CustomForm {...datas} />
      {/* <StoreForm action="create" /> */}
    </>
  );
};
