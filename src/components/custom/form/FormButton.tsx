import { Flex } from "antd";
import { FooterButtonProps } from "./types.form";
import { ListButton, SaveButton } from "@refinedev/antd";

export const FooterButton = ({
    handleSubmit,
    formLoading,
  }: FooterButtonProps) => {
    // console.log("formLoading", formLoading,handleSubmit);
    return (
      <Flex align="center" justify="space-between" style={{ padding: "16px" }}>
        <>
          <ListButton style={{ backgroundColor: "" }} icon={false}>
            Cancel
          </ListButton>
          <SaveButton
            style={{ backgroundColor: "" }}
            onClick={handleSubmit}
            disabled={formLoading}>
            Save
          </SaveButton>
        </>
      </Flex>
    );
  };