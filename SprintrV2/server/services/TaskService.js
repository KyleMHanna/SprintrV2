import { dbContext } from '../db/DbContext.js'
import { BadRequest, Forbidden } from '../utils/Errors.js'

class TaskService {
  async getTasks(query) {
    const tasks = await dbContext.Task.find(query).populate('creator', 'name picture')
    if (!tasks) {
      throw new BadRequest('invalid task')
    }
    return tasks
  }

  async getTaskById(taskId) {
    const task = await dbContext.Task.findById(taskId).populate('creator', 'name picture')
    if (!task) {
      throw new BadRequest('Invalid Task Id')
    }
    return task
  }

  async createTask(body) {
    const task = await dbContext.Task.create(body)
    return task
  }

  async deleteTask(taskId, id) {
    const task = await this.getTaskById(taskId)
    if (id !== task.creatorId.toString()) {
      throw new Forbidden('Not Authorized to Delete')
    }
    await task.remove()
    return task
  }

  async editTask(taskId, id, body) {
    const task = await this.getTaskById(taskId)
    if (id !== task.creatorId.toString()) {
      throw new Forbidden('Not Authorized to Edit')
    }
    task.name = body.name || task.name
    task.weight = body.weight || task.weight
    task.completedOn = body.completedOn || task.completedOn
    task.isComplete = body.isComplete || task.isComplete
    await task.save()
    return task
  }
}

export const taskService = new TaskService()
