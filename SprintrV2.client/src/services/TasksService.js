import {AppState} from "../AppState"
import {Task} from "../models/Task"
import {logger} from "../utils/Logger"
import {api} from "./AxiosService"


class TaskService {
  async getTasks(projectId) {
    try {
      const res = await api.get(`api/projects/${ projectId }/tasks`)
      AppState.tasks = res.data.map(t => new Task(t))
      this.setWeight()
    } catch (err) {
      logger.error("No tasks Found", err)
    }
  }
  async getTask(projectId, taskId) {
    try {
      const res = await api.get(`api/projects/${ projectId }/tasks/${ taskId }`)
      this.setWeight()
    } catch (err) {
      logger.error("No task Found", err)
    }
  }
  async createTask(projectId, backlogItemId, task) {
    try {
      task.backlogItemId = backlogItemId

      const res = await api.post(`api/projects/${ projectId }/tasks`, task)
      AppState.tasks = [...AppState.tasks, new Task(res.data, projectId, backlogItemId)]
      this.setWeight()
      logger.log(res.data, '⚠ creating task')
      return res.data.id
    } catch (err) {
      logger.error("Failed to make task", err)
    }
  }
  async deleteTask(projectId, taskId) {
    try {
      const res = await api.delete(`api/projects/${ projectId }/tasks/${ taskId }`)
      AppState.tasks = AppState.tasks.filter(t => t.id !== taskId)
      this.setWeight()
    } catch (err) {
      logger.error("No task deleted", err)
    }
  }
  async editTask(projectId, taskId) {
    try {
      const res = await api.put(`api/projects/${ projectId }/tasks/${ taskId } `)
      //  TODO might need to fix this line below
      AppState.tasks = new Task(res.data)
    } catch (err) {
      logger.error("No task deleted", err)
    }
  }
  async checkTask(projectId, taskId, taskData) {
    const res = await api.put(`api/projects/${ projectId }/tasks/${ taskId }`, taskData)

    // AppState.tasks = res.taskData.map(t => new Task(t))
    logger.log('if checkbox', res.data)
    logger.log('taskData', taskData)
  }

  setWeight() {
    let tasksWeight = 0
    let tasks = []
    for (let i = 0; i < AppState.backlogs.length; i++) {
      tasks = AppState.tasks.filter(t => t.backlogItemId === AppState.backlogs[i].id)
      for (let i = 0; i < tasks.length; i++) {
        tasksWeight += tasks[i].weight
      }
      AppState.backlogs[i].weightTotal = tasksWeight
      tasksWeight = 0
    }
    AppState.backlogs.weightTotal = tasksWeight
  }
}
export const taskService = new TaskService()