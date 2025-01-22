// import { Sider } from "@refinedev/antd";
// import { Menu } from "antd";
// import { useEffect, useState } from "react";

import { ThemedSiderV2, ThemedTitleV2 } from "@refinedev/antd";
import { useMenu, useResource } from "@refinedev/core";
import { Divider } from "antd";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";

// const Title = ({collapsed}:{collapsed:boolean}) =>{
//   return(
//     <div className="font-bold text-2xl mb-4 text-center h-[7vh]">{collapsed ? "RF" : "Refine"}</div>
//   )
// }
// const Sidebar = () => {
//   const [off,setOff] = useState(false)
//   return (
//    <Sider
//   //  className="bg-blue-600"
//    Title={()=> <Title collapsed={off}/>}
//    render={({ items, logout, collapsed }) => {
//       setOff(collapsed)
//     // const i = items.map((item) => item.key == window.location.pathname);
//     // console.log("i",i)
//     return (
//      <div  className="h-full bg-[red]">
//        <div>
//        {items.map((item,index) => (
//           <div key={index} >{item}</div>
//         ))}
//        </div>
//        {/* {logout} */}
//      </div>

//     );
//   }}
//    />
//   )
// }

// export default Sidebar

// import { Sider } from "@refinedev/antd";
// import { Menu } from "antd";
// import { useState } from "react";
// import { useLocation } from "react-router-dom";

// const Title = ({ collapsed }: { collapsed: boolean }) => {
//   return (
//     <div
//       className="font-bold text-2xl mb-4 text-center h-[7vh]"
//       style={{ backgroundColor: "red" }}
//     >
//       {collapsed ? "RF" : "Refine"}
//     </div>
//   );
// };

// const Sidebar = () => {
//   const [collapsed, setCollapsed] = useState(false);
//   const location = useLocation();
// return (
//     <Sider
//       style={{ backgroundColor: "red" }}
//       Title={() => <Title collapsed={collapsed} />}
//       render={({ items, logout }) => {
//         return (
//           <div className="h-full" style={{ backgroundColor: "red" }}>
//             <div>
//               {items.map((item: any, index: number) => (
//                 <div
//                   key={index}
//                   style={{
//                     backgroundColor: item.key === location.pathname ? "yellow" : "transparent",
//                     padding: "8px",
//                     margin: "4px 0",
//                     cursor: "pointer"
//                   }}
//                 >
//                   {item}
//                 </div>
//               ))}
//             </div>
//             {logout}
//           </div>
//         );
//       }}
//       onCollapse={(collapsed) => setCollapsed(collapsed)}
//     />
//   );
// };

// export default Sidebar;

const Title = ({ collapsed }: { collapsed: boolean }) => {
  return (
    <ThemedTitleV2
      collapsed={collapsed}
      text="Refine"
      icon={<> g</>}
      wrapperStyles={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
        // backgroundColor: "#158012",
      }}
    />
  );
};

const Sidebar = () => {
  // const si = useSiderVisible()

  const [sitems, setSitems] = useState([] as any);
  const [nsitems, setNSitems] = useState([] as any);

  const location = useLocation();
  const { menuItems } = useMenu();
  const currentResource = useResource();

  console.log("menuItems", menuItems,currentResource);

  return (
    <div>
      <ThemedSiderV2
        Title={({ collapsed }) => <Title collapsed={collapsed} />}
        render={({ items, logout, collapsed }) => {
          // console.log("items", items.keys, location.pathname);
          useEffect(() => {
            const nonSettingsItems = [];
            const settingsItems = [];
            for (let i = 0; i < items.length; i++) {
              // console.log("items[i].key", items[i].props.resource ,currentResource.identifier);
              if (items[i].key == "/settings") {
                settingsItems.push(items[i]);
              } else {
                nonSettingsItems.push(items[i]);
              }
            }
            setSitems(settingsItems);
            setNSitems(nonSettingsItems);
          }, []);
          return (
            <div className="h-full p-0">
              <div className="w-[100%] flex justify-center text-white text-sm">
                Menu
              </div>
              <div className="w-[100%] flex flex-col items-center  p-2">
                {nsitems.map((item: any, index: number) => (
                  <div
                    key={index}
                    className={`w-[100%] flex justify-start bg-[]
                  ${item.props.resource == currentResource.identifier ? "border-l-[6px]  px-4 border-l-[orange] text-[orange]" : "transparent text-[white]"}`
                  }>
                    {item}
                  </div>
                ))}
              </div>
              {nsitems.length > 0 && (
                <hr
                  style={{
                    backgroundColor: "white",
                    padding: "1px",
                    margin: "0 auto",
                    width: "80%",
                    borderRadius: "2px",
                  }}
                />
              )}
              <div className="w-[100%] flex flex-col p-4">
                {sitems.map((item: any, index: number) => (
                  <div
                    key={index}
                    className={`w-[100%] flex justify-center items-center
                 `}>
                    {item}
                  </div>
                ))}
              </div>
              {/* {logout} */}
            </div>
            // <>{items}</>
          );
        }}
      />
    </div>
  );
};

export default Sidebar;
