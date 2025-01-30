import FormComponent from "./FormComponent";
import CustomFormModal from "./CustomFormModal";
import { Divider, Flex, Form } from "antd";
import { ListButton, useDrawerForm } from "@refinedev/antd";
import { LeftOutlined } from "@ant-design/icons";

const CustomForm = (props: any) => {
  const {
    disableForm,
    disableEdit,
    disableDelete,
    formItem,
    resource,
    action,
    redirect,
    isModal = false,
    title,
  } = props;

  const { drawerProps, formProps, close, saveButtonProps, formLoading } =
    useDrawerForm<any>({
      resource: resource,
      // id: props?.id, // when undefined, id will be read from the URL.
      action: action,
      // redirect: false,
      redirect: "list",
      onMutationSuccess: () => {
        // props.onMutationSuccess?.();
        console.log("success");
      },
    });

  const handleSubmit = () => {
    // console.log("clicked", formLoading);
    console.log("formProps", formProps.form?.getFieldsValue());
    formProps.form?.validateFields().then((values) => {
      console.log("values", values);
      formProps.onFinish?.(values);
    });

    // formProps validation function validate the form data with the rules
    // after that formProps onFinish func will be called
  };
  return (
    <>
      <Form {...formProps}>
        {!isModal && (
        <>
          <Flex>
            <ListButton icon={<LeftOutlined />}>{title}</ListButton>
          </Flex>
          <Divider />
        </>
      )}
        {isModal ? (
          <CustomFormModal
            {...props}
            handleSubmit={handleSubmit}
            formLoading={formLoading}
          />
        ) : (
          <FormComponent
            {...props}
            handleSubmit={handleSubmit}
            formLoading={formLoading}
          />
        )}
      </Form>
    </>
  );
};

export default CustomForm;
