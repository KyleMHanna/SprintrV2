import { AppState } from "../AppState.js";
import { Sprint } from "../models/Sprint.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";

class SprintsService {
  async getSprints(projectId) {
    const res = await api.get(`api/projects/${projectId}/sprints`)
    logger.log(res, 'Getting Sprints')
    AppState.sprints = res.data.map(s => new Sprint(s))
  }
  async createSprint(projectId, sprint) {
    const res = await api.post(`api/projects/${projectId}/sprints`, sprint)
    AppState.sprints = [...AppState.sprints, new Sprint((res.data))]
  }
  async setSprint(sprintId) {
    AppState.currentSprint = AppState.sprints.find(s => s.id === sprintId)
  }
  async deleteSprint(projectId, sprintId) {
    const res = await api.delete(`api/projects/${projectId}/sprints/${sprintId}`)
    AppState.sprints = AppState.sprints.filter(s => s.id !== sprintId)
  }
  async editSprint(projectId, sprint) {
    const res = await api.put(`api/projects/${projectId}/sprints/${sprint.id}`, sprint)
    const Index = AppState.sprints.findIndex(i => i.id === sprint.id)
    const newSprint = new Sprint(res.data)
    AppState.sprints.splice(Index, 1, newSprint)
    AppState.currentSprint = newSprint
  }
  async moveBacklogToSprint(projectId, sprintId, backlogId) {
    const res = await api.put(`api/projects/${projectId}/backlog/${backlogId}`, sprintId)
  }
}

export const sprintsService = new SprintsService();