using Domain.Domain.Flow;

namespace Domain.Flow;

public class Answer
{
    //prop
    public int AnswerId { get;  set; }
    public string AnswerText { get;  set; }
    
    //nav
    public Question Question { get;  set; }
    public AnswerPossibility AnswerPossibility { get;  set; }

    public Answer()
    {
    }

    public Answer(int answerId, string openAnswer)
    {
        AnswerId = answerId;
        AnswerText = openAnswer;
    }
}