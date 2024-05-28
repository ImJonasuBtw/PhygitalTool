using PhygitalTool.Domain.FlowPackage;

namespace PhygitalTool.DAL.IRepositorys;

public interface IRepositoryNote
{
    IEnumerable<Note> ReadAllNotes();
    
    void CreateNote(Note note);
}