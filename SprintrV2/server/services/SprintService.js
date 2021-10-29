import { dbContext } from '../db/DbContext.js'
import { BadRequest, Forbidden } from '../utils/Errors.js'

class SprintService {
  async getSprints(query) {
    const sprints = await dbContext.Sprint.find(query).populate('creator', 'name picture')
    return sprints
  }

  async getSprintsById(sprintId) {
    const sprints = await dbContext.Sprint.findById(sprintId).populate('creator', 'name picture')
    if (!sprints) {
      throw new BadRequest('invalid sprintId')
    }
    return sprints
  }

  async createSprint(body) {
    const sprint = await dbContext.Sprint.create(body)
    return sprint
  }

  async deleteSprint(sprintId, id) {
    const sprint = await this.getSprintsById(sprintId)
    if (id !== sprint.creatorId.toString()) {
      throw new Forbidden('not allowed to delete sprint')
    }
    await sprint.remove()
    return sprint
  }

  async editSprint(sprintId, id, body) {
    const sprint = await this.getSprintsById(sprintId)
    if (id !== sprint.creatorId.toString()) {
      throw new Forbidden('not allowed to edit sprint')
    }
    sprint.name = body.name || sprint.name
    sprint.startDate = body.startDate || sprint.startDate
    sprint.endDate = body.endDate || sprint.endDate
    sprint.isOpen = body.isOpen || sprint.isOpen
    await sprint.save()
    return sprint
  }
}

export const sprintService = new SprintService()
