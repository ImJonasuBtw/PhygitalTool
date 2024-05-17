using System.ComponentModel.DataAnnotations;

namespace PhygitalTool.Domain.FlowPackage;

public class AnswerPossibility
{
    // Prop
    public int AnswerPossibilityId { get; set; }
    public string Description { get; set; }
    public int QuestionId{ get; set; }

    // Nav
    public Question Question { get; set; }
    public Answer Answer { get; set; }
    public int NextQuestionId { get; set; }

    public AnswerPossibility()
    {
    }

    public AnswerPossibility( string description)
    {
        
        Description = description;
    }
    public AnswerPossibility( string description, int nextQuestionId)
    {
        Description = description;
        NextQuestionId = nextQuestionId;
    }
}