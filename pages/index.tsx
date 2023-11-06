import { useEffect, useState, createContext } from 'react'

import AddTaskInput from '@/components/AddTaskInput'
import CompletedTasksList from '@/components/CompletedTasksList'
import Navbar from '@/components/Navbar'
import OngoingTasksList from '@/components/OngoingTasksList'
import useTasks from '@/hooks/useTasks'
import { useUser } from '@/context/userContext'
import { getTasks } from '@/network/dataManager'

export const TaskContext = createContext(null)

export default function Home() {
  const user = useUser();
  const [tasks, setTasks] = useState<Task[]>();

  useEffect(() => {
    if (user.user !== undefined) {
      getTasks(user.user.uid, setTasks);
    }
  }, [user]);

  const isAnyCompletedTask =
  tasks?.filter((task) => task.isTaskDone).length !== 0

  return (
    <TaskContext.Provider value={{setTasks: setTasks}}>
      <div className="relative mx-auto my-10 flex w-11/12 max-w-xl flex-col gap-14">
        <Navbar />
        <AddTaskInput />
        <OngoingTasksList tasks={tasks} />
        {isAnyCompletedTask && <CompletedTasksList tasks={tasks} />}
      </div>
    </TaskContext.Provider>
  )
}


