import { CreateButton, ExportButton, List } from '@refinedev/antd'
import React, { useState } from 'react'
import { CustomTable } from './Table';
import { useGo, useNavigation } from '@refinedev/core';
import { useLocation } from 'react-router';
import { FilterOutlined, SearchOutlined } from '@ant-design/icons';
import { colorYellow, primaryColor } from '../../../utils/Color';
import { Input } from 'antd';
import { dataProvider } from '../../../Provider/dataProvider';

const CustomGrid = (tableData: any) => {

  const { setFilters } = tableData;
  const { createUrl } = useNavigation();
  const { pathname } = useLocation();
  const go = useGo();

  const [filterEnable, setfilterEnable] = useState(false);

  const handleExport = async () => {
    try {
      // Fetch data with filters, sorters, and pagination
      const { data } = await dataProvider.getList<IUser>({
        resource: tableData.resource,
        filters: tableData.filters,
        sorters: tableData.sorters,
        pagination: {},
      });


      // Transform data using mapData function
      const exportData = data.map((item) => {
        return tableData.dableDetails
          .map((column: any) => {
            if (column.export) {
              let value = item[column.name];
              if (column.type === "label") {
                const option = column.labelOption.find(
                  (opt: any) => opt.value === value
                );
                value = option ? option.label : value;
              }
              return { [column.heading]: value };
            }
            return null;
          })
          .reduce((acc, obj) => ({ ...acc, ...obj }), {});
      });

      // Create a worksheet and workbook
      const ws = XLSX.utils.json_to_sheet(exportData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

      // Export the workbook
      const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      saveAs(
        new Blob([wbout], { type: "application/octet-stream" }),
        tableData.resource + ".xlsx"
      );
    } catch (error) {
      console.log("Export error: ", error);
    }
  };

  const handleSearch = (value: any) =>{ 
    const { searchFileds } = tableData;
    if(searchFileds && searchFileds.length){
      const search = searchFileds.map((f: any) => { return {...f, value: value}});
      console.log(search, 'sh');
      setFilters(search)
    }
  }

  return (
     <List
      breadcrumb={false}
      headerButtons={(props) =>
        [
          !tableData.disableCreate && (
            <CreateButton
              style={{
                backgroundColor: primaryColor,
              }}
              {...props.createButtonProps}
              key="create"
              size="middle"
              onClick={() => {
                return go({
                  to: `${createUrl(tableData.resource)}`,
                  query: {
                    to: pathname,
                  },
                  options: {
                    keepQuery: true,
                  },
                  type: "replace",
                });
              }}
            >
              {tableData?.createButtonText}
            </CreateButton>
          ),
          !tableData.disableFilter && (
            <CreateButton
              style={{
                backgroundColor: colorYellow,
              }}
              {...props.createButtonProps}
              key="filteroption"
              size="middle"
              icon={<FilterOutlined />}
              onClick={() => {
                setfilterEnable(!filterEnable);
              }}
            >
              {tableData?.filtertext}
            </CreateButton>
          ),
          !tableData.disableExport && (
            <ExportButton
              key="export"
              onClick={handleExport}
              loading={false}
              size="middle"
            />
          ),
        ].filter(Boolean)
      } 
      title={
        !tableData.disableSearch && 
          <Input
            placeholder="Search..."
            prefix={<SearchOutlined style={{marginRight: '10px'}}/>}
            style={{ width: 250 }}
            allowClear
            onChange={(e) => handleSearch(e.target.value)}
          />   
      }
    >
     <CustomTable  
      {...tableData}
      filterEnable={filterEnable}
      setFilterEnable={setfilterEnable}
     />
      
    </List>
  )
}

export default CustomGrid