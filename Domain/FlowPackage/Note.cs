using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PhygitalTool.Domain.FlowPackage;

public class Note
{
    // Prop
    [Key]
    public int NoteId { get; set; }
    public int QuestionId { get; set; }
    public Question Question { get; set; }
    [Required(ErrorMessage = "Description is required")]
    public string Description { get; set; }

    public Note(int questionId, string description)
    {
        QuestionId = questionId;
        Description = description;
    }
    
    public Note(int noteId, int questionId, string description)
    {
        NoteId = noteId;
        QuestionId = questionId;
        Description = description;
    }

    public Note()
    {
        
    }
    
    public Note(string description)
    {
        Description = description;
    }
}