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

        getStoreByEmail: builder.query({
            query: (data) => ({
                url: `/store/stores/${data.sendEmail}`,
                method: 'GET',
            })
        }),

        deleteStoreByEmail: builder.query({
            query: (data) => ({
                url: `/store/stores/${data.sendEmail}`,
                method: 'DELETE',
            })
        }),

        getAllStoresCount: builder.query({
            query: () => ({
                url: `/store/getAllStoreCount`,
                method: 'GET',
            })
        }),

        updateStoreData: builder.mutation({
            query: ({ email, dataToUpdate }) => ({
                url: `/store/stores/${email}`,
                method: 'PATCH',
                body: dataToUpdate,
            })
        })

    })
})

export const { useUploadImageMutation, useUpdateStoreDataMutation, useCreateStoreMutation, useLazyGetStoreByCityAndCategoryQuery, useLazyDeleteStoreByEmailQuery, useLazyGetStoreByEmailQuery, useGetAllStoresCountQuery } = storeSlice;