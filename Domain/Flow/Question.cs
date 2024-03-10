using Domain.Domain.Flow;
using Domain.Domain.Util;

namespace Domain.Flow;

public class Question
{
    //prop
    public int QuestionId { get;  set; }
    public string QuestionText { get;  set; }
    public QuestionType QuestionType { get;  set; }
    
    //nav
    public ICollection<AnswerPossibility> AnswerPossibilities { get;  set; } = new List<AnswerPossibility>();
    public Domain.Flow.Flow Flow { get;  set; }

    public Question()
    {
        AnswerPossibilities = new List<AnswerPossibility>();
        Flow = new Domain.Flow.Flow();
    }

    public Question(int questionId, string questionText, QuestionType questionType)
    {
        QuestionId = questionId;
        QuestionText = questionText;
        QuestionType = questionType;
    }
    
}