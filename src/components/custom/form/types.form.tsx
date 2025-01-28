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