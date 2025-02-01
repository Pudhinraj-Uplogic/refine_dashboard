"use client";
// import { useNotification, type DataProvider } from "@refinedev/core";
import axios from "axios";

import { DataProvider, HttpError } from "@refinedev/core";
import { API_URL } from "../utils/Constants";
// import { TOKEN_KEY } from "./authProvider";
const domain_name = localStorage.getItem('sub_domain_name') ? localStorage.getItem('sub_domain_name'):"";
// import { useNavigate } from "react-router-dom";

interface ErrorResponse {
  statusCode: any;
  message: string;
}

const TOKEN_KEY = '';

// const { list } = useNavigation()

// const navigation = useNavigate()

// const { open } = useNotification();
export const dataProvider: DataProvider = {
  getOne: async ({ resource, id, meta }) => {
    console.log(resource, id);
    const token = localStorage.getItem(TOKEN_KEY);
    // const { list } = useNavigation();

    const createdby = localStorage.getItem("id") ? localStorage.getItem("id") : 0

    try{
      const response = await axios.get(`${API_URL}/${resource}/show/${id}`, {
        headers: {
          "domainName":domain_name,
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "true",
          "createdby":createdby,
          "created_by":createdby

        },
        // params:{
        //   created_by: localStorage.getItem("id")
        // }
      });
      console.log("resssss", response);
      const data = response.data.data;

      return { data };
    }
    catch(error:any){

      const errorMs: HttpError = {
        message: error?.response?.data?.message || error.message || "Not Found !",
        statusCode: error?.status || 500,
        resource: "",
      };

      console.log("error error ",errorMs.message,resource)

      return Promise.reject(errorMs);
      //  window.location.assign('/not-found')
    }
  },
  update: async ({ resource, id, variables }:any) => {
    variables.updated_by = localStorage.getItem('id')
    const token = localStorage.getItem(TOKEN_KEY);
    console.log("re", resource);
    try {
      const response = await axios.patch(
        `${API_URL}/${resource}/edit/${id}`,
        variables,
        {
          headers: {
            "domainName":domain_name,
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true",
          },
        }
      );
      if (!response.data.success) throw new Error(response.data.message);
      const data = response.data.data;
      console.log(data, "datadatadata");
      return { data };
    } catch (error: any) {
      // console.log(error);
      const errorMs: HttpError = {
        message: error?.response?.data?.message || error.message || "Something went wrong",
        statusCode: error?.status || 500,
        resource: "",
      };
      return Promise.reject(errorMs);
    }
  },
  getList: async ({ resource, pagination, filters, sorters, meta }:any) => {
    const token = localStorage.getItem(TOKEN_KEY);

    filters.push({
      field: "created_by",
      operator: "eq",
      value: localStorage.getItem('id'),
    })

    console.log("re", {
      resource: resource,
      pagination: pagination,
      filters: filters,
      sorters: sorters,
      meta: meta,
    });

    // let created_by = localStorage.getItem('role') == '3' ? 0 : Number(localStorage.getItem('id'))

    const response = await axios.post(
      `${API_URL}/${resource}/list`,
      {
        resource: resource,
        pagination: pagination,
        filters: filters,
        sorters: sorters,
        meta: meta,
      },
      {
        headers: {
          "domainName":domain_name,
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "true",
          // "created_by":created_by
        },
      }
    );

    if (response.status < 200 || response.status > 299) throw response;
    const data = await response.data.data.rows;
    const count = await response.data.data.count;
    console.log(data, "datadatadata", response);
    return {
      data,
      total: count,
    };
  },
  listWithoutPagination: async ({
    resource,
    pagination,
    filters,
    sorters,
    meta,
  }) => {
    const token = localStorage.getItem(TOKEN_KEY);
    console.log("re", {
      resource: resource,
      pagination: pagination,
      filters: filters,
      sorters: sorters,
      meta: meta,
    });
    const response = await axios.post(
      `${API_URL}/${resource}/listWithoutPagination`,
      {
        resource: resource,
        pagination: pagination,
        filters: filters,
        sorters: sorters,
        meta: meta,
      },
      {
        headers: {
          "domainName":domain_name,
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "true",
        },
      }
    );

    if (response.status < 200 || response.status > 299) throw response;
    const data = await response.data.data.rows;
    const count = await response.data.data.count;
    // console.log(data, "datadatadata", response);
    return {
      data,
      total: count,
    };
  },
  create: async ({ resource, variables }:any) => {
    console.log("re", resource, variables);

    // const val = variables

    variables.created_by = localStorage.getItem('id')
    variables.updated_by = localStorage.getItem('id')
    const token = localStorage.getItem(TOKEN_KEY);
    try {
      const response = await axios.post(
        `${API_URL}/${resource}/create`,
        variables,
        {
          headers: {
            "domainName":domain_name,
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true",
          },
        }
      );
      console.log(response.data.success, "status");

      // if (!response.data.success) {
      //   throw new Error(response.data.message);
      // }
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      const data = await response.data.data;
      return { data };
    } catch (error: any) {
      // console.log("errrrrrrrrrrrrrrrrrrr", error.message, error.response);
      const errorMs: HttpError = {
        message:
          error?.response?.data?.message ||
          error?.message ||
          "Something went wrong",
        statusCode: error?.status || 500,
        resource: "",
      };
      return Promise.reject(errorMs);

      // let err = {
      //   message:
      //     (error.response && error?.response?.data?.message) || error?.message,
      //   resource: resource,
      // };
      // console.log(
      //   // error,
      //   "---------- log --------",
      //   err
      // );

      // throw err;
    }
  },
  deleteOne: async ({ resource, id }) => {
    const token = localStorage.getItem(TOKEN_KEY);
    try {
      // http://localhost:4000/api/admin_users/delete/3
      const response = await axios.delete(
        `${API_URL}/${resource}/delete/${id}`,
        {
          headers: {
            "domainName":domain_name,
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true",
          },
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      const data = response.data.data;
      return { data };
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  apiCall: async (resource = "", params = {}, method = "POST") => {
    const token = localStorage.getItem(TOKEN_KEY);
    console.log(resource, "resourceresourceresource");
    try {
      const response = await fetch(`${API_URL}/${resource}`, {
        // Replace with your API endpoint
        method: method, // Use POST method
        headers: {
          "Content-Type": "application/json", // Specify that the body is JSON
          Authorization: `Bearer ${token}`,
          "domainName":domain_name,
        },
        body: JSON.stringify(params), // Convert the data object to JSON format
      });
      const data = await response.json();
      console.log(data, "datadata");
      return data;
    } catch (error) {
      console.error("Error during API call:", error);
      return { success: false, data: {} };
    }
  },
  getApiUrl: function (): string {
    return API_URL;
  },
};
