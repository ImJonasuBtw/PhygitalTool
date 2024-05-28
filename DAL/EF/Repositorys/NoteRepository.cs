using PhygitalTool.DAL.IRepositorys;
using PhygitalTool.Domain.FlowPackage;

namespace PhygitalTool.DAL.EF.Repositorys;

public class NoteRepository : IRepositoryNote
{
    private readonly PhygitalToolDbContext _context;

    public NoteRepository(PhygitalToolDbContext context)
    {
        _context = context;
    }
    public IEnumerable<Note> ReadAllNotes()
    {
        var notesWithQuestions = _context.Notes.Select(note => new Note
        {
            Description = note.Description,
            QuestionId = note.QuestionId,
            Question = _context.Questions.FirstOrDefault(question => question.QuestionId == note.QuestionId)
        });

        return notesWithQuestions; 
    }
    
    public void CreateNote(Note note)
    {
        _context.Notes.Add(note);
        _context.SaveChanges();
    }

}