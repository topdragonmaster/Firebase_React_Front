import { useState, useContext } from 'react'
import EditModal from './modal/EditModal'
import Modal from './modal/Modal'
import Task from './task/Task'
import { TaskContext } from '@/pages'
import { useUser } from '@/context/userContext'
import { deleteTask, getTasks } from '@/network/dataManager'

export default function TaskCard(task: Task) {
  const user = useUser()
  const { id, isTaskDone } = task
  const taskContext = useContext(TaskContext)

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const modalDeleteMessage = 'Do you really want to remove this task?'

  return (
    <div
      className={`flex flex-col rounded-md border p-4 shadow-sm transition hover:shadow-md dark:border-gray-600 ${isTaskDone ? 'opacity-60' : ''
        }`}
    >
      {isDeleteModalOpen && (
        <Modal
          message={modalDeleteMessage}
          confirmFn={() => {
            deleteTask(user.user.uid, id).then(() => {
              getTasks(user.user.uid, taskContext.setTasks)
            });
          }}
          setIsModalOpen={setIsDeleteModalOpen}
        />
      )}
      {isEditModalOpen && (
        <EditModal setIsEditModalOpen={setIsEditModalOpen} task={task} />
      )}

      <Task
        task={task}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        setIsEditModalOpen={setIsEditModalOpen}
      />
    </div>
  )
}
