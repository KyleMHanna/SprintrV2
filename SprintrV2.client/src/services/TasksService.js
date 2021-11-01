import { AppState } from "../AppState"
import { Task } from "../models/Task"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


class TaskService {
  async getTasks(projectId) {
    try {
      const res = await api.get(`api/projects/${projectId}/tasks`)
      AppState.tasks = res.data.map(t => new Task(t))
    } catch (err) {
      logger.error("No tasks Found", err)
    }
  }
  async getTask(projectId, taskId) {
    try {
      const res = await api.get(`api/projects/${projectId}/tasks/${taskId}`)
    } catch (err) {
      logger.error("No task Found", err)
    }
  }
  async createTask(projectId) {
    try {
      const res = await api.get(`api/projects/${projectId}/tasks`)
      AppState.tasks = [...AppState.tasks, new Task(res.data)]
    } catch (err) {
      logger.error("Failed to make task", err)
    }
  }
  async deleteTask(projectId, taskId) {
    try {
      const res = await api.get(`api/projects/${projectId}/tasks/${taskId}`)
      AppState.tasks = AppState.tasks.filter(t => t.id === taskId)
    } catch (err) {
      logger.error("No task deleted", err)
    }
  }
  async editTask(projectId, taskId) {
    try {
      const res = await api.put(`api/projects/${projectId}/tasks/${taskId} `)
      //  TODO might need to fix this line below
      AppState.tasks = new Task(res.data)
    } catch (err) {
      logger.error("No task deleted", err)
    }
  }
  async checkTask(projectId, taskId, taskData) {
    const res = await api.put(`api/projects/${projectId}/tasks/${taskId}`, taskData)
    AppState.tasks = new Task(res.data)
    logger.log('if checkbox', res.data)
    logger.log('taskData', taskData)
  }
}
export const taskService = new TaskService()