import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const TaskSchema = new Schema(
  {
    creatorId: {type: Schema.Types.ObjectId, ref: 'Account', required: true},
    name: {type: String, required: true},
    weight: {type: Number, required: true},
    projectId: {type: Schema.Types.ObjectId, ref: 'Project', required: true},
    assignedTo: {type: Schema.Types.ObjectId},
    backlogItemId: {type: Schema.Types.ObjectId, ref: 'BackLogItem', required: true},
    isComplete: {type: Boolean, default: false, required: false}
  },
  {timestamps: true, toJSON: {virtuals: true}}
)
TaskSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Profile',
  justOne: true
})
TaskSchema.virtual('backlogItem', {
  localField: 'backlogItemId',
  foreignField: '_id',
  justOne: true,
  ref: 'BackLogItem'
})
TaskSchema.virtual('project', {
  localField: 'projectId',
  foreignField: '_id',
  justOne: true,
  ref: 'Project'
})
TaskSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})
