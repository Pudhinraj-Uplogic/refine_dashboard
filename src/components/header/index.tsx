import { useState, useEffect, useContext } from "react";
import {
  useGetLocale,
  useSetLocale,
  useGetIdentity,
  useTranslate,
  useList,
  useResource,
} from "@refinedev/core";
import { Link } from "react-router";
import {
  SearchOutlined,
  DownOutlined,
  ShoppingCartOutlined,
  BellOutlined,
  MenuOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  AlignLeftOutlined,
  AlignRightOutlined,
} from "@ant-design/icons";

import {
  Dropdown,
  Input,
  Avatar,
  Typography,
  Space,
  Grid,
  Row,
  Col,
  AutoComplete,
  Layout as AntdLayout,
  Button,
  theme,
  type MenuProps,
  Flex,
  Divider,
} from "antd";

import { useTranslation } from "react-i18next";
import debounce from "lodash/debounce";

import { useConfigProvider } from "../../context";
import { IconMoon, IconSun } from "../../components/icons";
import type { IOrder, IStore, ICourier, IIdentity } from "../../interfaces";
import { useStyles } from "./styled";
import { ThemedLayoutContext } from "@refinedev/antd";

const { Header: AntdHeader } = AntdLayout;
const { useToken } = theme;
const { Text } = Typography;
const { useBreakpoint } = Grid;

interface IOptionGroup {
  value: string;
  label: string | React.ReactNode;
}

interface IOptions {
  label: string | React.ReactNode;
  options: IOptionGroup[];
}

