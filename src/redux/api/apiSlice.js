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
    //****************** program screens api start ******************* */
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

    //********************** program screens api end ******************* */

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

    //===============Product single update api==============

    updateProduct: builder.mutation({
      query: ({ token, formData }) => ({
        url: `/api/product-categories/`,
        method: 'PATCH',
        headers: {
          authorization: `token ${token}`
        },
        body: formData
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
        },
        body: formData
      })
    })

    // body: {
    // category: data.formData.category,
    // description: data.formData.description,
    // features: data.formData.features,
    // photo_url: data.formData.photo_url,
    // price: data.formData.price,
    // stock: data.formData.stock,
    // title: data.formData.title,
    // tex_percentage: data.formData.tex_percentage
    // }

    //===============user information update api==============

    // userInfoUpdate: builder.mutation({
    //   query: (data) => ({
    //     url: "/update-user-profile",
    //     method: "POST",
    //     headers: {
    //       authorization: `Bearer ${data.userInfo._token}`,
    //     },
    //     body: {
    //       email: data.userInfo.user_email,
    //       user_category_id: data.user_category_id,
    //     },
    //   }),
    // }),

    //============== first Screen Post data Get api===============
    // getFirstScreenPost: builder.query({
    //   query: (data) => ({
    //     url: "/posts",
    //     method: "GET",
    //     headers: {
    //       authorization: `Bearer ${data._token}`,
    //     },
    //   }),
    // }),
    //============== second Screen Post data Get api===============
    // getSecondScreenPost: builder.query({
    //   query: (data) => ({
    //     url: "/secondaryposts",
    //     method: "GET",
    //     headers: {
    //       authorization: `Bearer ${data._token}`,
    //     },
    //   }),
    // }),

    // getItem: builder.query({
    //     query: (id) => `/gatting/${id}`,
    // }),
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

  // program screens start======
  useProgramDataGetQuery,

  // product start
  useCreateProductMutation,
  useUpdateProductMutation,

  // product category
  useCreateProductCategoryMutation,
  useUpdateProductCategoryMutation
} = apiSlice
