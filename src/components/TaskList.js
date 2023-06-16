import Accordion from './Accordion'
import { useFetchTasksQuery } from '../store'
import ScaleLoader from 'react-spinners/ScaleLoader'

const TaskList = () => {
  const { data, isLoading, isError } = useFetchTasksQuery()

  let content
  if (isLoading) {
    content = (
      <div className='w-full flex justify-center mt-20'>
        <ScaleLoader />
      </div>
    )
  } else if (isError) {
    content = (
      <div className='flex justify-center mt-10'>
        <h1 className='text-2xl text-red-500'>Error fetching Data</h1>
      </div>
    )
  } else {
    if (data.tasks.length) {
      content = <Accordion items={data.tasks} />
    } else {
      content = <h1>Empty Tasks</h1>
    }
  }

  return (
    <div className='mx-10'>
      {/* <Accordion items={tasks} /> */}
      {content}
    </div>
  )
}

export default TaskList
