import {AppState} from "../AppState.js";
import {Backlog} from "../models/Backlog.js";
import {logger} from "../utils/Logger.js";
import {api} from "./AxiosService.js";

class BacklogService {
  async getBacklogs(projectId) {
    const res = await api.get(`api/projects/${ projectId }/backlog`)
    AppState.backlogs = res.data.map(b => new Backlog(b))
  }
  async createBacklogItem(projectId, data) {
    const res = await api.post(`api/projects/${ projectId }/backlog`, data)
    AppState.backlogs = [...AppState.backlogs, new Backlog(res.data)]
  }
  async deleteBacklogItem(projectId, backlogId) {
    const res = await api.delete(`api/projects/${ projectId }/backlog/${ backlogId }`)
    AppState.backlogs = AppState.backlogs.filter(b => b.id !== backlogId)
    logger.log(res.data.message)
  }
  async editBacklogItem(projectId, backlogId, data) {
    const res = await api.put(`api/projects/${ projectId }/backlog/${ backlogId }`, data)
    const index = AppState.backlogs.findIndex(i => i.id === backlogId)
    const updatedBacklog = new Backlog(res.data)
    AppState.backlogs.splice(index, 1, updatedBacklog)
    AppState.currentBacklog = updatedBacklog
  }
  async setBacklogItem(backlogId) {
    AppState.currentBacklog = AppState.backlogs.find(b => b.id === backlogId)
  }
}

export const backlogService = new BacklogService();