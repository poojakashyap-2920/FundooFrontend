using ModelLayer.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RepositoryLayer.Interface
{
    public interface INote
    {
        public Task<int> CreateNote(Note re_var);

       // public Task<Note>InsertNote(Note note);

        public Task<IEnumerable<Note>> GetNotesByEmail(string email);
        public Task<IEnumerable<Note>> GetAllNotes();
        public Task<int> UpdateNote(int id, Note re_var);
        public Task<int> UpdateColor(int id, string color);
        public Task<int> DeleteNote(int id, string email);
        public Task<int> ArchiveNote(int id);
        public Task<int> PinnNote(int id, string email);
        public Task<int> TrashNote(int id, string email);

    }
}
