import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://api.escuelajs.co/api/v1"
    }),
    endpoints: (builder) => ({
        loginUser: builder.mutation({
            query:( body: {email:string; password:string}) => {
                return{
                    url: "/auth/login",
                    method: "post",
                    body
                }
            },
        }),
        registerUser: builder.mutation({
            query:( body: {email:string; password:string; name: string; avatar: string}) => {
                return{
                    url: "/users/",
                    method: "post",
                    body
                }
            },
        }),
    }),
})
export const { useLoginUserMutation, useRegisterUserMutation } = authApi
