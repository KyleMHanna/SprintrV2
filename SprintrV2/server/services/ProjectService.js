import { dbContext } from '../db/DbContext.js'
import { BadRequest, Forbidden } from '../utils/Errors.js'

class ProjectService {
  async getProjects(query) {
    const projects = await dbContext.Project.find(query).populate('creator', 'name picture')
    if (!projects) {
      throw new BadRequest('No projects found')
    }
    return projects
  }

  async getProjectById(projectId) {
    const project = await dbContext.Project.findById(projectId).populate('creator', 'name picture')
    if (!project) {
      throw new BadRequest('invalid project id')
    }
    return project
  }

  async createProject(body) {
    const project = await dbContext.Project.create(body)
    await project.populate('creator', 'name picture')
    return project
  }

  async deleteProject(projectId, id) {
    const project = await this.getProjectById(projectId)
    if (id === project.creatorId.toString()) {
      throw new Forbidden('Not allowed to delete project')
    }
    await project.remove()
    return project
  }

  async editProject(projectId, id, body) {
    const project = await this.getProjectById(projectId)
    if (id === project.creatorId.toString()) {
      throw new Forbidden('Not allowed to edit project')
    }
    project.name = body.name || project.name
    project.description = body.description || project.description
    await project.save()
    return project
  }
}

export const projectService = new ProjectService()
