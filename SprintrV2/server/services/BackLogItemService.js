import { dbContext } from '../db/DbContext.js'
import { BadRequest, Forbidden } from '../utils/Errors.js'

class BackLogItemService {
  async getBacklogItems(query) {
    const backlogItem = await dbContext.BackLogItem.find(query).populate('creator', 'name picture')
    return backlogItem
  }

  async getBacklogItemsById(backlogItemId) {
    const backlogItem = await dbContext.BackLogItem.findById(backlogItemId).populate('creator', 'name picture')
    if (!backlogItem) {
      throw new BadRequest('Invalid BackLogItemId')
    }
    return backlogItem
  }

  async createBacklogItem(itemData) {
    const backlogItem = await dbContext.BackLogItem.create(itemData)
    return backlogItem
  }

  async deleteBacklogItem(backlogItemId, userId) {
    const backlogItem = await this.getBacklogItemsById(backlogItemId)
    if (userId !== backlogItem.creatorId.toString()) {
      throw new Forbidden('Unauthorized')
    }
    await backlogItem.remove()
    return backlogItem
  }

  async editBacklogItem(backlogItemId, userId, itemData) {
    const backlogItem = await this.getBacklogItemsById(backlogItemId)
    if (userId !== backlogItem.creatorId.toString()) {
      throw new Forbidden('Unauthorized')
    }
    backlogItem.name = itemData.name || backlogItem.name
    backlogItem.description = itemData.description || backlogItem.description
    backlogItem.status = itemData.status || backlogItem.status
    backlogItem.color = itemData.color || backlogItem.color
    backlogItem.sprintId = itemData.sprintId || backlogItem.sprintId

    await backlogItem.save()
    return backlogItem
  }
}

export const backLogItemService = new BackLogItemService()
