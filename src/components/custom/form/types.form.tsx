export type FormItems = {
    icon: React.ReactNode;
    label: string;
    name: string;
    rules ?: [] | any;
    type: string;
    placeholder: string;
    initialValue: string;
    required: boolean;
    options ?: [] | any;
};

export interface FormProps {
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