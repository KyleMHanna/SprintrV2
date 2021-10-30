class TasksService {
  async getTasks(projectId) {
    try {
      const res = await api.get('api/projects/:projectId/tasks')
    } catch (err) {
      logger.error("No tasks Found", err)
    }
  }
  async getTask(projectId, taskId) {
    try {
      const res = await api.get('api/projects/:projectId/tasks/:taskId')
    } catch (err) {
      logger.error("No task Found", err)
    }
  }
  async createTask(projectId) {
    try {
      const res = await api.get('api/projects/:projectId/tasks')
    } catch (err) {
      logger.error("Failed to make task", err)
    }
  }
  async deleteTask(projectId, taskId) {
    try {
      const res = await api.get('api/projects/:projectId/tasks/:taskId')
    } catch (err) {
      logger.error("No task deleted", err)
    }
  }
  async editTask(projectId, taskId) {
    try {
      const res = await api.get('api/projects/:projectId/tasks/:taskId')
    } catch (err) {
      logger.error("No task deleted", err)
    }
  }
}
export const taskService = new TaskService()