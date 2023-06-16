import React from 'react'
import AddTaskForm from './components/AddTaskForm'
import TaskList from './components/TaskList'

const App = () => {
  return (
    <div className='container mx-auto mb-10'>
      <h1 className='text-3xl'>MCS TASK MANAGER</h1>
      <AddTaskForm />
      <TaskList />
    </div>
  )
}

export default App
