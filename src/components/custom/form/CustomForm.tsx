import FormComponent from "./FormComponent";
import CustomFormModal from "./CustomFormModal";

const CustomForm = (props: any) => {
  const { isModal } = props;
  return (
    <>
      {isModal ? <CustomFormModal {...props} /> : <FormComponent {...props} />}
    </>
  );
};

export default CustomForm;
