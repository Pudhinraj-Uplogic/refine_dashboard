import { useGo } from "@refinedev/core";
import { Grid, Modal } from "antd";
import FormComponent from "./FormComponent";
import type { FormProps } from "./types.form";
import { useDrawerForm } from "@refinedev/antd";
import { FooterButton } from "./FormButton";
const CustomFormModal = (
  props:FormProps
) => {
  const go = useGo();

  const { resource, title, action,handleSubmit,formLoading } = props;
  const handleModalClose = () => {
    console.log("handleModalClose");
    go({
      to: `/${resource}`,
    });
  };

  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  // const { drawerProps, formProps, close, saveButtonProps, formLoading } =
  //   useDrawerForm<any>({
  //     resource: resource,
  //     // id: props?.id, // when undefined, id will be read from the URL.
  //     action: action,
  //     // redirect: false,
  //     redirect: "list",
  //     onMutationSuccess: () => {
  //       // props.onMutationSuccess?.();
  //       console.log("success");
  //     },
  //   });

  // const handleSubmit = () => {
  //   // console.log("clicked", formLoading);
  //   console.log("formProps", formProps.form?.getFieldsValue());
  //   formProps.form?.validateFields().then((values) => {
  //     console.log("values", values);
  //     formProps.onFinish?.(values);
  //   });

  //   // formProps validation function validate the form data with the rules
  //   // after that formProps onFinish func will be called
  // };

  return (
    <Modal
      width={screens.xl ? "70%" : "80%"}
      // height={screens.xl ? "80%" : "90%"}
      open={true}
      centered={true}
      onCancel={handleModalClose}
      destroyOnClose
      maskClosable={false}
      title={title}
      style={{ backgroundColor: "transparent" }}
      styles={{
        header: {
          padding: "20px 24px",
          margin: 0,
          // backgroundColor:"rgba(21, 128, 120, 0.7)",
          // color:"red !important"
        },
        footer: {
          margin: 0,
          // backgroundColor:"rgba(21, 128, 120, 0.7)"
        },
        content: {
          padding: 0,
          // backgroundColor:"red",

          margin: "auto",
        },
        wrapper: {
          //   backgroundColor:"red"
        },
        body: {
          // backgroundColor:"rgba(21, 128, 120, 0.7)  !important",
          height: "50vh",
          overflow: "auto",
        },
      }}
      footer={
        <FooterButton handleSubmit={handleSubmit} formLoading={formLoading} />
      }>
      <FormComponent {...props} />
    </Modal>
  );
};

export default CustomFormModal;
