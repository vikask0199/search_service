import { apiSlice } from "../../app/api/apiSlice";


const categorySlice = apiSlice.injectEndpoints({
    
    endpoints: (builder) => ({

        createCategory: builder.mutation({
            query: (body: { name: string }) => ({
                url: '/category/createCategory',
                method: 'POST',
                body: body
            }),
        }),

        getAllCategory: builder.query({
            query: () => ({
                url: '/category/get-all-category',
                method: 'GET'
            })
        }),


        getCount: builder.query({
            query: () => ({
                url: '/category/getAllCategoryCount',
                method: 'GET'
            })
        })
    }),
})


export const { useCreateCategoryMutation, useGetAllCategoryQuery, useGetCountQuery } = categorySlice