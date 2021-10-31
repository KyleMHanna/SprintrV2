import {AppState} from "../AppState.js";
import {Notes} from "../models/Notes.js";
import {api} from "./AxiosService.js";

class NotesService {
  async getNotes(projectId) {
    const res = await api.get(`api/projects/${ projectId }/notes`);
    AppState.notes = res.data.map(n => new Notes(n))
  }
  async addNote(projectId, noteData) {
    const res = await api.post(`api/projects/${ projectId }/notes`, noteData);
    AppState.notes = [...AppState.notes, new Notes(res.data)]
  }
  async deleteNote(projectId, noteId) {
    const res = await api.delete(`api/projects/${ projectId }/notes/${ noteId }`)

    AppState.notes = AppState.notes.filter(n => n.id !== noteId)
  }
}

export const notesService = new NotesService();