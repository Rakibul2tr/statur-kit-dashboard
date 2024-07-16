import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://stage-api.fikefit.com'
  }),
  tagTypes: ['UserList'],
  endpoints: builder => ({
    //****************************** suer authentication start ********************* */
    //========= user Register api============
    // userRegister: builder.mutation({
    //   query: data => ({
    //     url: '/api/users/signup/',
    //     method: 'POST',
    //     body: data
    //   })
    // }),

    //=============User login api==============
    loginUser: builder.mutation({
      query: data => ({
        url: '/api/users/login/',
        method: 'POST',
        body: { email: data.email, password: data.password }
      })
    }),

    //===============User logOut api==============
    // userLogOut: builder.mutation({
    //   query: data => ({
    //     url: '/user-logout',
    //     method: 'POST',
    //     headers: {
    //       authorization: `Bearer ${data.token}`
    //     }
    //   })
    // }),

    //************************** user authentication end ************************* */

    //============== users data Get api===============
    alllUsersDataGet: builder.query({
      query: ({ token }) => ({
        url: '/api/users/',
        method: 'GET',
        headers: {
          authorization: `token ${token}`
        },
        transformResponse: (response, meta, arg) => response.data,

        // Pick out errors and prevent nested properties in a hook or selector
        transformErrorResponse: (response, meta, arg) => response.status,
        providesTags: (result, error, id) => [{ type: 'UserList', id }]
      })
    }),

    //============== personal user  Get me api===============
    // personalUserGet: builder.query({
    //   query: ({ token }) => ({
    //     url: '/api/users/me',
    //     method: 'GET',
    //     headers: {
    //       authorization: `token ${token}`
    //     }
    //   })
    // }),

    //============== user update api===============
    updateUser: builder.mutation({
      query: ({ token, formData, id }) => ({
        url: `/api/users/${id}`,
        method: 'PATCH',
        headers: {
          authorization: `token ${token}`
        },
        body: formData
      })
    }),

    //*********************** store screens api start **************** */

    //============== all product Get api===============

    allProduct: builder.query({
      query: ({ token }) => ({
        url: `/api/products/`,
        method: 'GET',
        headers: {
          authorization: `token ${token}`
        }
      })
    }),

    //===============product add  api==============

    createProduct: builder.mutation({
      query: ({ token, formData }) => ({
        url: '/api/products/',
        method: 'POST',
        headers: {
          authorization: `token ${token}`
        },
        body: formData
      })
    }),

    //===============Product single update api==============

    updateProduct: builder.mutation({
      query: ({ token, formData, id }) => ({
        url: `/api/products/${id}/`,
        method: 'PATCH',
        headers: {
          authorization: `token ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
    }),

    //===============delete single product api==============

    deleteProduct: builder.mutation({
      query: ({ token, id }) => ({
        url: `/api/products/${id}/`,
        method: 'DELETE',
        headers: {
          authorization: `token ${token}`
        }
      })
    }),

    //===============get Product category api==============Done

    productCategory: builder.query({
      query: ({ token }) => ({
        url: `/api/product-categories/`,
        method: 'GET',
        headers: {
          authorization: `token ${token}`
        }
      })
    }),

    //===============create Product category api==============Done

    createProductCategory: builder.mutation({
      query: ({ token, categoryData }) => ({
        url: `/api/product-categories/`,
        method: 'POST',
        headers: {
          authorization: `token ${token}`
        },
        body: categoryData
      })
    }),

    //===============update Product category api==============

    updateProductCategory: builder.mutation({
      query: ({ token, updateData, id }) => ({
        url: `/api/product-categories/${id}/`,
        method: 'PATCH',
        headers: {
          authorization: `token ${token}`,
          'Content-Type': 'application/json'
        },
        body: updateData
      })
    }),

    //===============delete product category  api==============

    deleteCategory: builder.mutation({
      query: ({ token, id }) => ({
        url: `/api/product-categories/${id}/`,
        method: 'DELETE',
        headers: {
          authorization: `token ${token}`
        }
      })
    }),

    //************************** program screens api start ************************** */
    //============== program data Get api===============
    programDataGet: builder.query({
      query: data => ({
        url: '/api/programs/',
        method: 'GET',
        headers: {
          authorization: `token ${data?.token}`
        }
      })
    }),

    //===============program create api==============

    programCreate: builder.mutation({
      query: ({ token, sendFormData }) => ({
        url: `/api/products/`,
        method: 'POST',
        headers: {
          authorization: `token ${token}`
        },
        body: sendFormData
      })
    }),

    //============== program data Get api===============
    updateProgramData: builder.mutation({
      query: data => ({
        url: `/api/programs/${data.id}/`,
        method: 'PATCH',
        headers: {
          authorization: `token ${data?.token}`
        },
        body: data.formData
      })
    }),

    deleteProgram: builder.mutation({
      query: ({ token, id }) => ({
        url: `/api/programs/${id}/`,
        method: 'DELETE',
        headers: {
          authorization: `token ${token}`
        }
      })
    }),

    //============== program details Get api===============

    programDetails: builder.query({
      query: data => ({
        url: `/api/programs/${data.id}`,
        method: 'GET',
        headers: {
          authorization: `token ${data?.token}`
        }
      })
    }),

    //============== program details Get api===============

    programContent: builder.query({
      query: data => ({
        url: `/api/program-contents/`,
        method: 'GET',
        headers: {
          authorization: `token ${data?.token}`
        }
      })
    })
  })
})

export const {
  // authentication start======
  useLoginUserMutation,
  useUserOtpVerifyMutation,
  useUserOtpResendMutation,
  useUserRegisterMutation,
  useUserLogOutMutation,
  useForgotPasswordMutation,
  useNewPasswordMutation,

  //====== authentication end======

  //========== users start==========
  useAlllUsersDataGetQuery,
  useUpdateUserMutation,
  usePersonalUserGetQuery,

  //===== program screens start======
  useProgramDataGetQuery,
  useProgramCreateMutation,
  useUpdateProgramDataMutation,
  useDeleteProgramMutation,

  //program content api
  useProgramContentQuery,

  //========= product Api start==========
  useCreateProductMutation,
  useUpdateProductMutation,
  useAllProductQuery,
  useDeleteProductMutation,

  //============ product category api=====
  useCreateProductCategoryMutation,
  useUpdateProductCategoryMutation,
  useProductCategoryQuery,
  useDeleteCategoryMutation
} = apiSlice
