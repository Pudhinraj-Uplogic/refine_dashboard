import { Flex, Grid,Typography } from "antd";

import type { FormItems } from "./types.form";
import RenderFormItem from "./RenderFormItem";

const FormTemplate = ({ item }: { item: FormItems }) => {
  const screens = Grid.useBreakpoint();
  const { icon, label,required, row, type} = item;
  const parentStyle = {
    // backgroundColor: "red",
    padding: "10px 10px",
    width: "100%",
    height: "100%",
    display: type =="hidden" ? "none" : "flex",
    // margin:'1%'
  };
  console.log("screens", row , screens.xl  );
  const childStyle = {
    // backgroundColor: screens.xl  ? "yellow" : "blue",
    width: screens.xl ? row ? "45%" : "17%" : "100%",
  };


  // console.log("item", item);

  return (
      <>
        <Flex
        gap={8}
        justify="space-evenly"
        align={"center"}
        vertical={!screens.xl}
        style={parentStyle}>
        <Flex gap={4} align="center" style={childStyle}>
          <span>{icon}</span>
          <Typography.Text >{label}</Typography.Text>
          {required ? <sup className="text-[red]">*</sup> : null}
        </Flex>
        <RenderFormItem {...item} />
      </Flex>
      </>
  );
};

export default FormTemplate;
