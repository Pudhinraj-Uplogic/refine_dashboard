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
  ShowButton,
  EditButton,
  DeleteButton,
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
  Dropdown,
  Tag,
  Flex,
} from "antd";

// import type { IUser, IUserFilterVariables } from "../../interfaces";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useLocation } from "react-router";
import { PaginationTotal, UserStatus } from "../..";
// import { TableColumn } from "./TableColumn";
import { TableActionButton } from "../../tableActionButton";
import { primaryColor } from "../../../utils/Color";
import { ColumnType } from "antd/es/table";

import {
  BarsOutlined,
  CheckCircleOutlined,
  PauseCircleOutlined,
} from "@ant-design/icons";
// import { FilterDropdown } from "@refinedev/antd";
// import { Input, InputNumber, Select, Tag, Typography, theme } from "antd";
import { BASE_URL } from "../../../utils/Constants";
import { TableColumn } from "./TableColumn";
import { CustomFilter } from "./Filter";

export const CustomTable = ({filterEnable, setFilterEnable, ...tableData}) => {
  const go = useGo();
  const { pathname } = useLocation();
  const { showUrl } = useNavigation();
  const t = useTranslate();
  const { token } = theme.useToken();

  interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    fullName: string;
    gender: string;
    createdAt: string;
    isActive: boolean;
  }

  const columns: ColumnType<IUser>[] = [
    ...TableColumn(tableData?.tableColumn),
    ...[
      {
        fixed: "right",
        title: "Action",
        render: (_: any, record: any) => (
          <Flex>
            <ShowButton
              size="small"
              recordItemId={record.id} 
              aria-hidden
              hideText={true}
              style={{
                width: "100%",
                height: "100%",
                border: "none",
                background: "transparent",
                justifyContent: "start",
                fontWeight: "bold",
                fontSize: "13px",
                marginLeft: "12px",
              }}
              icon={
                <EyeOutlined
                  style={{
                    color: primaryColor,
                    fontSize: 17,
                    fontWeight: 500,
                  }}
                />
              }
            />
            <EditButton
              size="small"
              recordItemId={record.id} 
              aria-hidden
              hideText={true}
              style={{
                width: "100%",
                height: "100%",
                border: "none",
                background: "transparent",
                justifyContent: "start",
                fontWeight: "bold",
                fontSize: "13px",
                marginLeft: "12px",
              }}
              
            />
            <DeleteButton
              size="small"
              recordItemId={record.id} 
              aria-hidden
              hideText={true}
              style={{
                width: "100%",
                height: "100%",
                border: "none",
                background: "transparent",
                justifyContent: "start",
                fontWeight: "bold",
                fontSize: "13px",
                marginLeft: "12px",
              }}
           
            />
          </Flex>
        ),
      },
    ],
  ];
  const formProps = {
    filterDatas: tableData.filterDatas,
    filterEnable,
    setFilterEnable,
    tableData,
  };

  return (
    <>
      {/* {filterEnable && <CustomFilter props={formProps} />} */}
      <Table
        {...tableData?.tableProps}
        rowKey="id"
        scroll={{ x: true }}
        //   style={{ marginTop: filterEnable ? "10px" : 0 }}
        pagination={{
          ...tableData?.tableProps?.pagination,
          showTotal: (total) => (
            <PaginationTotal
              total={`${total} ${tableData?.title}`}
              entityName=""
            />
          ),
        }}
        columns={columns}
      ></Table>
    </>
  );
};
