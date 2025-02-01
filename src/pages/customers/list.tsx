import {
  useTranslate,
  type HttpError,
  getDefaultFilter,
  useExport,
  useGo,
  useNavigation,
} from "@refinedev/core";
import {
  List,
  useTable,
  DateField,
  FilterDropdown,
  getDefaultSortOrder,
  ExportButton,
} from "@refinedev/antd";
import {
  Table,
  Avatar,
  Typography,
  theme,
  InputNumber,
  Input,
  Select,
  Button,
} from "antd";
import {
  ClockCircleOutlined,
  CrownOutlined,
  IssuesCloseOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";

import type { IUser, IUserFilterVariables } from "../../interfaces";
import { useState, type PropsWithChildren } from "react";
import { useLocation } from "react-router";
import CustomGrid from "../../components/custom/table/CustomGrid";

export const CustomerList = (props: any) => {
  const go = useGo();
  const { pathname } = useLocation();
  const { showUrl } = useNavigation();
  const t = useTranslate();
  const { token } = theme.useToken();


  const tableColumn = [
    {
      name: "id",
      type: "number",
      heading: 'Id',
      export: true,
      sortable: true,
      filter: true,
      filterDetails: {
        type: "searchNumber",
        placeholder: "Search id",
        operator: "contain",
      },
    },
    {
      name: "firstName",
      type: "string",
      heading: 'First Name',
      export: true,
      sortable: true,
      filter: true,
      filterDetails: {
        type: "searchText",
        placeholder: "Search First Name",
        operator: "contain",
      },
    },
    {
      name: "lastName",
      type: "string",
      heading: 'Last Name',
      export: true,
      sortable: true,
      filter: true,
      filterDetails: {
        type: "searchText",
        placeholder: "Search Last Name",
        operator: "contain",
      },
    },
    {
      name: "gender",
      type: "label",
      heading: "Gender",
      export: true,
      sortable: false,
      filter: true,
      filterDetails: {
        type: "select",
        placeholder: "Search Gender",
        operator: "contain",
      },
      labelOption: [
        {
          label: "Male",
          value: 'Male',
          theme: "info",
        },
        {
          label: "Female",
          value: 'Female',
          theme: "warning",
        },
      ],
    },
    {
      name: "gsm",
      type: "string",
      heading: 'Phone Number',
      export: true,
      sortable: false,
      filter: true,
      filterDetails: {
        type: "searchText",
        placeholder: "Search Phone",
        operator: "contain",
      },
    },
    {
      name: "isActive",
      type: "label",
      heading: 'Status',
      export: true,
      sortable: false,
      filter: true,
      filterDetails: {
        type: "select",
        placeholder: "Search Status",
        operator: "contain",
        // mode: "multiple",
      },
      labelOption: [
        {
          label: "Active",
          value: true,
          theme: "success",
        },
        {
          label: "Inactive",
          value: false,
          theme: "danger",
        },
      ],
    },
  ];

  const { tableProps, filters, sorters, setFilters } = useTable<
    IUser,
    HttpError,
    IUserFilterVariables
  >({
    filters: {
      initial: [
        {
          field: "fullName",
          operator: "contains",
          value: "",
        },
      ],
    },
    sorters: {
      initial: [
        {
          field: "id",
          order: "desc",
        },
      ],
    },
    syncWithLocation: true,
  });

  const { isLoading, triggerExport } = useExport<IUser>({
    sorters,
    filters,
    pageSize: 50,
    maxItemCount: 50,
    mapData: (item) => {
      return {
        id: item.id,
        fullName: item.fullName,
        gsm: item.gsm,
        isActive: item.isActive,
        createdAt: item.createdAt,
      };
    },
  });

  const filterDatass = [
    {
      name: "id",
      type: "string",
      heading: 'Id',
      placeholder: "Search Id",
      icon: <CrownOutlined />,
      operator: "contains",
      value: "",
    },
    {
      name: "firstName",
      type: "string",
      heading: 'Last Name',
      placeholder: "Search Name",
      icon: <UserOutlined />,
      operator: "contains",
      value: "",
    },
    {
      name: "lastName",
      type: "string",
      heading:'Last Name',
      placeholder: "Search Last Name",
      icon: <MailOutlined />,
      operator: "contains",
      value: "",
    },
    {
      name: "gender",
      type: "select",
      heading: 'Gender',
      placeholder: "Search Gender",
      icon: <PhoneOutlined />,
      operator: "eq",
      value: "",
      initialValue: "",
      options: [
        {
          label: "Male",
          value: 'Male',
        },
        {
          label: "Female",
          value: 'Female',
        },
      ],
    },
    {
      name: "status",
      heading: "Status",
      type: "select",
      placeholder: "Status",
      rules: [],
      icon: <ClockCircleOutlined />,
      label: "Status",
      initialValue: "",
      value: "",
      operator: "eq",
      options: [
        {
          label: "Active",
          value: true,
        },
        {
          label: "Inactive",
          value: false,
        },
      ],
    },
  ];

  const searchFileds =  [
    // {
    //   field: "id",
    //   operator: "contains",
    //   value: "",
    // },
    {
      field: "firstName",
      operator: "contains",
      value: "",
    },
    // {
    //   field: "lastName",
    //   operator: "contains",
    //   value: "",
    // },
    // {
    //   field: "gender",
    //   operator: "contains",
    //   value: "",
      
    // },
    // {
    //   field: "status",
    //   operator: "contains",
    //   value: "",
    // },
  ];

  const [filterDatas, setfilterDatas] = useState(filterDatass);
  const filterCancel = () => {
    setfilterDatas(filterDatass);
  };

  const tableData = {
    tableProps: tableProps,
    filters: filters,
    sorters: sorters,
    tableColumn: tableColumn,
    resource: "customers",
    title: "Customers",
    message: "Customers",
    createButtonText: 'Add Customer',
    disableView: false,
    disableEdit: false,
    disableCreate: false,
    disableDelete: true,
    disableAction: false,
    disableExport: false,
    disableFilter: false,
    disableSearch: false,
    filtertext: 'Filter',
    filterDatas: filterDatas,
    setFilters: setFilters,
    setfilterDatas: setfilterDatas,
    filterCancel: () => filterCancel(),
    filterDatass: filterDatass,
    res: props.res,
    searchFileds: searchFileds
  };


  return (

    <CustomGrid {...tableData}/>
  );
};
