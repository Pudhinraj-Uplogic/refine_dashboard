import { CreateButton, List } from "@refinedev/antd";

import { AllStoresMap, StoreListTable } from "../../components";
import { Button, Flex, Segmented } from "antd";
import { useState } from "react";
import { useGo, useNavigation, useTranslate } from "@refinedev/core";
import { EnvironmentOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { useLocation } from "react-router";

type View = "table" | "map";

export const StoreList = ({ children }: any) => {
  const [view, setView] = useState<View>(
    (localStorage.getItem("store-view") as View) || "table",
  );

  const handleViewChange = (value: View) => {
    setView(value);
    localStorage.setItem("store-view", value);
  };

  const t = useTranslate();
  const go = useGo();
  const { pathname } = useLocation();
  const { createUrl } = useNavigation();

  return (
    <>
      <List
        breadcrumb={false}
        headerButtons={(props) => [
          <Segmented<View>
            key="view"
            size="large"
            value={view}
            style={{ marginRight: 24 }}
            options={[
              {
                label: "",
                value: "table",
                icon: <UnorderedListOutlined />,
              },
              {
                label: "",
                value: "map",
                icon: <EnvironmentOutlined />,
              },
            ]}
            onChange={handleViewChange}
          />,
          <CreateButton {...props.createButtonProps} key="create" size="large">
            {t("stores.addNewStore")}
          </CreateButton>,

          // <CreateButton {...props.createButtonProps} key="create" size="large">
          //   {t("stores.addNewStore")}
          // </CreateButton>
        //   <CreateButton
        //   {...props.createButtonProps}
        //   key="create"
        //   size="large"
        //   onClick={() => {
        //     return go({
        //       to: `${createUrl("stores")}`,
        //       query: {
        //         to: pathname,
        //       },
        //       options: {
        //         keepQuery: true,
        //       },
        //       type: "replace",
        //     });
        //   }}
        // >
        //   {t("stores.addNewStore")}
        // </CreateButton>,
          ,
        ]}
      >
        {view === "table" && <StoreListTable />}
        {view === "map" && (
          <Flex
            style={{
              height: "calc(100dvh - 232px)",
              marginTop: "32px",
            }}
          >
            <AllStoresMap />
          </Flex>
        )}
      </List>
      {children}
    </>
  );
};
