import { dbContext } from '../db/DbContext.js'
import { BadRequest, Forbidden } from '../utils/Errors.js'

class NotesService {
  async getNotes(query) {
    const notes = await dbContext.Note.find(query).populate('creator', 'name picture')
    if (!notes) {
      throw new BadRequest('No notes found')
    }
    return notes
  }

  async getNoteById(noteId) {
    const note = await dbContext.Note.findById(noteId).populate('creator', 'name picture')
    if (!note) {
      throw new BadRequest('invalid noteId')
    }
    return note
  }

  async createNote(body) {
    const note = await dbContext.Note.create(body)
    await note.populate('creator', 'name picture')
    return note
  }

  async deleteNote(noteId, id) {
    const note = await dbContext.Note.findByIdAndRemove(noteId)
    if (id !== note.creatorId.toString()) {
      throw new Forbidden('You cannot delete')
    }
    await note.remove()
    return note
  }
}

export const notesService = new NotesService()
