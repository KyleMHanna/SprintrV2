import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const TaskSchema = new Schema(
  {
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
    name: { type: String, required: true },
    weight: { type: Number, required: true },
    projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
    assignedTo: { type: Schema.Types.ObjectId },
    backLogItemId: { type: Schema.Types.ObjectId, ref: 'BackLogItem', required: true },
    isCompleted: { type: Boolean, default: false, required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)
TaskSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Profile',
  justOne: true
})
