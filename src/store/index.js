import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { taskApi } from './apis/TaskApi'

export const store = configureStore({
  reducer: {
    [taskApi.reducerPath]: taskApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(taskApi.middleware)
  },
})
setupListeners(store.dispatch)

export {
  useFetchTasksQuery,
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} from './apis/TaskApi'
