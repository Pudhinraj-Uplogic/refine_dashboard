import { Flex, Grid,Typography } from "antd";

import type { FormItems } from "./types.form";
import RenderFormItem from "./RenderFormItem";

const FormTemplate = ({ item }: { item: FormItems }) => {
  const screens = Grid.useBreakpoint();
  const parentStyle = {
    // backgroundColor: "red",
    padding: "10px 10px",
    width: "100%",
    height: "100%",
  };
  const childStyle = {
    // backgroundColor: screens.sm || screens.md  ? "yellow" : "blue",
    width: screens.sm || screens.md ? "25%" : "100%",
  };

  const { icon, label } = item;
  return (
      <Flex
        gap={8}
        justify="space-evenly"
        align="start"
        vertical={!screens.sm}
        style={parentStyle}>
        <Flex gap={4} align="center" style={childStyle}>
          <span>{icon}</span>
          <Typography.Text>{label}</Typography.Text>
        </Flex>
        <RenderFormItem Feild={item} />
      </Flex>
  );
};

export default FormTemplate;
