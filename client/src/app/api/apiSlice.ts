
import { BaseQueryApi, createApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { logout } from '../../features/authSlice/authSlice';



const baseQuery = fetchBaseQuery({
  baseUrl: `https://search-service.onrender.com/`,
  credentials: 'include',
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('token');;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  }
});

const baseQueryWithReauth = async (args: FetchArgs, api: BaseQueryApi, extraOptions?: unknown): Promise<any> => {
  const result = await baseQuery(args, api, extraOptions as unknown as {});
  if (result?.error) {
    const errorResponse = result.error as any;

    if (errorResponse.status === "jwt expired" || result.error.status === 501) {
      api.dispatch(logout());
      return result;
    } else if (errorResponse.status === 'FETCH_ERROR') {
      return result;
    } else {
      // window.alert(errorResponse.data.message);
      return result;
    }
  }
  return result;
};


export const apiSlice = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});




