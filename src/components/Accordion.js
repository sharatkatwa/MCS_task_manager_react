import { useState } from 'react'
import {
  GoTriangleRight,
  GoTriangleDown,
  GoPencil,
  GoTrashcan,
} from 'react-icons/go'

import { useDeleteTaskMutation } from '../store'
import UpdateTaskModal from './UpdateTaskModal'

function Accordion({ items }) {
  const [expandedIndex, setExpandedIndex] = useState(-1)
  const [deleteTask, deleteResults] = useDeleteTaskMutation()

  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [modal, setModal] = useState(null)

  // Accordian click handle funtion
  const handleClick = (nextIndex) => {
    setExpandedIndex((currentExpandedIndex) => {
      if (currentExpandedIndex === nextIndex) {
        return -1
      } else {
        return nextIndex
      }
    })
  }

  // Handle delete function
  const handleDeleteClick = (item) => {
    deleteTask(item)
  }

  // Handle Update function
  const handleUpdateClick = (item) => {
    setModal(
      <UpdateTaskModal item={item} onClose={() => setShowUpdateModal(false)} />
    )
    setShowUpdateModal(true)
  }

  const renderedItems = items.map((item, index) => {
    const isExpanded = expandedIndex === index
    const icon = (
      <span className='text-2xl'>
        {isExpanded ? <GoTriangleDown /> : <GoTriangleRight />}
      </span>
    )
    return (
      <div key={item._id}>
        <div className='flex justify-between p-3 bg-gray-50 border-b items-center '>
          <div className='flex text-xl cursor-pointer'>
            <div
              className='flex'
              onClick={() => {
                handleClick(index)
              }}
            >
              {icon}
              {item.isCompleted ? <del>{item.title}</del> : item.title}
            </div>
          </div>
          <div className='flex text-2xl cursor-pointer'>
            <GoPencil
              onClick={() => handleUpdateClick(item)}
              title='Edit task'
              className='text-green-600 mr-3 hover:text-3xl'
            />
            <GoTrashcan
              onClick={() => handleDeleteClick(item)}
              title='Delete task'
              className='text-red-600 hover:text-3xl'
            />
          </div>
        </div>
        {isExpanded && <div className='border-b p-5'>{item.description}</div>}
      </div>
    )
  })

  return (
    <div className='border-x border-t rounded'>
      {renderedItems}
      {showUpdateModal && modal}
    </div>
  )
}

export default Accordion
