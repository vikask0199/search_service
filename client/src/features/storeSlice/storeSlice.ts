import { apiSlice } from "../../app/api/apiSlice";





const storeSlice = apiSlice.injectEndpoints({

    endpoints: (builder) => ({
        createStore: builder.mutation({
            query: (body) => {
                return {
                    url: '/store/createstores',
                    method: 'POST',
                    body: body
                }
            }
        }),
        uploadImage: builder.mutation({
            query: (formData) => ({
                url: '/file/upload-image',
                method: 'POST',
                body: formData,
            }),
        }),

        getStoreByCityAndCategory: builder.query({
            query: (data) => ({
                    url: `/store/stores?category=${data.category}&city=${data.city}&page=${data.page}`,
                    method: 'GET',
            })
        }),

    })
})

export const { useUploadImageMutation, useCreateStoreMutation, useLazyGetStoreByCityAndCategoryQuery } = storeSlice;