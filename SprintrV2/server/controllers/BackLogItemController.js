import BaseController from '../utils/BaseController.js'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { backLogItemService } from '../services/BackLogItemService.js'
export class BackLogItemController extends BaseController {
  constructor() {
    super('api/projects/:projectId/backlog')
    this.router
      .get('', this.getBacklogItems)
      .get('/:backlogItemId', this.getBacklogItemById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createBacklogItem)
      .put('/:backlogItemId', this.editBacklogItem)
      .delete('/:backlogItemId', this.deleteBacklogItem)
  }

  async getBacklogItems(req, res, next) {
    try {
      const backlogItem = await backLogItemService.getBacklogItems({ projectId: req.params.projectId })
      res.send(backlogItem)
    } catch (error) {
      next(error)
    }
  }

  async getBacklogItemById(req, res, next) {
    try {
      const backlogItem = await backLogItemService.getBacklogItemsById(req.params.backlogItemId)
      res.send(backlogItem)
    } catch (error) {
      next(error)
    }
  }

  async createBacklogItem(req, res, next) {
    try {
      req.body.projectId = req.params.projectId
      req.body.creatorId = req.userInfo.id
      const backlogItem = await backLogItemService.createBacklogItem(req.body)
      res.send(backlogItem)
    } catch (error) {
      next(error)
    }
  }

  async editBacklogItem(req, res, next) {
    try {
      const backlog = await backLogItemService.editBacklogItem(req.params.backlogItemId, req.userInfo.id, req.body)
      res.send(backlog)
    } catch (error) {
      next(error)
    }
  }

  async deleteBacklogItem(req, res, next) {
    try {
      const backlog = await backLogItemService.deleteBacklogItem(req.params.backlogItemId, req.userInfo.id)
      res.send(backlog)
    } catch (error) {
      next(error)
    }
  }
}
