import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const BackLogItemSchema = new Schema(
  {
    name: { type: String, required: true },
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ['pending', 'in-progress', 'review', 'done'], required: true },
    projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
    sprintId: { type: Schema.Types.ObjectId, ref: 'Sprint', required: false },
    color: { type: String }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)
BackLogItemSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})
BackLogItemSchema.virtual('project', {
  localField: 'projectId',
  foreignField: '_id',
  justOne: true,
  ref: 'Project'
})

BackLogItemSchema.virtual('sprint', {
  localField: 'sprintId',
  foreignField: '_id',
  justOne: true,
  ref: 'Sprint'
})
BackLogItemSchema.virtual('backlogItem', {
  localField: 'backlogItemId',
  foreignField: '_id',
  justOne: true,
  ref: 'BackLogItem'
})
