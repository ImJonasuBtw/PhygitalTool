using System.ComponentModel.DataAnnotations;
using PhygitalTool.Domain.Util;

namespace PhygitalTool.Domain.FlowPackage;

public class Question
{
    [Key]
    // Prop
    public int QuestionId { get; set; }
    [Required(ErrorMessage = "QuestionText is required")]
    [StringLength(400, ErrorMessage = "Question cannot exceed 400 characters.")]
    public string QuestionText { get; set; }
   
    
    public string QuestionImage { get; set; }
    [Required(ErrorMessage = "QuestionType  is required")]
    public QuestionType QuestionType { get; set; }
    //foreing key for flow
    public int FlowId { get; set; }

    // Nav
    public ICollection<AnswerPossibility> AnswerPossibilities { get; set; } = new List<AnswerPossibility>();
    public Flow Flow { get; set; }
    public ICollection<Answer> Answers { get; set; } = new List<Answer>();
    public ICollection<Note> Notes { get; set; } = new List<Note>();
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