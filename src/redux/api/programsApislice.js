import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const programsApislice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://stage-api.fikefit.com'
  }),
  endpoints: builder => ({
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

    //===============program create api==============

    programCreate: builder.mutation({
      query: ({ token, formData }) => ({
        url: `/api/products/`,
        method: 'POST',
        headers: {
          authorization: `token ${token}`
        },
        body: formData
      })
    })
  })
})

export const {
  // program screens start======
  useProgramDataGetQuery,
  useProgramDetailsQuery,
  useProgramCreateMutation,
  useUpdateProgramDataMutation
} = programsApislice
