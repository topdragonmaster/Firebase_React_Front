import TaskCard from './TaskCard'

type Props = {
  tasks: Task[] | undefined
}

export default function OngoingTasksList({ tasks }: Props) {

  const undoneTasksCount = tasks?.filter((task) => !task.isTaskDone).length
  return (
    <section className="flex flex-col gap-2">
      {undoneTasksCount === 0 && (
        <h2 className="mt-8 animate-fade-down select-none text-center text-lg font-medium capitalize animate-normal animate-duration-200 animate-fill-both animate-once animate-ease-out dark:text-white">
          😎 There is nohting to do!
        </h2>
      )}
      {undoneTasksCount !== 0 && (
        <article className="flex flex-col gap-2">
          <div className="mb-1 flex items-center justify-between px-2">
            <h2 className="text-lg font-medium dark:text-white">
              Ongoing Tasks
            </h2>
          </div>
          <div className="flex flex-col gap-2">
            {tasks?.map((task) => {
              if (!task.isTaskDone) {
                return <TaskCard key={task.id} {...task} />
              }
            })}
           
          </div>
        </article>
      )}
    </section>
  )
}
