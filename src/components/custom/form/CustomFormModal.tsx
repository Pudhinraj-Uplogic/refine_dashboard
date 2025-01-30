import { useGo } from "@refinedev/core";
import { Grid, Modal } from "antd";
import FormComponent from "./FormComponent";
import type { FormProps } from "./types.form";
const CustomFormModal = (props: FormProps) => {
  const go = useGo();

  const { resource , title } = props
  const handleModalClose = () => {
    console.log("handleModalClose");
    go({
      to: `/${resource}`,
    });
  };

  const { useBreakpoint} = Grid;
  const screens = useBreakpoint();

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
      style={{backgroundColor:"transparent"}}
      styles={{
        header: {
          padding: "20px 24px",
          margin: 0,
        },
        footer: {
          margin: 0,
        },
        content: {
          padding: 0,
        //   backgroundColor:"red",
          margin: "auto",
        },
        wrapper: {
        //   backgroundColor:"red"  
        },
      }}
      footer={null}
      >
      <FormComponent {...props} />
    </Modal>
  );
};

export default CustomFormModal;
