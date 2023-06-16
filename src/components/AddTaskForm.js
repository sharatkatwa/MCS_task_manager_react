import { useState } from 'react'
import { useCreateTaskMutation } from '../store'

const AddTaskForm = () => {
  const [createTask, results] = useCreateTaskMutation()

  // console.log(results)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  // const [showMessage, setShowMessage] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    createTask({ title, description })
    setTitle('')
    setDescription('')
  }
  let message
  if (results.isSuccess) {
    message = (
      <div className='text-xl text-green-600'>Task added successfully</div>
    )
  }
  if (results.error) {
    message = (
      <div className='text-xl text-red-600'>{results.error.data.error}</div>
    )
  }
  return (
    <div className='flex flex-col border px-5 py-5  my-10 mx-10 rounded shadow'>
      <form onSubmit={onSubmit}>
        <div className='w-full flex items-center justify-between border-b-2 border-gray-300 mb-7'>
          <div className='text-2xl'>Task Details</div>
          <div className='mb-4 border w-fit px-3 py-2 bg-blue-700 rounded'>
            <button className='text-white'>Add Task</button>
          </div>
        </div>
        <div className='flex flex-col mb-4 w-full'>
          <label htmlFor='title' className='text-xl'>
            title (max: 100)
          </label>
          <input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            className='border border-gray-300 bg-gray-100 rounded w-full shadow p-2'
            type='text'
            maxLength={100}
            id='title'
          />
        </div>
        <div className='flex flex-col mb-4 w-full'>
          <label htmlFor='description' className='text-xl'>
            Description
          </label>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            rows={3}
            className='border border-gray-300 bg-gray-100 rounded w-full shadow p-2'
            type='textarea'
            id='description'
          />
        </div>
      </form>
      <div className='flex justify-center'>{message}</div>
    </div>
  )
}

export default AddTaskForm
