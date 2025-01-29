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
    // margin:'1%'
  };
  // console.log("screens", screens);
  const childStyle = {
    // backgroundColor: screens.xl  ? "yellow" : "blue",
    width: screens.xl ? "50%" : "100%",
  };

  const { icon, label,required } = item;
  return (
      <Flex
        gap={8}
        justify="space-evenly"
        align={"center"}
        vertical={!screens.xl}
        style={parentStyle}>
        <Flex gap={4} align="center" style={childStyle}>
          <span>{icon}</span>
          <Typography.Text>{label}</Typography.Text>
          {required ? <sup className="text-[red]">*</sup> : null}
        </Flex>
        <RenderFormItem Feild={item} />
      </Flex>
  );
};

export default FormTemplate;
