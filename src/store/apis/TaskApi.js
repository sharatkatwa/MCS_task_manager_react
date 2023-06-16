import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const taskApi = createApi({
  reducerPath: 'tasks',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://mcs-task-manager-backend.onrender.com/api/v1/tasks',
  }),
  endpoints(builder) {
    return {
      fetchTasks: builder.query({
        providesTags: ['Tasks'],
        query: () => {
          return {
            url: '/',
            method: 'GET',
          }
        },
      }),
      createTask: builder.mutation({
        invalidatesTags: ['Tasks'],
        query: (task) => {
          return {
            url: '/add',
            body: {
              title: task.title,
              description: task.description,
            },
            method: 'POST',
          }
        },
      }),
      updateTask: builder.mutation({
        invalidatesTags: ['Tasks'],
        query: (task) => {
          return {
            url: `/update/${task._id}`,
            body: {
              title: task.title,
              description: task.description,
              isCompleted: task.isCompleted,
            },
            method: 'PATCH',
          }
        },
      }),
      deleteTask: builder.mutation({
        invalidatesTags: ['Tasks'],
        query: (task) => {
          return {
            url: `/delete/${task._id}`,
            method: 'DELETE',
          }
        },
      }),
    }
  },
})

export const {
  useFetchTasksQuery,
  useUpdateTaskMutation,
  useCreateTaskMutation,
  useDeleteTaskMutation,
} = taskApi

export { taskApi }
