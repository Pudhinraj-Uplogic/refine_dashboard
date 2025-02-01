import { LeftOutlined } from "@ant-design/icons";
import { ListButton, useDrawerForm } from "@refinedev/antd";
import { Card, Col, Divider, Flex, Form, Row } from "antd";
import FormTemplate from "./FormTemplate";

import type { FormProps } from "./types.form";
import { FooterButton } from "./FormButton";

const FormComponent = (props:FormProps) => {
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
    handleSubmit,
    formLoading
  } = props;

  // console.log("handleSubmit", handleSubmit);

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

  // console.log("dias",!disableForm,isModal , !disableForm && !isModal, !disableForm || isModal);

  return (
    <>
      {/* {!isModal && (
        <>
          <Flex>
            <ListButton icon={<LeftOutlined />}>{title}</ListButton>
          </Flex>
          <Divider />
        </>
      )} */}
      {/* <Form {...formProps}> */}
        <Card>
          <Row gutter={24}>
            {props.formItem.map((item: any, index: number) => {
              return (
                <Col
                  key={index}
                  sm={item && item.row ? 12 : 24}
                  // md={item && item.row ? 8 : 24}

                  style={{ width: "100%" }}>
                  <FormTemplate item={item} key={index}  />
                </Col>
              );
            })}
          </Row>
        </Card>

        {!disableForm && !isModal && (
          <FooterButton handleSubmit={handleSubmit} formLoading={formLoading} />
        )}
      {/* </Form> */}
    </>
  );
};

export default FormComponent;
