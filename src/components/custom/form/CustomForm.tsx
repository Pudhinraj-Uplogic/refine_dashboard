import { UserOutlined } from "@ant-design/icons";
import { ListButton, SaveButton, useDrawerForm } from "@refinedev/antd";
import {
  Card,
  Flex,
  Form,
} from "antd";
import FormTemplate from "./FormTemplate";

type Props = {
  formItem: any[],
  resource: string,
  action: any,
  disableForm?: boolean,
  disableEdit?: boolean,
  disableDelete?: boolean,
  redirect?: string,
}


const CustomForm = (props:Props) => {

  const { disableForm, disableEdit, disableDelete, formItem,resource, action,redirect } = props

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
    <Form {...formProps}>
      <Card>
        {
          props.formItem.map((item:any, index:number) => {
            return (
              <>
              <FormTemplate item={item} key={index} />
              {/* <FormTemplate item={item} key={index} /> */}
              </>
            )
          })
        }
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
                disabled={formLoading}
                >
                Save
              </SaveButton>
            </>
          </Flex>
        )}
    </Form>
  );
};

export default CustomForm;
