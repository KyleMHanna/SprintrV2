import mongoose from 'mongoose'
import { AccountSchema, ProfileSchema } from '../models/Account'
import { BackLogItemSchema } from '../models/BackLogItem.js'
import { NoteSchema } from '../models/Note.js'
import { ProjectSchema } from '../models/Project.js'
import { SprintSchema } from '../models/Sprint.js'
import { TaskSchema } from '../models/Task.js'
import { ValueSchema } from '../models/Value'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Profiles = mongoose.model('Profile', ProfileSchema, 'accounts');
  Project = mongoose.model('Project', ProjectSchema);
  BackLogItem = mongoose.model('BackLogItem', BackLogItemSchema);
  Note = mongoose.model('Note', NoteSchema);
  Sprint = mongoose.model('Sprint', SprintSchema);
  Task = mongoose.model('Task', TaskSchema);
}

export const dbContext = new DbContext()
