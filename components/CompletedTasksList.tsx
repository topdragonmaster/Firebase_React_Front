import { useState } from 'react'
import { MdClearAll } from 'react-icons/md'
import TaskItem from './TaskCard'

type Props = {
  tasks: Task[] | undefined
}

export default function CompletedTasksList({ tasks }: Props) {
  return (
    <section className="flex flex-col gap-2">
      <div className="mb-1 flex items-center justify-between px-2 ">
        <h2 className="select-none text-lg font-medium">Completed Tasks</h2>
      </div>
      {tasks?.map((task) => {
        if (task.isTaskDone) {
          return <TaskItem key={task.id} {...task} />
        }
      })}
    </section>
  )
}
