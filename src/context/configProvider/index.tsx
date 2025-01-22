import {
  createContext,
  type PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  ConfigProvider as AntdConfigProvider,
  theme,
  type ThemeConfig,
} from "antd";
import { ThemeProvider } from "antd-style";
import { RefineThemes } from "@refinedev/antd";
import "./config.css";

type Mode = "light" | "dark";

type ConfigProviderContext = {
  mode: Mode;
  setMode: (mode: Mode) => void;
};

export const ConfigProviderContext = createContext<
  ConfigProviderContext | undefined
>(undefined);

const defaultMode: Mode = (localStorage.getItem("theme") as Mode) || "light";

type ConfigProviderProps = {
  theme?: ThemeConfig;
};

export const ConfigProvider = ({
  theme: themeFromProps,
  children,
}: PropsWithChildren<ConfigProviderProps>) => {
  const [mode, setMode] = useState<Mode>(defaultMode);

  const handleSetMode = (mode: Mode) => {
    localStorage.setItem("theme", mode);
    const html = document.querySelector("html");
    html?.setAttribute("data-theme", mode);
    setMode(mode);
  };

  // add data-theme to html tag
  useEffect(() => {
    const html = document.querySelector("html");
    html?.setAttribute("data-theme", mode);
  }, []);

  return (
    <ConfigProviderContext.Provider value={{ mode, setMode: handleSetMode }}>
      <AntdConfigProvider
        theme={{
          ...RefineThemes.Yellow,
          algorithm:
            mode === "light" ? theme.defaultAlgorithm : theme.darkAlgorithm,
          ...themeFromProps,
          token:{
            colorBgLayout: mode =="dark" ? "black" :" #fafaf2"
          },
          components:{
            
            Menu:{
              // radiusItem:100,
              itemColor:  "#9bbfbc",
              itemActiveBg:"#158078",
              dangerItemColor:'#158078',
              // horizontalItemSelectedBg:"#158078",
              // horizontalItemSelectedColor:"#158078",
              popupBg:"#158078",   // while collapse bg color 
              // horizontalItemBorderRadius:1,
              subMenuItemBg:"#158078",   
              // itemActiveBg: "green",
              // itemBg: "#158078",
              itemHoverBg: "#158078", // ok   
              itemHoverColor: "white",  // ok
              itemBorderRadius: 0,
              itemMarginInline:0,
              // itemMarginBlock:5,
              // subMenuItemBorderRadius:40,
              // itemPaddingInline: "1px",
              // borderRadius: 10,
              fontSize: 14,
              activeBarBorderWidth: 0,
              // iconMarginInlineEnd:10, 
              activeBarHeight: 0,
              activeBarWidth: 5,
              itemSelectedColor :"white",
              itemSelectedBg: "#158078",
              subMenuItemSelectedColor :"white",
              colorBgContainer: "#158078",
              // itemHeight: 10, // ok
              // itemPaddingInline: 10, 
              // groupTitleColor: "red",
            },
            Card:{
              // colorBgContainer:"red"

            },
            Table:{
              // headerColor:"red",
              // headerBg:"blue"

                // colorBgBase:"blue",
                // colorBorder :"red",
                // colorBgContainer:"red",
                // colorBgLayout:"blue",
                // colorPrimaryBorder:"yellow"
            }
          }
        }}
      >
        <ThemeProvider appearance={mode}>{children}</ThemeProvider>
      </AntdConfigProvider>
    </ConfigProviderContext.Provider>
  );
};

export const useConfigProvider = () => {
  const context = useContext(ConfigProviderContext);

  if (context === undefined) {
    throw new Error("useConfigProvider must be used within a ConfigProvider");
  }

  return context;
};
