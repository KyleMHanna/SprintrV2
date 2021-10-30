export class Task {
  constructor(taskData) {
    this.name = taskData.name
    this.weight = taskData.weight
    this.isComplete = taskData.isComplete
    this.completedOn = taskData.completedOn
    this.projectId = taskData.projectId
    this.backlogItemId = taskData.backlogItemId
    this.creatorId = taskData.creatorId
    this.id = taskData.id
  }
}
