import { AppState } from "../AppState.js";
import { Project } from "../models/Project.js";
import { api } from "./AxiosService.js";

class ProjectsService {
  async getProjects() {
    const res = await api.get('api/projects/');
    AppState.projects = res.data.map(p => new Project(p))
  }
  async getProjectById(id) {
    const res = await api.get('api/projects/' + id)
    AppState.currentProject = new Project(res.data)
  }
  async createProject(project) {
    const res = await api.post('api/projects', project);
    AppState.projects.push(new Project(res.data))
    return res.data.id
  }
  async editProject(project) {
    const res = await api.put('api/projects/', project);
    AppState.projects = new Project(res.data)
  }
  async deleteProject(projectId) {
    const res = await api.delete('api/projects/' + projectId);
    AppState.projects = AppState.projects.filter(p => p.id !== projectId)
  }
}

export const projectsService = new ProjectsService();