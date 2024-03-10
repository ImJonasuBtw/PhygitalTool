using Domain.Domain.Util;

namespace Domain.Flow;

public class Question
{
    public int QuestionId { get;  set; }
    public string QuestionText { get;  set; }
    public QuestionType QuestionType { get;  set; }
}