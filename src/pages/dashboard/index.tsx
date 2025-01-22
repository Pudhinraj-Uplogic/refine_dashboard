import {
  Row,
  Col,
  theme,
  Dropdown,
  type MenuProps,
  Button,
  Flex,
  Card,
  Typography,
} from "antd";
import { useTranslation } from "react-i18next";

import {
  CardWithPlot,
  DailyRevenue,
  DailyOrders,
  NewCustomers,
  AllOrdersMap,
  OrderTimeline,
  RecentOrders,
  TrendingMenu,
  CardWithContent,
  TrendUpIcon,
  TrendDownIcon,
  GeneralCard,
  CommonCard,
  PieChartFormat,
  TinyFormatCard,
} from "../../components";
import {
  ClockCircleOutlined,
  DollarCircleOutlined,
  DownOutlined,
  LineChartOutlined,
  RiseOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useMemo, useState } from "react";
import { List, NumberField } from "@refinedev/antd";
import { useApiUrl, useCustom } from "@refinedev/core";
import dayjs from "dayjs";
import type { ISalesChart } from "../../interfaces";

type DateFilter = "lastWeek" | "lastMonth";

const DATE_FILTERS: Record<
  DateFilter,
  {
    text: string;
    value: DateFilter;
  }
> = {
  lastWeek: {
    text: "lastWeek",
    value: "lastWeek",
  },
  lastMonth: {
    text: "lastMonth",
    value: "lastMonth",
  },
};