export const Header: React.FC = () => {
  const { token } = useToken();
  const { styles } = useStyles();
  const { mode, setMode } = useConfigProvider();
  const { i18n } = useTranslation();
  const locale = useGetLocale();
  const changeLanguage = useSetLocale();
  const { data: user } = useGetIdentity<IIdentity>();
  const screens = useBreakpoint();
  const t = useTranslate();

  const collapse = useContext(ThemedLayoutContext);

  console.log("collapse", collapse);

  const handleCollapse = () => {
    collapse.setSiderCollapsed(!collapse.siderCollapsed);
  };

  const currentLocale = locale();
  const currentResource = useResource();

  console.log("resource ", currentResource);

  const renderTitle = (title: string) => (
    <div className={styles.headerTitle}>
      <Text style={{ fontSize: "16px" }}>{title}</Text>
      <Link to={`/${title.toLowerCase()}`}>{t("search.more")}</Link>
    </div>
  );

  const renderItem = (title: string, imageUrl: string, link: string) => ({
    value: title,
    label: (
      <Link to={link} style={{ display: "flex", alignItems: "center" }}>
        {imageUrl && (
          <Avatar
            size={32}
            src={imageUrl}
            style={{ minWidth: "32px", marginRight: "16px" }}
          />
        )}
        <Text>{title}</Text>
      </Link>
    ),
  });

  const [value, setValue] = useState<string>("");
  const [options, setOptions] = useState<IOptions[]>([]);

  const { refetch: refetchOrders } = useList<IOrder>({
    resource: "orders",
    config: {
      filters: [{ field: "q", operator: "contains", value }],
    },
    queryOptions: {
      enabled: false,
      onSuccess: (data) => {
        const orderOptionGroup = data.data.map((item) =>
          renderItem(
            `${item.store.title} / #${item.orderNumber}`,
            item?.products?.[0].images?.[0]?.url ||
              "/images/default-order-img.png",
            `/orders/show/${item.id}`
          )
        );
        if (orderOptionGroup.length > 0) {
          setOptions((prevOptions) => [
            ...prevOptions,
            {
              label: renderTitle(t("orders.orders")),
              options: orderOptionGroup,
            },
          ]);
        }
      },
    },
  });

  const { refetch: refetchStores } = useList<IStore>({
    resource: "stores",
    config: {
      filters: [{ field: "q", operator: "contains", value }],
    },
    queryOptions: {
      enabled: false,
      onSuccess: (data) => {
        const storeOptionGroup = data.data.map((item) =>
          renderItem(item.title, "", `/stores/edit/${item.id}`)
        );
        if (storeOptionGroup.length > 0) {
          setOptions((prevOptions) => [
            ...prevOptions,
            {
              label: renderTitle(t("stores.stores")),
              options: storeOptionGroup,
            },
          ]);
        }
      },
    },
  });

  const { refetch: refetchCouriers } = useList<ICourier>({
    resource: "couriers",
    config: {
      filters: [{ field: "q", operator: "contains", value }],
    },
    queryOptions: {
      enabled: false,
      onSuccess: (data) => {
        const courierOptionGroup = data.data.map((item) =>
          renderItem(
            `${item.name} ${item.surname}`,
            item.avatar[0].url,
            `/couriers/show/${item.id}`
          )
        );
        if (courierOptionGroup.length > 0) {
          setOptions((prevOptions) => [
            ...prevOptions,
            {
              label: renderTitle(t("couriers.couriers")),
              options: courierOptionGroup,
            },
          ]);
        }
      },
    },
  });

  useEffect(() => {
    setOptions([]);
    refetchOrders();
    refetchCouriers();
    refetchStores();
  }, [value]);

  const menuItems: MenuProps["items"] = [...(i18n.languages || [])]
    .sort()
    .map((lang: string) => ({
      key: lang,
      onClick: () => changeLanguage(lang),
      icon: (
        <span style={{ marginRight: 8 }}>
          <Avatar size={16} src={`/images/flags/${lang}.svg`} />
        </span>
      ),
      label: lang === "en" ? "English" : "German",
    }));

  return (
    <AntdHeader
      style={{
        // backgroundColor: "red",
        padding: screens.sm ? "5px 10px" : "10px 32px",
        // margin: "1%",
        marginLeft: "0%",
        marginRight: "0.5%",
        textAlign: "center",
        // backgroundColor: screens.sm ? "red": "blue"
      }}>
      <Row
        // align="middle"
        style={{
          justifyContent: screens.sm ? "space-between" : "start",
        }}>
        {/* <Col xs={0} sm={8} md={12}>
          <AutoComplete
            style={{
              width: "100%",
              maxWidth: "550px",
            }}
            options={options}
            filterOption={false}
            onSearch={debounce((value: string) => setValue(value), 300)}
          >
            <Input
              size="large"
              placeholder={t("search.placeholder")}
              suffix={<div className={styles.inputSuffix}>/</div>}
              prefix={<SearchOutlined className={styles.inputPrefix} />}
            />
          </AutoComplete>
        </Col> */}
        <Col xs={10} sm={8} md={12} style={{ backgroundColor: "" }}>
          <Flex
            align="center"
            justify="start"
            vertical={false}
            gap={2}
            style={{ backgroundColor: "" }}>
            {screens.xl || screens.lg || screens.md ? (
              <Button
                type="text"
                className={styles.themeSwitch}
                style={{
                  textAlign: "center",
                  backgroundColor: "transparent",
                  padding: "0",
                  margin: "0",
                }}
                icon={
                 collapse.siderCollapsed ? <AlignRightOutlined style={{ fontSize: "24px" , marginTop:-2, color:"#158078" }} /> : <AlignLeftOutlined style={{ fontSize: "24px", marginTop:-2, color:"#158078" }}/>
                }
                onClick={handleCollapse}
              />
            ) : null}
            <Typography.Title
              level={5}
              style={{
                textAlign: "center",
                fontSize: screens.sm ? "20px" : "14px",
                padding: screens.sm ? "10px 12px" : "0px 12px",
                backgroundColor: "",
                textTransform: "capitalize",
              }}>
              {currentResource?.resource?.name}
            </Typography.Title>
          </Flex>
        </Col>
        <Col xs={12} sm={16} md={12}>
          {/* <Space size={screens.md ? 32 : 16} align="center"> */}
          {/* <Dropdown
              menu={{
                items: menuItems,
                selectedKeys: currentLocale ? [currentLocale] : [],
              }}
            >
              <Button onClick={(e) => e.preventDefault()}>
                <Space>
                  <Text className={styles.languageSwitchText}>
                    {currentLocale === "en" ? "English" : "German"}
                  </Text>
                  <DownOutlined className={styles.languageSwitchIcon} />
                </Space>
              </Button>
            </Dropdown> */}
          {/* <Button
              className={styles.themeSwitch}
              type="text"
              icon={<BellOutlined />}
            />
            <Button
              className={styles.themeSwitch}
              type="text"
              icon={mode === "light" ? <IconMoon /> : <IconSun />}
              onClick={() => {
                setMode(mode === "light" ? "dark" : "light");
              }}
            />
            <Button
              className={styles.themeSwitch}
              type="text"
              icon={<ShoppingCartOutlined />}
            />
            <Space
              size={screens.md ? 16 : 8}
              align="center"
              direction="vertical"
              style={{ backgroundColor:'yellow' }}
              >
              <Avatar size="large" src={user?.avatar} alt={user?.name} />
              <Space size={0}>
                <Typography.Text>{user?.name}</Typography.Text>
                <DownOutlined />
                </Space>
            </Space>
          </Space> */}

          <Flex align="center" justify="end" vertical={false} gap={20}>
            {/* <Flex align="center" gap={20}> */}
            {screens.md || screens.lg || screens.xl ? (
              <>
                <Button
                  className={styles.themeSwitch}
                  style={{
                    textAlign: "center",
                    backgroundColor: "transparent",
                  }}
                  type="text"
                  icon={
                    <SearchOutlined
                      style={{ color: "#158078", fontSize: "20px" }}
                    />
                  }
                />

                <Button
                  className={styles.themeSwitch}
                  style={{
                    textAlign: "center",
                    backgroundColor: "transparent",
                  }}
                  type="text"
                  icon={
                    <BellOutlined
                      style={{ color: "#158078", fontSize: "20px" }}
                    />
                  }
                />

                <Button
                  className={styles.themeSwitch}
                  style={{
                    textAlign: "center",
                    backgroundColor: "transparent",
                  }}
                  type="text"
                  icon={mode === "light" ? <IconMoon /> : <IconSun />}
                  onClick={() => {
                    setMode(mode === "light" ? "dark" : "light");
                  }}
                />
                <Button
                  className={styles.themeSwitch}
                  style={{
                    textAlign: "center",
                    backgroundColor: "transparent",
                  }}
                  type="text"
                  icon={
                    <ShoppingCartOutlined
                      style={{ color: "#158078", fontSize: "20px" }}
                    />
                  }
                />
                <Divider
                  style={{
                    color: "Darkgrey",
                    backgroundColor: "Darkgrey",
                    height: "20px",
                    padding: "0px 0px 0px 0px",
                    margin: "0px 0 0 0",
                  }}
                  type="vertical"
                />
              </>
            ) : (
              <></>
            )}

            {/* </Flex> */}
            <Flex
              align="center"
              gap={5}
              style={{
                backgroundColor: "",
              }}>
              <Avatar
                size={screens.sm ? 45 : "small"}
                src={user?.avatar}
                alt={user?.name}
              />
              <Flex align="start" vertical={true} gap={2}>
                <Typography.Text
                  style={{ fontSize: `${screens.sm ? "16px" : "10px"}` }}>
                  {user?.name}
                </Typography.Text>
                <Typography.Text
                  style={{ fontSize: `${screens.sm ? "12px" : "8px"}` }}>
                  {/* {user?.name} */}
                  Admin
                </Typography.Text>
              </Flex>
            </Flex>
          </Flex>
        </Col>
      </Row>
    </AntdHeader>
  );
};
