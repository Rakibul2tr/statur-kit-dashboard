import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://stage-api.fikefit.com'
  }),

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
      query: ({ email, password }) => ({
        url: '/api/users/login/',
        method: 'POST',
        body: { email: email, password: password }
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

    //==============Get all product api===============

    allProduct: builder.query({
      query: ({ token }) => ({
        url: `/api/products/`,
        method: 'GET',
        headers: {
          authorization: `token ${token}`
        }
      })
    }),

    //===============Create a product  api==============

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

    //===============update a Product api==============

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

    //===============delete a product api==============

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
      query: ({ token, formData }) => ({
        url: `/api/product-categories/`,
        method: 'POST',
        headers: {
          authorization: `token ${token}`
        },
        body: formData
      })
    }),

    //===============update Product category api==============

    updateProductCategory: builder.mutation({
      query: ({ token, formData, id }) => ({
        url: `/api/product-categories/${id}/`,
        method: 'PATCH',
        headers: {
          authorization: `token ${token}`,
          'Content-Type': 'application/json'
        },
        body: formData
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
    //==============Get all program data api===============
    programDataGet: builder.query({
      query: data => ({
        url: '/api/programs/',
        method: 'GET',
        headers: {
          authorization: `token ${data?.token}`
        }
      })
    }),

    //===============Create a program api==============

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

    //============== update a program api===============
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

    // ==============delete a program api ==============
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

    //************************** program content api start ************************** */
    //==============Get program content api===============

    programContent: builder.query({
      query: data => ({
        url: `/api/program-contents/`,
        method: 'GET',
        headers: {
          authorization: `token ${data?.token}`
        }
      })
    }),

    //==============create program content api===============

    createProgramContent: builder.mutation({
      query: ({ data, token }) => ({
        url: `/api/program-contents/`,
        method: 'POST',
        headers: {
          authorization: `token ${token}`
        },
        body: data
      })
    }),

    //==============update program content api===============

    updateProgramContent: builder.mutation({
      query: data => ({
        url: `/api/program-contents/${data.id}/`,
        method: 'PATCH',
        headers: {
          authorization: `token ${data?.token}`
        },
        body: data.formData
      })
    }),

    //===============delete a program content  api==============

    deleteProgramContent: builder.mutation({
      query: ({ token, id }) => ({
        url: `/api/program-contents/${id}/`,
        method: 'DELETE',
        headers: {
          authorization: `token ${token}`
        }
      })
    }),

    //************************** program particular content api start ************************** */
    //==============Get program particular content api===============

    programParticular: builder.query({
      query: data => ({
        url: `/api/content-particulars/`,
        method: 'GET',
        headers: {
          authorization: `token ${data?.token}`
        }
      })
    }),

    //==============create program particular content api===============

    createProgramParticular: builder.mutation({
      query: ({ data, token }) => ({
        url: `/api/content-particulars/`,
        method: 'POST',
        headers: {
          authorization: `token ${token}`
        },
        body: data
      })
    }),

    //==============update program particular content api===============

    updateProgramParticular: builder.mutation({
      query: data => ({
        url: `/api/program-contents/${data.id}`,
        method: 'PATCH',
        headers: {
          authorization: `token ${data?.token}`
        },
        body: data.formData
      })
    }),

    //===============delete a program particular content  api==============

    deleteProgramParticular: builder.mutation({
      query: ({ token, id }) => ({
        url: `/api/content-particulars/${id}/`,
        method: 'DELETE',
        headers: {
          authorization: `token ${token}`
        }
      })
    }),

    //*********************** diet screens api start **************** */

    //==============Get all Diet Category api===============

    allDietCategory: builder.query({
      query: ({ token }) => ({
        url: `/api/products/`,
        method: 'GET',
        headers: {
          authorization: `token ${token}`
        }
      })
    }),

    //===============Create a Diet Category  api==============

    createDietCategory: builder.mutation({
      query: ({ token, formData }) => ({
        url: '/api/products/',
        method: 'POST',
        headers: {
          authorization: `token ${token}`
        },
        body: formData
      })
    }),

    //===============update a Diet Category api==============

    updateDietCategory: builder.mutation({
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

    //===============delete a Diet Category api==============

    deleteDietCategory: builder.mutation({
      query: ({ token, id }) => ({
        url: `/api/products/${id}/`,
        method: 'DELETE',
        headers: {
          authorization: `token ${token}`
        }
      })
    }),

    //==============Get all Diet api===============

    allDietList: builder.query({
      query: ({ token }) => ({
        url: `/api/products/`,
        method: 'GET',
        headers: {
          authorization: `token ${token}`
        }
      })
    }),

    //===============Create a Diet  api==============

    createDiet: builder.mutation({
      query: ({ token, formData }) => ({
        url: '/api/products/',
        method: 'POST',
        headers: {
          authorization: `token ${token}`
        },
        body: formData
      })
    }),

    //===============update a Diet api==============

    updateDiet: builder.mutation({
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

    //===============delete a Diet api==============

    deleteDiet: builder.mutation({
      query: ({ token, id }) => ({
        url: `/api/products/${id}/`,
        method: 'DELETE',
        headers: {
          authorization: `token ${token}`
        }
      })
    }),

    //*********************** body part screens api start **************** */

    //==============Get all body part Category api===============

    allBodyPartCategory: builder.query({
      query: ({ token }) => ({
        url: `/api/products/`,
        method: 'GET',
        headers: {
          authorization: `token ${token}`
        }
      })
    }),

    //===============Create a body part Category  api==============

    createBodyPartCategory: builder.mutation({
      query: ({ token, formData }) => ({
        url: '/api/products/',
        method: 'POST',
        headers: {
          authorization: `token ${token}`
        },
        body: formData
      })
    }),

    //===============update a body part Category api==============

    updateBodyPartCategory: builder.mutation({
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

    //===============delete a body part Category api==============

    deleteBodyPartCategory: builder.mutation({
      query: ({ token, id }) => ({
        url: `/api/products/${id}/`,
        method: 'DELETE',
        headers: {
          authorization: `token ${token}`
        }
      })
    }),

    //==============Get all body part api===============

    allBodyPartList: builder.query({
      query: ({ token }) => ({
        url: `/api/products/`,
        method: 'GET',
        headers: {
          authorization: `token ${token}`
        }
      })
    }),

    //===============Create a body part  api==============

    createBodyPart: builder.mutation({
      query: ({ token, formData }) => ({
        url: '/api/products/',
        method: 'POST',
        headers: {
          authorization: `token ${token}`
        },
        body: formData
      })
    }),

    //===============update a body part api==============

    updateBodyPart: builder.mutation({
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

    //===============delete a body part api==============

    deleteBodyPart: builder.mutation({
      query: ({ token, id }) => ({
        url: `/api/products/${id}/`,
        method: 'DELETE',
        headers: {
          authorization: `token ${token}`
        }
      })
    })

    //===============get Product category api==============Done
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
  useCreateProgramContentMutation,
  useUpdateProgramContentMutation,
  useDeleteProgramContentMutation,

  //program particular content api
  useProgramParticularQuery,
  useCreateProgramParticularMutation,
  useUpdateProgramParticularMutation,
  useDeleteProgramParticularMutation,

  //========= store screen Api ==========
  useCreateProductMutation,
  useUpdateProductMutation,
  useAllProductQuery,
  useDeleteProductMutation,
  useCreateProductCategoryMutation,
  useUpdateProductCategoryMutation,
  useProductCategoryQuery,
  useDeleteCategoryMutation,

  //================= diet screen api =======
  useAllDietCategoryQuery,
  useCreateDietCategoryMutation,
  useUpdateDietCategoryMutation,
  useDeleteDietCategoryMutation,
  useAllDietListQuery,
  useCreateDietMutation,
  useUpdateDietMutation,
  useDeleteDietMutation,

  //================= body part screen api
  useAllBodyPartCategoryQuery,
  useCreateBodyPartCategoryMutation,
  useUpdateBodyPartCategoryMutation,
  useDeleteBodyPartCategoryMutation,
  useAllBodyPartListQuery,
  useCreateBodyPartMutation,
  useUpdateBodyPartMutation,
  useDeleteBodyPartMutation
} = apiSlice