export const DashboardPage: React.FC = () => {
  const { token } = theme.useToken();
  const { t } = useTranslation();
  const API_URL = useApiUrl();

  const [selecetedDateFilter, setSelectedDateFilter] = useState<DateFilter>(
    DATE_FILTERS.lastWeek.value
  );

  const dateFilters: MenuProps["items"] = useMemo(() => {
    const filters = Object.keys(DATE_FILTERS) as DateFilter[];

    return filters.map((filter) => {
      return {
        key: DATE_FILTERS[filter].value,
        label: t(`dashboard.filter.date.${DATE_FILTERS[filter].text}`),
        onClick: () => {
          setSelectedDateFilter(DATE_FILTERS[filter].value);
        },
      };
    });
  }, []);

  const dateFilterQuery = useMemo(() => {
    const now = dayjs();
    switch (selecetedDateFilter) {
      case "lastWeek":
        return {
          start: now.subtract(6, "days").startOf("day").format(),
          end: now.endOf("day").format(),
        };
      case "lastMonth":
        return {
          start: now.subtract(1, "month").startOf("day").format(),
          end: now.endOf("day").format(),
        };
      default:
        return {
          start: now.subtract(7, "days").startOf("day").format(),
          end: now.endOf("day").format(),
        };
    }
  }, [selecetedDateFilter]);

  const { data: dailyRevenueData } = useCustom<{
    data: ISalesChart[];
    total: number;
    trend: number;
  }>({
    url: `${API_URL}/dailyRevenue`,
    method: "get",
    config: {
      query: dateFilterQuery,
    },
  });

  const { data: dailyOrdersData } = useCustom<{
    data: ISalesChart[];
    total: number;
    trend: number;
  }>({
    url: `${API_URL}/dailyOrders`,
    method: "get",
    config: {
      query: dateFilterQuery,
    },
  });

  const { data: newCustomersData } = useCustom<{
    data: ISalesChart[];
    total: number;
    trend: number;
  }>({
    url: `${API_URL}/newCustomers`,
    method: "get",
    config: {
      query: dateFilterQuery,
    },
  });

  const revenue = useMemo(() => {
    const data = dailyRevenueData?.data?.data;
    if (!data)
      return {
        data: [],
        trend: 0,
      };

    const plotData = data.map((revenue) => {
      const date = dayjs(revenue.date);
      return {
        timeUnix: date.unix(),
        timeText: date.format("DD MMM YYYY"),
        value: revenue.value,
        state: "Daily Revenue",
      };
    });

    return {
      data: plotData,
      trend: dailyRevenueData?.data?.trend || 0,
    };
  }, [dailyRevenueData]);

  const orders = useMemo(() => {
    const data = dailyOrdersData?.data?.data;
    if (!data) return { data: [], trend: 0 };

    const plotData = data.map((order) => {
      const date = dayjs(order.date);
      return {
        timeUnix: date.unix(),
        timeText: date.format("DD MMM YYYY"),
        value: order.value,
        state: "Daily Orders",
      };
    });

    return {
      data: plotData,
      trend: dailyOrdersData?.data?.trend || 0,
    };
  }, [dailyOrdersData]);

  const newCustomers = useMemo(() => {
    const data = newCustomersData?.data?.data;
    if (!data) return { data: [], trend: 0 };

    const plotData = data.map((customer) => {
      const date = dayjs(customer.date);
      return {
        timeUnix: date.unix(),
        timeText: date.format("DD MMM YYYY"),
        value: customer.value,
        state: "New Customers",
      };
    });

    return {
      data: plotData,
      trend: newCustomersData?.data?.trend || 0,
    };
  }, [newCustomersData]);

  const tinydata = useMemo(() => {
    return [
      264, 417, 438, 887, 309, 397, 550, 575, 563, 430, 525, 592, 492, 467, 513,
      546, 983, 340, 539, 243, 226, 192, 417,
    ];
  }, [newCustomersData]);

  return (
    <List
      title={t("dashboard.overview.title")}
      headerButtons={() => (
        <Dropdown menu={{ items: dateFilters }}>
          <Button>
            {t(
              `dashboard.filter.date.${DATE_FILTERS[selecetedDateFilter].text}`
            )}
            <DownOutlined />
          </Button>
        </Dropdown>
      )}>
      <Row gutter={[16, 16]}>
        <Col md={24} xl={24}>
          <Row gutter={[10, 10]}>
            <Col xl={6} lg={6} md={12} sm={24} xs={24}>
              <CommonCard
                icon={
                  <DollarCircleOutlined
                    style={{ color: "white", fontSize: 15, padding: 2 }}
                  />
                }
                title={t("dashboard.dailyRevenue.title")}
                bodyStyles={{
                  width: "100%",
                  margin: "0 auto",
                  // height: 140,
                  // backgroundColor: "red",
                }}>
                <Flex align="center" justify="space-between" gap={8}>
                  <Typography.Title
                    level={2}
                    style={{ textAlign: "center", margin: "0 0 0 0", fontFamily:"sans-serif" }}>
                    $1234
                  </Typography.Title>
                  <div
                    style={{
                      width: "40%",
                      height: "100%",
                    }}>
                    <TinyFormatCard
                      data={tinydata}
                      height={50}
                      width={50}
                      colorCode="#158078"
                    />
                  </div>
                </Flex>
                <Flex align="center" gap={3}>
                  <RiseOutlined
                    size={50}
                    style={{
                      color: "green",
                      fontSize: 14,
                    }}
                  />
                  <Typography.Text
                    style={{
                      color: "green",
                      fontSize: 13,
                    }}>
                    +12%
                  </Typography.Text>

                  <Typography.Text style={{ fontSize: 13, color: "#9b9897" }}>
                    {" "}
                    Yesterday
                  </Typography.Text>
                </Flex>
              </CommonCard>
            </Col>
            <Col xl={6} lg={6} md={12} sm={24} xs={24}>
              <CommonCard
                icon={
                  <DollarCircleOutlined
                    style={{ color: "white", fontSize: 15, padding: 2 }}
                  />
                }
                title={t("dashboard.dailyRevenue.title")}
                bodyStyles={{
                  width: "100%",
                  margin: "0 auto",
                  // backgroundColor: "red",
                }}>
                <Flex align="center" justify="space-between" gap={8}>
                  <Typography.Title
                    level={2}
                    style={{ textAlign: "center", margin: "0 0 0 0",fontFamily:"sans-serif" }}>
                    $1234
                  </Typography.Title>
                  <div
                    style={{
                      width: "40%",
                      height: "100%",
                    }}>
                    <TinyFormatCard data={tinydata} height={50} width={50} />
                  </div>
                </Flex>
                <Flex align="center" gap={3}>
                  <RiseOutlined
                    size={50}
                    style={{
                      color: "green",
                      fontSize: 14,
                    }}
                  />
                  <Typography.Text
                    style={{
                      color: "green",
                      fontSize: 13,
                    }}>
                    +12%
                  </Typography.Text>

                  <Typography.Text style={{ fontSize: 13, color: "#9b9897" }}>
                    {" "}
                    Yesterday
                  </Typography.Text>
                </Flex>
              </CommonCard>
            </Col>
            <Col xl={6} lg={6} md={12} sm={24} xs={24}>
              <CommonCard
                icon={
                  <UserOutlined
                    style={{ color: "white", fontSize: 15, padding: 2 }}
                  />
                }
                title={"Daily Customer"}
                bodyStyles={{
                  width: "100%",
                  margin: "0 auto",
                  // backgroundColor: "red",
                }}>
                <Flex align="center" justify="space-between" gap={8}>
                  <Typography.Title
                    level={2}
                    style={{ textAlign: "center", margin: "0 0 0 0",fontFamily:"sans-serif"  }}>
                    $1432
                  </Typography.Title>
                  <div
                    style={{
                      width: "40%",
                      height: "100%",
                    }}>
                    {/* <GeneralCard
                      height={50}
                      data={revenue.data}
                      width={50}
                      colorCode="#f0a09b"
                    /> */}
                    <TinyFormatCard
                      data={tinydata}
                      height={50}
                      width={50}
                      colorCode="#f0a09b"
                    />
                  </div>
                </Flex>
                <Flex align="center" gap={3}>
                  <RiseOutlined
                    size={50}
                    style={{
                      color: "green",
                      fontSize: 14,
                    }}
                  />
                  <Typography.Text
                    style={{
                      color: "green",
                      fontSize: 13,
                    }}>
                    +12%
                  </Typography.Text>

                  <Typography.Text style={{ fontSize: 13, color: "#9b9897" }}>
                    {" "}
                    Yesterday
                  </Typography.Text>
                </Flex>
              </CommonCard>
            </Col>
            <Col xl={6} lg={6} md={12} sm={24} xs={24}>
              <CommonCard
                icon={
                  <UserOutlined
                    style={{ color: "white", fontSize: 15, padding: 2 }}
                  />
                }
                title={"Daily Customer"}
                bodyStyles={{
                  width: "100%",
                  margin: "0 auto",
                  border: "none",
                  // backgroundColor: "red",
                }}>
                <Flex align="center" justify="space-between" gap={8}>
                  <Typography.Title
                    level={2}
                    style={{ textAlign: "center", margin: "0 0 0 0",fontFamily:"sans-serif" }}>
                    $1432
                  </Typography.Title>
                  <div
                    style={{
                      width: "40%",
                      height: "100%",
                    }}>
                    <TinyFormatCard
                      data={tinydata}
                      height={50}
                      width={50}
                      colorCode="#158078"
                    />
                  </div>
                </Flex>
                <Flex align="center" gap={3}>
                  <RiseOutlined
                    size={50}
                    style={{
                      color: "green",
                      fontSize: 14,
                    }}
                  />
                  <Typography.Text
                    style={{
                      color: "green",
                      fontSize: 13,
                    }}>
                    +12%
                  </Typography.Text>
                  <Typography.Text
                    style={{
                      fontSize: 13,
                      color: "#9b9897",
                    }}>
                    {" "}
                    Yesterday
                  </Typography.Text>
                </Flex>
              </CommonCard>
            </Col>
            {/* <Col xl={{ span: 7 }} lg={12} md={24} sm={24} xs={24}>
              <CardWithPlot
                icon={
                  <ShoppingOutlined
                    style={{
                      fontSize: 14,
                      color: token.colorPrimary,
                    }}
                  />
                }
                rightSlot={
                  <Flex align="center" gap={8}>
                    <NumberField value={orders.trend} />
                    {orders.trend > 0 ? <TrendUpIcon /> : <TrendDownIcon />}
                  </Flex>
                }
                title={t("dashboard.dailyOrders.title")}
              >
                <DailyOrders height={170} data={orders.data} />
              </CardWithPlot>
            </Col>
            <Col xl={{ span: 7 }} lg={12} md={24} sm={24} xs={24}>
              <CardWithPlot
                icon={
                  <UserOutlined
                    style={{
                      fontSize: 14,
                      color: token.colorPrimary,
                    }}
                  />
                }
                title={t("dashboard.newCustomers.title")}
                rightSlot={
                  <Flex align="center" gap={8}>
                    <NumberField
                      value={newCustomers.trend}
                      options={{
                        style: "percent",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }}
                    />
                    {newCustomers.trend > 0 ? (
                      <TrendUpIcon />
                    ) : (
                      <TrendDownIcon />
                    )}
                  </Flex>
                }
              >
                <NewCustomers height={170} data={newCustomers.data} />
              </CardWithPlot>
            </Col> */}
          </Row>
        </Col>
        {/* <Col md={24}>
          <Row gutter={[16, 16]}>
            <Col xl={{ span: 10 }} lg={24} md={24} sm={24} xs={24}>
              <CardWithPlot
                icon={
                  <DollarCircleOutlined
                    style={{
                      fontSize: 14,
                      color: token.colorPrimary,
                    }}
                  />
                }
                title={t("dashboard.dailyRevenue.title")}
                rightSlot={
                  <Flex align="center" gap={8}>
                    <NumberField
                      value={revenue.trend}
                      options={{
                        style: "currency",
                        currency: "USD",
                      }}
                    />
                    {revenue.trend > 0 ? <TrendUpIcon /> : <TrendDownIcon />}
                  </Flex>
                }
              >
                <DailyRevenue height={170} data={revenue.data} />
              </CardWithPlot>
            </Col>
            <Col xl={{ span: 7 }} lg={12} md={24} sm={24} xs={24}>
              <CardWithPlot
                icon={
                  <ShoppingOutlined
                    style={{
                      fontSize: 14,
                      color: token.colorPrimary,
                    }}
                  />
                }
                rightSlot={
                  <Flex align="center" gap={8}>
                    <NumberField value={orders.trend} />
                    {orders.trend > 0 ? <TrendUpIcon /> : <TrendDownIcon />}
                  </Flex>
                }
                title={t("dashboard.dailyOrders.title")}
              >
                <DailyOrders height={170} data={orders.data} />
              </CardWithPlot>
            </Col>
            <Col xl={{ span: 7 }} lg={12} md={24} sm={24} xs={24}>
              <CardWithPlot
                icon={
                  <UserOutlined
                    style={{
                      fontSize: 14,
                      color: token.colorPrimary,
                    }}
                  />
                }
                title={t("dashboard.newCustomers.title")}
                rightSlot={
                  <Flex align="center" gap={8}>
                    <NumberField
                      value={newCustomers.trend}
                      options={{
                        style: "percent",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }}
                    />
                    {newCustomers.trend > 0 ? (
                      <TrendUpIcon />
                    ) : (
                      <TrendDownIcon />
                    )}
                  </Flex>
                }
              >
                <NewCustomers height={170} data={newCustomers.data} />
              </CardWithPlot>
            </Col>
          </Row>
        </Col> */}
        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
          <Row gutter={[16, 16]}>
            {/* <Col xl={12} lg={12} md={24} sm={24} xs={24}>
            <CardWithPlot
              icon={
                <UserOutlined
                  style={{
                    fontSize: 14,
                    color: token.colorPrimary,
                  }}
                />
              }
              title={t("dashboard.newCustomers.title")}
              rightSlot={
                <Flex align="center" gap={8}>
                  <NumberField
                    value={newCustomers.trend}
                    options={{
                      style: "percent",
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }}
                  />
                  {newCustomers.trend > 0 ? <TrendUpIcon /> : <TrendDownIcon />}
                </Flex>
              }>
              <NewCustomers height={200} data={newCustomers.data} />
            </CardWithPlot>
          </Col> */}
            <Col xl={12} lg={12} md={24} sm={24} xs={24}>
              <CardWithPlot
                icon={
                  // <DollarCircleOutlined
                  //   style={{
                  //     fontSize: 14,
                  //     color: token.colorPrimary,
                  //   }}
                  // />
                  ""
                }
                title={t("dashboard.dailyRevenue.title")}
                rightSlot={
                  <Flex align="center" gap={8}>
                    <NumberField
                      value={revenue.trend}
                      options={{
                        style: "currency",
                        currency: "USD",
                      }}
                    />
                    {revenue.trend > 0 ? <TrendUpIcon /> : <TrendDownIcon />}
                  </Flex>
                }>
                <DailyRevenue
                  height={200}
                  data={revenue.data}
                  colorCode="#ffc355"
                />
              </CardWithPlot>
            </Col>

            <Col xl={12} lg={12} md={24} sm={24} xs={24}>
              <CardWithPlot
                bodyStyles={{
                  height: "250px",
                  width: "80%",
                  margin: "0 auto",
                  overflow: "hidden",
                  padding: 0,
                }}
                icon={
                  // <ClockCircleOutlined
                  //   style={{
                  //     fontSize: 14,
                  //     color: token.colorPrimary,
                  //   }}
                  // />
                  ""
                }
                title={"Pie chart"}>
                <PieChartFormat />
              </CardWithPlot>
            </Col>
          </Row>
        </Col>
        <Col xl={15} lg={15} md={24} sm={24} xs={24}>
          <CardWithContent
            bodyStyles={{
              height: "432px",
              overflow: "hidden",
              padding: 0,
            }}
            icon={
              <ClockCircleOutlined
                style={{
                  fontSize: 14,
                  color: token.colorPrimary,
                }}
              />
            }
            title={t("dashboard.deliveryMap.title")}>
            <AllOrdersMap />
          </CardWithContent>
        </Col>
        <Col xl={9} lg={9} md={24} sm={24} xs={24}>
          <CardWithContent
            bodyStyles={{
              height: "430px",
              overflow: "hidden",
              padding: 0,
            }}
            icon={
              <ClockCircleOutlined
                style={{
                  fontSize: 14,
                  color: token.colorPrimary,
                }}
              />
            }
            title={t("dashboard.timeline.title")}>
            <OrderTimeline height={"432px"} />
          </CardWithContent>
        </Col>
        {/* <Col xl={15} lg={15} md={24} sm={24} xs={24}> */}
        {/* <CardWithContent
            bodyStyles={{
              padding: "1px 0px 0px 0px",
            }}
            icon={
              <ShoppingOutlined
                style={{
                  fontSize: 14,
                  color: token.colorPrimary,
                }}
              />
            }
            title={t("dashboard.recentOrders.title")}
          >
            <RecentOrders />
          </CardWithContent> */}
        {/* </Col> */}
        {/* <Col xl={9} lg={9} md={24} sm={24} xs={24}> */}
        {/* <CardWithContent
            bodyStyles={{
              padding: 0,
            }}
            icon={
              <RiseOutlined
                style={{
                  fontSize: 14,
                  color: token.colorPrimary,
                }}
              />
            }
            title={t("dashboard.trendingProducts.title")}
          >
            <TrendingMenu />
          </CardWithContent> */}
        {/* </Col> */}
      </Row>
    </List>
  );
};
