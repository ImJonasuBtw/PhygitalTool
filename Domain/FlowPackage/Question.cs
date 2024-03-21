using PhygitalTool.Domain.Util;

namespace PhygitalTool.Domain.FlowPackage;

public class Question
{
    //prop
    public int QuestionId { get;  set; }
    public string QuestionText { get;  set; }
    public QuestionType QuestionType { get;  set; }
    
    //nav
    public ICollection<AnswerPossibility> AnswerPossibilities { get;  set; } = new List<AnswerPossibility>();
    public Flow Flow { get;  set; }
    public ICollection<Answer> Answers { get; set; } = new List<Answer>();

    public Question()
    {
        AnswerPossibilities = new List<AnswerPossibility>();
        Answers = new List<Answer>();
        Flow = new Flow();
    }

    public Question(int questionId, string questionText, QuestionType questionType)
    {
        QuestionId = questionId;
        QuestionText = questionText;
        QuestionType = questionType;
    }
    
}