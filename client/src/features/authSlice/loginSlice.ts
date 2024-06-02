
import { apiSlice } from "../../app/api/apiSlice";

const loginSlice = apiSlice.injectEndpoints({



    endpoints: (builder) => ({
        loginUser: builder.mutation({
            query: (body: { email: string, password: string }) => {
                return {
                    url: '/auth/user/api/v1/login',
                    method: 'POST',
                    body,
                }
            },
        }),

    })
})

export const { useLoginUserMutation } = loginSlice;