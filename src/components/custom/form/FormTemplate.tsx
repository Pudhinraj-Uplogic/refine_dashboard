import { Flex, Grid, Typography } from "antd";

import type { FormItems } from "./types.form";
import RenderFormItem from "./RenderFormItem";

const FormTemplate = ({ item}: { item: FormItems}) => {
  const screens = Grid.useBreakpoint();
  const { icon, label, required, row, type,isTiny } = item;
  const parentStyle = {
    // backgroundColor: "red",
    // padding: "10px 10px",
      padding: "24px 16px 0px 16px",
    width: "100%",
    height: "100%",
    // display: type =="hidden" ? "none" : "flex",
    // margin:'1%'
    // justifyContent: type == "image" ? "start" : "space-evenly",
    alignItems: type == "textArea" || type == "image" ? "start" : "baseline",
  };
  // console.log("screens", row, screens.xl,isMultiple, !screens.xl);
  const childStyle = {
    // backgroundColor: screens.xl ? row ? "yellow":"red" : "blue",
    width: screens.xl ? row ? "50%" : isTiny ? "50%":"18%" : "100%",
  };

  // console.log("item", item);

  return (
    <>
      {type == "hidden" ? (
        <RenderFormItem {...item} />
      ) : (
        <Flex
          gap={8}
           justify="space-evenly"
          //  align={"center"}
           align="baseline"
          vertical={!screens.xl}
          style={parentStyle}>
          <Flex gap={4} align="center" style={childStyle}>
            <span>{icon}</span>
            <Typography.Text>{label}</Typography.Text>
            {required ? <sup className="text-[red]">*</sup> : null}
          </Flex>
          <RenderFormItem {...item} />
        </Flex>
      )}
    </>
  );
};

export default FormTemplate;
