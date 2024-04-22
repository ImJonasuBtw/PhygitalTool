using System.ComponentModel.DataAnnotations;
using PhygitalTool.Domain.Util;

namespace PhygitalTool.Domain.FlowPackage;

public class Question
{
    [Key]
    // Prop
    public int QuestionId { get; set; }
    public string QuestionText { get; set; }
    public QuestionType QuestionType { get; set; }
    //foreing key for flow
    public int FlowId { get; set; }

    // Nav
    public ICollection<AnswerPossibility> AnswerPossibilities { get; set; } = new List<AnswerPossibility>();
    public Flow Flow { get; set; }
    public ICollection<Answer> Answers { get; set; } = new List<Answer>();
    public bool IsConditional { get; set; }
    
    
    public Question()
    {
        
    }

    public Question( string questionText, QuestionType questionType)
    {
        QuestionText = questionText;
        QuestionType = questionType;
    }
    public Question( string questionText, QuestionType questionType, bool isConditional)
    {
        
        QuestionText = questionText;
        QuestionType = questionType;
        IsConditional = isConditional;
    }
}