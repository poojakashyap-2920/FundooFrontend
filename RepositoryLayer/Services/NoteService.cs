using Dapper;
using ModelLayer.Entities;
using RepositoryLayer.Context;
using RepositoryLayer.CustomExceptions;
using RepositoryLayer.Interface;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;

namespace RepositoryLayer.Services
{
    public class NoteService:INote
    {
        private readonly DapperContext _context;
        public NoteService(DapperContext context)
        {
            _context = context;
        }

        //Logic for inserting records
        public async Task<int> CreateNote(Note re_var)
        {
            var query = "INSERT INTO UserNote (Title, Description, reminder, isArchive, isPinned, isTrash, EmailId, IsColour) " +
                        "VALUES (@Title, @Description, @Reminder, @IsArchive, @IsPinned, @IsTrash, @EmailId, @IsColour)";

            var parameters = new DynamicParameters();
            parameters.Add("@Title", re_var.Title, DbType.String);
            parameters.Add("@Description", re_var.Description, DbType.String);
            parameters.Add("@Reminder", re_var.Reminder, DbType.DateTime);
            parameters.Add("@IsArchive", re_var.IsArchive, DbType.Boolean);
            parameters.Add("@IsPinned", re_var.IsPinned, DbType.Boolean);
            parameters.Add("@IsTrash", re_var.IsTrash, DbType.Boolean);
            parameters.Add("@EmailId", re_var.EmailId, DbType.String);
            parameters.Add("@IsColour", re_var.IsColour, DbType.String);

            using (var connection = _context.CreateConnection())
            {
                return await connection.ExecuteAsync(query, parameters);
            }
        }

        

        //logic for Display the all notes

        public async Task<IEnumerable<Note>> GetNotesByEmail(string email)
        {
            var query = "SELECT * FROM USerNote where EmailId=@EmailId";

            using (var connection = _context.CreateConnection())
            {
                var notes = await connection.QueryAsync<Note>(query, new{ EmailId=email});

                if (notes.Any())
                {
                    return notes;
                }
                else
                {
                    throw new EmptyListException("Note is not  present in the table.");
                }
            }
        }

        

            public async Task<int> UpdateNote(int id, Note re_var)
            {
                var query = @"UPDATE UserNote SET 
                  Title = @Title, 
                  Description = @Description, 
                  Reminder = @Reminder, 
                  IsArchive = @IsArchive, 
                  IsPinned = @IsPinned, 
                  IsTrash = @IsTrash,
                  IsColour = @IsColour
                  WHERE NoteId = @NoteId";

                var parameters = new DynamicParameters();
                parameters.Add("@NoteId", id, DbType.Int32);
                parameters.Add("@Title", re_var.Title, DbType.String);
                parameters.Add("@Description", re_var.Description, DbType.String);
                parameters.Add("@Reminder", re_var.Reminder, DbType.DateTime);
                parameters.Add("@IsArchive", re_var.IsArchive, DbType.Boolean);
                parameters.Add("@IsPinned", re_var.IsPinned, DbType.Boolean);
                parameters.Add("@IsTrash", re_var.IsTrash, DbType.Boolean);
                parameters.Add("@IsColour", re_var.IsColour, DbType.String);

                using (var connection = _context.CreateConnection())
                {
                    return await connection.ExecuteAsync(query, parameters);
                }
            }
        



        public async Task<int> DeleteNote(int id, string email)
        {
            var check_note_query = "SELECT COUNT(*) FROM UserNote WHERE NoteId = @NoteId AND EmailId = @EmailId";
            var delete_note_query = "DELETE FROM UserNote WHERE NoteId = @NoteId AND EmailId = @EmailId";

            using (var connection = _context.CreateConnection())
            {
                
                int noteCount = await connection.ExecuteScalarAsync<int>(check_note_query, new { EmailId = email, NoteId = id });

                if (noteCount == 0)
                {
                    
                    throw new IdNotFoundException("NoteId does not exist.");
                }
                else
                {
                    
                    int rowsAffected = await connection.ExecuteAsync(delete_note_query, new { NoteId = id, EmailId = email });

                    if (rowsAffected == 0)
                    {
                        return 0;
                    }

                    return rowsAffected;
                }
            }
        }
        


        public async Task<int> ArchiveNote(int id)
        {
            var select_query = "SELECT IsArchive FROM UserNote WHERE NoteId = @NoteId ";
            var update_query = "UPDATE UserNote SET IsArchive = @IsArchive WHERE NoteId = @NoteId ";

            using (var connection = _context.CreateConnection())
            {
                bool isArchive = await connection.ExecuteScalarAsync<bool>(select_query, new { NoteId = id});
                isArchive = !isArchive;
                int rowsAffected = await connection.ExecuteAsync(update_query, new { IsArchive = isArchive, NoteId = id });

                if (rowsAffected == 0)
                {
                   
                    return 0;
                }

                return rowsAffected;
            }
        }
        



        public async Task<int> PinnNote(int id, string email)
        {
            var select_query = "SELECT IsPinned FROM UserNote WHERE NoteId = @NoteId AND EmailId = @EmailId";
            var update_query = "UPDATE UserNote SET IsPinned = @IsPinned WHERE NoteId = @NoteId AND EmailId = @EmailId";

            using (var connection = _context.CreateConnection())
            {
                bool isPinned = await connection.ExecuteScalarAsync<bool>(select_query, new { NoteId = id, EmailId = email });
                isPinned = !isPinned;

                int rowsAffected = await connection.ExecuteAsync(update_query, new { IsPinned = isPinned, NoteId = id, EmailId = email });

                if (rowsAffected == 0)
                {
                    return 0;
                }

                return rowsAffected;
            }
        }
        


        public async Task<int> TrashNote(int id, string email) 
        {
            var select_query = "SELECT IsTrash FROM UserNote WHERE NoteId = @NoteId AND EmailId = @EmailId";
            var update_query = "UPDATE UserNote SET IsTrash = @IsTrash WHERE NoteId = @NoteId AND EmailId = @EmailId";

            using (var connection = _context.CreateConnection())
            {
                bool isTrash = await connection.ExecuteScalarAsync<bool>(select_query, new { NoteId = id, EmailId = email });
                isTrash = !isTrash;
                int rowsAffected = await connection.ExecuteAsync(update_query, new { IsTrash = isTrash, NoteId = id, EmailId = email });

                if (rowsAffected == 0)
                {
                    return 0;
                }

                return rowsAffected;
            }
        }

       


        public async Task<IEnumerable<Note>> GetAllNotes()
        {
            var query = "SELECT * FROM UserNote";

            using (var connection = _context.CreateConnection())
            {
                var notes = await connection.QueryAsync<Note>(query);
                return notes.ToArray(); 
            }
        }


        //****************************************
        public async Task<int> UpdateColor(int id, string color)
        {
            var update_query = "UPDATE UserNote SET IsColour = @Color WHERE NoteId = @NoteId";

            using (var connection = _context.CreateConnection())
            {
                int rowsAffected = await connection.ExecuteAsync(update_query, new { Color = color, NoteId = id });

                if (rowsAffected == 0)
                {
                  
                    return 0;
                }

                return rowsAffected;
            }
        }


    }



}
