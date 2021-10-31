import { AppState } from "../AppState.js";
import { Sprint } from "../models/Sprint.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";

class SprintsService {
  async getSprints(projectId) {
    const res = await api.get(`api/projects/${ projectId }/sprints`)
    logger.log(res, 'Getting Sprints')
    AppState.sprints = res.data.map(s => new Sprint(s))
  }
}

export const socketService = new SprintsService();