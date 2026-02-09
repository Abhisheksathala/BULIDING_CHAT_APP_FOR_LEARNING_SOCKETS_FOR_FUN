import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { server } from "../../constants/config";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${server}/api/v1/`,
  }),
  tagTypes: ["Chat","user"],
  endpoints: (builder) => ({
    // -----my chat
    myChats: builder.query({
      query: () => ({
        url: "chat/my-chats",
        credentials: "include",
      }),
      providesTags: ["Chat"],
    }),
    // -----search
    searchUser: builder.query({
      query: (name) => ({
        url: `user/searchuser?name=${name}`,
        credentials: "include",
      }),
      providesTags: ["user"],
    }),
    // ----send request 
    sendFriendRequest:builder.mutation({
      query:(data)=>({
        url:`user/sendrequest`,
        method:"Put",
        credentials:"include",
        body:data
      }),
      invalidatesTags:["user"]
    }),

    // ----get notifications
    getnotifications:builder.query({
      query:()=>({
        url:`user/get-notification`,
        credentials:"include",
      }),
      keepUnusedDataFor:0
    }),

    // acceptFriendReuest 

    acceptFriendRequest: builder.mutation({
      query:(data)=>({
        url:"user/accept-request",
        method:"Put",
        credentials:"include",
        body:data
      }),
      invalidateTags:["Chat"]
    })

    // invalidateTags:["Chat"]
  }),
});

export default api;

console.log(api);

export const { useMyChatsQuery , useLazySearchUserQuery,useSendFriendRequestMutation,useGetnotificationsQuery ,useAcceptFriendRequestMutation} = api;
