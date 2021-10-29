import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const NoteSchema = new Schema(
  {
    body: { type: String, required: true },
    backLogItemId: { type: Schema.Types.ObjectId, required: true, ref: 'BackLogItem' },
    projectId: { type: Schema.Types.ObjectId, required: true, ref: 'Project' },
    creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)
NoteSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})
NoteSchema.virtual('backlogItem', {
  localField: 'backlogItemId',
  foreignField: '_id',
  justOne: true,
  ref: 'BacklogItem'
})
NoteSchema.virtual('project', {
  localField: 'projectId',
  foreignField: '_id',
  justOne: true,
  ref: 'Project'
})
