import { useTranslate } from "@refinedev/core";
import { ListButton } from "@refinedev/antd";
import { Flex, Divider } from "antd";
import { LeftOutlined, UserOutlined } from "@ant-design/icons";
import { StoreForm } from "../../components";
import _debounce from "lodash/debounce";
import CustomForm from "../../components/custom/form/CustomForm";

export const StoreEdit = () => {
  const t = useTranslate();


  const formItem = [
    {
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
      name: ['address','text'],
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

  const datas = {
    formItem: formItem,
    resource: "stores",
    action: "edit",
    disableForm:false,
    disableEdit:false,
    disableDelete:false,
  }
  


  return (
    <>
      <Flex>
        <ListButton icon={<LeftOutlined />}>{t("stores.stores")}</ListButton>
      </Flex>
      <Divider />
      {/* <StoreForm action="edit" /> */}
      <CustomForm {...datas} />
    </>
  );
};
