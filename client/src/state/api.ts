import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetTransactionResponse, GetFundamentalResponse, GetPerformanceResponse, GetCompanyResponse, GetPortfolioResponse } from "./types";
// Redux Toolkit query

export const api = createApi({
    baseQuery: fetchBaseQuery( { baseUrl: import.meta.env.VITE_BASE_URL,  
        // provide authorization headers: { Authorization: `Bearer ${token}` },
        prepareHeaders: (headers, { getState }) => {
            headers.set('Authorization', `Bearer ${getState().auth.token}`);
            return headers;
        },
    }),
    reducerPath: "main",
    tagTypes: ["Transaction", "Performance", "Fundamental", "Company", "Portfolio"],
    endpoints: (build) => ({    
        getCompany: build.query<Array<GetCompanyResponse>, void>({
            query: () => `company/`,
            providesTags: ["Company"]
        }),
        getTransaction: build.query<Array<GetTransactionResponse>>({
            query: ( {userId} ) => `transaction/${userId}`,
            providesTags: ["Transaction"]
        }),
        getPortfolio: build.query<Array<GetPortfolioResponse>, void>({
            query: (userId) => `portfolio/${userId}`,
            providesTags: ["Portfolio"]
        }),
        getPerformance: build.query<Array<GetPerformanceResponse>, void>({
            query: (symbols) => `performance?symbols=${symbols}`, 
            providesTags: ["Performance"]
        }),
        getFundamental: build.query<Array<GetFundamentalResponse>, void>({
            query: (symbols) => `fundamental?symbols=${symbols}`, 
            providesTags: ["Fundamental"]
        })
    }),
});

export const { useGetTransactionQuery, useGetPerformanceQuery, useGetFundamentalQuery, useGetCompanyQuery, useGetPortfolioQuery } = api;

