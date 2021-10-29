import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const ProjectSchema = new Schema(
  {
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
    description: { type: String, required: true },
    name: { type: String, required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)
ProjectSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})
