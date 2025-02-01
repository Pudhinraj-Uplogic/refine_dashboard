import { BarsOutlined, CheckCircleOutlined, PauseCircleOutlined, SearchOutlined } from "@ant-design/icons";
import { FilterDropdown } from "@refinedev/antd";
import { Input, InputNumber, Select, Tag, Typography, theme } from "antd";
import { BASE_URL } from "../../../utils/Constants";

export const TableColumn = (tableColumn: any) => {

    const { token } = theme.useToken();
    
    return tableColumn.map((detail: any) => {
      const {
        name,
        heading,
        sortable,
        filter,
        filterDetails,
        type,
        labelOption,
        disableIcon,
      } = detail;

      const column: any = {
        key: name,
        dataIndex: name,
        title: heading,
        sorter: sortable,
      };

      if (type === "number") {
        column.render = (value: any) => (
          <Typography.Text style={{ whiteSpace: "nowrap" }}>
            {value}
          </Typography.Text>
        );
        if (filter) {
          column.filterIcon = (filtered: any) => (
            <SearchOutlined
              style={{ color: filtered ? token.colorPrimary : undefined }}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            />
          );
          column.filterDropdown = (props: any) => (
            <FilterDropdown
              {...props}
              operator={filterDetails.operator || "contain"}
            >
              <InputNumber
                style={{ width: "100%" }}
                placeholder={filterDetails.placeholder}
              />
            </FilterDropdown>
          );
        }
      } else if (type === "string") {
        if (filter) {
          column.filterDropdown = (props: any) => (
            <FilterDropdown
              {...props}
              operator={filterDetails.operator || "contain"}
            >
              <Input
                style={{ width: "100%" }}
                placeholder={filterDetails.placeholder}
              />
            </FilterDropdown>
          );
        }
      } else if (type === "image") {
        column.render = (value: any) => (
          <img
            src={value ? BASE_URL + value : "/images/product-default-img.png"}
            className="tabelImage"
            alt="Image"
            width={40}
          />
        );
      } else if (type === "mapping") {
        column.render = (value: any, record: any) => {

          console.log("values ",value,record);
          const { order_status_details } = record;

          if (!order_status_details || !Array.isArray(order_status_details)) {
            return "No Data"; // Handle missing data
          }

          // Filter out the pickup and delivery statuses
          const pickupStatus = order_status_details.find(
            (status) => status.status_code === "Pickup"
          );
          const deliveryStatus = order_status_details.find(
            (status) => status.status_code === "Deliver"
          );

          // Format the dates
          const pickupDate = pickupStatus
            ? `${pickupStatus.date}`
            : "No Pickup Date";
          const deliveryDate = deliveryStatus
            ? `${deliveryStatus.date}`
            : "No Delivery Date";

          // Return formatted pickup and delivery dates
          return (
            <div>
              <div>
                {pickupDate} - {deliveryDate}
              </div>
            </div>
          );
        };

        // Add filter for the mapping column if needed
        if (filter) {
          column.filterDropdown = (props: any) => (
            <FilterDropdown
              {...props}
              operator={filterDetails.operator || "contain"}
            >
              <Input
                style={{ width: "100%" }}
                placeholder={filterDetails.placeholder}
              />
            </FilterDropdown>
          );
        }
      } else if (type === "label") {
        column.render = (value: any) => {
          const label = labelOption.find(
            (option: any) => option.value === value
          );
          return (
            <Tag
              color={
                label?.theme == "success"
                  ? "green"
                  : label?.theme == "danger"
                  ? "red"
                  : label?.theme == "warning"
                  ? "yellow"
                  : ""
              }
              style={{
                color:
                  label?.theme == "success"
                    ? token.colorSuccess
                    : label?.theme == "danger"
                    ? token.colorError
                    : label?.theme == "warning"
                    ? token.colorWarning
                    : token.colorTextTertiary,
              }}
              icon={
                value && !disableIcon ? (
                  <CheckCircleOutlined />
                ) : disableIcon ? null : (
                  <PauseCircleOutlined />
                )
              }
            >
              <Typography.Text
                // style={{
                //   color: value
                //     ? isDark
                //       ? token.green7
                //       : "#3C8618"
                //     : isDark
                //     ? token.colorTextTertiary
                //     : token.colorTextTertiary,
                // }}
                style={{
                    color: token.colorTextTertiary,
                  }}
              >
                {label?.label}
              </Typography.Text>
            </Tag>
          );
        };

        if (filter) {
          column.filterDropdown = (props: any) => (
            <FilterDropdown
              {...props}
              operator={filterDetails.operator || "contain"}
            >
              <Select
                style={{ width: "200px" }}
                mode={filterDetails?.mode || null}
                placeholder={filterDetails.placeholder}
              >
                {labelOption.map((option: any) => (
                  <Select.Option
                    key={option.value}
                    value={option.value.toString()}
                  >
                    {option.label}
                  </Select.Option>
                ))}
              </Select>
            </FilterDropdown>
          );
        }
      } else if (type === "icon") {
        column.render = (value: any) => (
          <span style={{ padding: "5px" }}>
            {/* <i className={value}></i> */}
            {value ? <i className={value}></i> : <BarsOutlined />}
          </span>
        );
      } else if (type === "price") {
        column.render = (value: any) => (
          <Typography.Text style={{ whiteSpace: "nowrap" }}>
            $ {value}
          </Typography.Text>
        );
        if (filter) {
          column.filterIcon = (filtered: any) => (
            <SearchOutlined
              style={{ color: filtered ? token.colorPrimary : undefined }}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            />
          );
          column.filterDropdown = (props: any) => (
            <FilterDropdown
              {...props}
              operator={filterDetails.operator || "contain"}
            >
              <InputNumber
                style={{ width: "100%" }}
                placeholder={filterDetails.placeholder}
              />
            </FilterDropdown>
          );
        }
      } else if (type === "weight") {
        column.render = (value: any) => (
          <Typography.Text style={{ whiteSpace: "nowrap" }}>
            {value} lbs
          </Typography.Text>
        );
        if (filter) {
          column.filterIcon = (filtered: any) => (
            <SearchOutlined
              style={{ color: filtered ? token.colorPrimary : undefined }}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            />
          );
          column.filterDropdown = (props: any) => (
            <FilterDropdown
              {...props}
              operator={filterDetails.operator || "contain"}
            >
              <InputNumber
                style={{ width: "100%" }}
                placeholder={filterDetails.placeholder}
              />
            </FilterDropdown>
          );
        }
      }
      return column;
    });
};