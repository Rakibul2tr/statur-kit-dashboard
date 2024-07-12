import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://stage-api.fikefit.com'
  }),
  endpoints: builder => ({
    //****************************** suer authentication start ********************* */
    //========= user Register api============
    userRegister: builder.mutation({
      query: data => ({
        url: '/api/users/signup/',
        method: 'POST',
        body: data
      })
    }),

    //===========user Otp Verify api===============
    userOtpVerify: builder.mutation({
      query: data => ({
        url: '/api/users/email-verify/',
        method: 'POST',
        body: { activation_token: data.otpCode }
      })
    }),

    //===========user Otp resend code===============
    userOtpResend: builder.mutation({
      query: data => ({
        url: '/api/users/resend-email-activation/',
        method: 'POST',
        body: { email: data.email }
      })
    }),

    //=============User login api==============
    loginUser: builder.mutation({
      query: data => ({
        url: '/api/users/login/',
        method: 'POST',
        body: { email: data.email, password: data.password }
      })
    }),

    //===============forgot password api==============
    forgotPassword: builder.mutation({
      query: data => ({
        url: '/api/users/password/mail/',
        method: 'POST',
        body: data
      })
    }),

    //===============new password set api==============
    newPassword: builder.mutation({
      query: data => ({
        url: '/api/users/password/reset/',
        method: 'POST',
        body: data
      })
    }),

    //===============User logOut api==============
    userLogOut: builder.mutation({
      query: data => ({
        url: '/user-logout',
        method: 'POST',
        headers: {
          authorization: `Bearer ${data.token}`
        }
      })
    }),

    //************************** user authentication end ************************* */

    //============== user data Get api ===============
    // getUserData: builder.query({
    //   query: (data) => ({
    //     url: "/user-data",
    //     method: "GET",
    //     headers: {
    //       authorization: `Bearer ${data._token}`,
    //     },
    //   }),
    // }),
    //===============User password Change api==============
    // passwordChange: builder.mutation({
    //   query: (data) => ({
    //     url: "/update-user-password",
    //     method: "POST",
    //     headers: {
    //       authorization: `Bearer ${data.token}`,
    //     },
    //     body: {
    //       current_password: data.current_password,
    //       new_password: data.new_password,
    //       new_password_confirmation: data.new_password_confirmation,
    //     },
    //   }),
    // }),
    //============== users data Get api===============
    alllUsersDataGet: builder.query({
      query: ({ token }) => ({
        url: '/api/users/',
        method: 'GET',
        headers: {
          authorization: `token ${token}`
        }
      })
    }),

    //============== personal user  Get me api===============
    personalUserGet: builder.query({
      query: ({ token }) => ({
        url: '/api/users/me',
        method: 'GET',
        headers: {
          authorization: `token ${token}`
        }
      })
    }),

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

    //===============Product single update api==============

    updateProduct: builder.mutation({
      query: ({ token, formData, id }) => ({
        url: `/api/products/${id}`,
        method: 'PATCH',
        headers: {
          authorization: `token ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
    }),

    //===============Product category get api==============Done

    productCategory: builder.query({
      query: ({ token, categoryData }) => ({
        url: `/api/product-categories/`,
        method: 'GET',
        headers: {
          authorization: `token ${token}`
        },
        body: categoryData
      })
    }),

    //===============Product category update api==============Done

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

    //===============Product category update api==============

    updateProductCategory: builder.mutation({
      query: ({ token, formData, id }) => ({
        url: `/api/product-categories/${id}`,
        method: 'PATCH',
        headers: {
          authorization: `token ${token}`

          // 'Content-Type': 'application/json'
        },
        body: formData
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

  // authentication end======

  // users start
  useAlllUsersDataGetQuery,
  useUpdateUserMutation,
  usePersonalUserGetQuery,

  // program screens start======
  useProgramDataGetQuery,

  // product start
  useCreateProductMutation,
  useUpdateProductMutation,
  useAllProductQuery,

  // product category
  useCreateProductCategoryMutation,
  useUpdateProductCategoryMutation,
  useProductCategoryQuery
} = apiSlice
