import { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { useUpdateTaskMutation } from '../store'

const UpdateTaskModal = ({ onClose, item }) => {
  const [updateTask, results] = useUpdateTaskMutation()

  const [title, setTitle] = useState(item.title)
  const [description, setDescription] = useState(item.description)
  const [isCompleted, setIsCompleted] = useState(item.isCompleted)

  useEffect(() => {
    document.body.classList.add('overflow-hidden')
    return () => {
      document.body.classList.remove('overflow-hidden')
    }
  }, [])

  const handleSumbit = (e) => {
    e.preventDefault()

    updateTask({ title, description, isCompleted, _id: item._id })
    onClose()
  }

  return ReactDOM.createPortal(
    <div>
      <div
        onClick={onClose}
        className='fixed inset-0 bg-black opacity-50'
      ></div>
      <div className='fixed p-10 bg-white inset-y-28 inset-x-10 sm:inset-28 md:inset-x-40 md:inset-y-40 rounded-md'>
        <div className='w-full flex items-center justify-start border-b-2 border-gray-300 mb-7'>
          <div className='text-2xl'>Update Task</div>
        </div>
        <form onSubmit={handleSumbit}>
          <div className='flex flex-col justify-start'>
            <div className='flex flex-col mb-4 w-full'>
              <label htmlFor='title' className='text-xl'>
                title
              </label>
              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className='border border-gray-300 bg-gray-100 rounded w-full shadow p-2'
                type='text'
                maxLength={50}
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
            <div className='text-xl flex items-center'>
              Completed
              <input
                className='ml-3 w-6 h-6 border-0 rounded-md focus:ring-0'
                checked={isCompleted}
                onChange={() => setIsCompleted(!isCompleted)}
                type='checkbox'
              />
            </div>
            <div className='flex justify-end mt-10'>
              <div className='mb-4 border w-fit px-3 py-2 bg-blue-700 rounded'>
                <button className='text-white'>Save</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>,
    document.querySelector('.modal-container')
  )
}

export default UpdateTaskModal
