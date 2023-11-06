type Task = {
  id: string
  title: string
  isTaskDone: boolean
  createdDate?: number
}

// Zustand useTasks types:
type TasksStore = {
  tasks: Task[]
  addTask: (title: string) => void
  deleteTask: (taskId: string) => void
  editTask: (taskId: string, title: string) => void
  toggleTaskDone: (taskId: string) => void
}
