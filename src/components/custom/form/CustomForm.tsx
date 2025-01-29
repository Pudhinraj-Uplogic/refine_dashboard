import { LeftOutlined, UserOutlined } from "@ant-design/icons";
import { ListButton, SaveButton, useDrawerForm } from "@refinedev/antd";
import { Card, Col, Divider, Flex, Form, Row } from "antd";
import FormTemplate from "./FormTemplate";

import type { FormProps } from "./types.form"

const CustomForm = (props: FormProps) => {
  const {
    disableForm,
    disableEdit,
    disableDelete,
    formItem,
    resource,
    action,
    redirect,
    isModal,
    title
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

  console.log('forms',formProps)

  return (
    <>
    {
      !isModal && 
      (
        <>
        <Flex>
        <ListButton icon={<LeftOutlined />}>{title}</ListButton>
      </Flex>
      <Divider />
        </>
      )
    }
      

      <Form {...formProps}>
        <Card>
          <Row gutter={24}>
            {props.formItem.map((item: any, index: number) => {
              return (
                <Col
                  key={index}
                  sm={item && item.row ? 12 : 24}
                  // md={item && item.row ? 8 : 24}

                  style={{ width: "100%" }}>
                  <FormTemplate item={item} key={index} />
                </Col>
              );
            })}
          </Row>
        </Card>
        {!disableForm && (
          <Flex
            align="center"
            justify="space-between"
            style={{ padding: "16px" }}>
            <>
              <ListButton style={{ backgroundColor: "" }} icon={false}>
                Cancel
              </ListButton>
              <SaveButton
                style={{ backgroundColor: "" }}
                onClick={handleSubmit}
                disabled={formLoading}>
                Save
              </SaveButton>
            </>
          </Flex>
        )}
      </Form>
    </>
  );
};

export default CustomForm;
