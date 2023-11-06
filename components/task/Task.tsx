import { useContext } from 'react'
import { IconType } from 'react-icons'
import { BsPencilSquare, BsTrash3 } from 'react-icons/bs'
import { callEditTask, getTasks } from '@/network/dataManager'
import { useUser } from '@/context/userContext'
import { TaskContext } from '@/pages'

type TaskProps = {
  task: Task
  setIsDeleteModalOpen: (arg: boolean) => void
  setIsEditModalOpen: (arg: boolean) => void
}

type ModifierIconProps = {
  onClick: () => void
  Icon: IconType
}

export default function Task({
  task,
  setIsDeleteModalOpen,
  setIsEditModalOpen
}: TaskProps) {
  const { id, isTaskDone, title } = task
  const user = useUser()
  const taskContext = useContext(TaskContext)


  const ModifierIcon = ({ onClick, Icon }: ModifierIconProps) => (
    <button
      className="rounded-full p-2 transition hover:bg-black/10 hover:text-red-600 dark:hover:text-red-300"
      onClick={onClick}
    >
      <Icon size={18} opacity={0.5} />
    </button>
  )

  const toggleTaskDone = () => {
    const newTask: Task = {
      ...task,
      isTaskDone: !(task.isTaskDone)
    };
    callEditTask(user.user.uid, newTask)
      .then(() => {
        getTasks(user.user.uid, taskContext.setTasks);
      })
      .catch((e) => {
        console.log(e)
      });
  }

  return (
    <div
      className={`flex w-full items-center justify-between`}
    >
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={isTaskDone}
          className="checkbox"
          onClick={() => toggleTaskDone()}
          readOnly
          title={isTaskDone ? 'Uncheck the task' : 'Check the task'}
        />
        <div>
          <h3
            className={`select-none text-lg dark:text-white ${isTaskDone ? 'line-through' : ''
              }`}
          >
            {title}
          </h3>
        </div>
      </div>

      <div className="flex items-center justify-end gap-1">
        <ModifierIcon
          Icon={BsPencilSquare}
          onClick={() => setIsEditModalOpen(true)}
        />
        <ModifierIcon
          Icon={BsTrash3}
          onClick={() => setIsDeleteModalOpen(true)}
        />
      </div>
    </div>
  )
}
