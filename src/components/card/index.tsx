import { Card, Flex, Space, Typography } from "antd";
import type { PropsWithChildren } from "react";
import { useConfigProvider } from "../../context";

export const CardWithContent = (
  props: PropsWithChildren<{
    icon?: React.ReactNode;
    title: string;
    bodyStyles?: React.CSSProperties;
  }>
) => {
  const { mode } = useConfigProvider();

  return (
    <Card
      styles={{
        header: {
          backgroundColor: mode === "light" ? "#FAFAFA" : "#1F1F1F",
          padding: "16px",
        },
        body: {
          ...(props?.bodyStyles || {}),
        },
      }}
      title={
        <Space align="center" size={8}>
          {props.icon}
          <Typography.Text
            style={{
              fontWeight: 400,
            }}>
            {props.title}
          </Typography.Text>
        </Space>
      }>
      {props.children}
    </Card>
  );
};

export const CardWithPlot = (
  props: PropsWithChildren<{
    icon: React.ReactNode;
    title: string;
    rightSlot?: React.ReactNode;
    bodyStyles?: React.CSSProperties;
  }>
) => {
  return (
    <Card
      styles={{
        header: {
          padding: "16px 16px 10px 16px",
          minHeight: "max-content",
          borderBottom: 0,
        },
        body: {
          padding: "24px 16px 24px 24px",
          ...(props?.bodyStyles || {}),
        },
      }}
      title={
        <Flex align="center" justify="space-between">
          <Flex gap={8}>
            {props.icon}
            <Typography.Text
              style={{
                fontWeight: 400,
              }}>
              {props.title}
            </Typography.Text>
          </Flex>
          {props?.rightSlot}
        </Flex>
      }>
      {props.children}
    </Card>
  );
};

export const CommonCard = (
  props: PropsWithChildren<{
    icon?: React.ReactNode;
    title: string;
    bodyStyles?: React.CSSProperties;
  }>
) => {
  const { mode } = useConfigProvider();

  return (
    <Card
      styles={{
        header: {
          backgroundColor: mode === "light" ? "#FAFAFA" : "#1F1F1F",
          // padding: "16px",
          // border:"none",
          // borderRadius: "50px",
        },
        body: {
          borderRadius: "10px",
          // boxShadow: `2px 4px 4px ${
          //   mode === "light" ? "rgba(0, 0, 0, 0.25)" : "rgba(0, 0, 0, 0.25)"
          // }`,
          ...(props?.bodyStyles || {}),
        },
      }}
      title={
        // <Space align="center" size={8}>
        //   {props.icon}
        //   <Typography.Text
        //     style={{
        //       fontWeight: 400,
        //     }}
        //   >
        //     {props.title}
        //   </Typography.Text>
        // </Space>

        null
      }>
      <Flex align="center" gap={5} justify="start" vertical={false}>
        <Space
          size={8}
          style={{
            backgroundColor: "#43a5e8",
            padding: "2px",
            borderRadius: "10%",
            
          }}>
          {props.icon}
        </Space>
        <Typography.Text
          type="secondary"
          // level={5}
          style={{
            fontWeight: 400,
            color: "#9b9897",
            // fontSize:"14px"
          }}>
          {props.title}
        </Typography.Text>
      </Flex>
      {props.children}
    </Card>
  );
};
