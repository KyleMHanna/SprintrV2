import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const SprintSchema = new Schema(
  {
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
    projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    name: { type: String, required: true },
    isOpen: { type: Boolean, required: false }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)
SprintSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})
SprintSchema.virtual('sprint', {
  localField: 'sprintId',
  foreignField: '_id',
  justOne: true,
  ref: 'Sprint'
})
SprintSchema.virtual('project', {
  localField: 'projectId',
  foreignField: '_id',
  justOne: true,
  ref: 'Project'
})
