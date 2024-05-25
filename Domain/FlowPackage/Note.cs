namespace PhygitalTool.Domain.FlowPackage;

public class Note
{
    // Prop
    public int NoteId { get; set; }
    public int QuestionId { get; set; }
    public Question Question { get; set; }
    public string Description { get; set; }

    public Note(int questionId, string description)
    {
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