import { extend } from "lodash";

export type FormItems = {
    icon?: React.ReactNode;
    label?: string;
    name: string;
    rules ?: [] | any;
    type: string;
    placeholder?: string | any;
    initialValue: string | boolean | number | any;
    required?: boolean;
    options ?: [] | any;
    row?:boolean;
    format?:string;
    disabled?:boolean;
    isTiny?:boolean;
    // formLoading ?: any;
};

export type FooterButtonProps = { 
    handleSubmit ?: ()=>void;
    formLoading ?: boolean
}

export interface FormProps extends FooterButtonProps {
    formItem: any[];
    resource: string;
    action: any;
    disableForm?: boolean;
    disableEdit?: boolean;
    disableDelete?: boolean;
    redirect?: string;
    grid?: any[];
    title?: string;
    isModal?: boolean;
  };