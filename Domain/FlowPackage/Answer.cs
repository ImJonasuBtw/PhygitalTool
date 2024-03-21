namespace PhygitalTool.Domain.FlowPackage;

public class Answer
{
    // Prop
    public int AnswerId { get; set; }
    public string AnswerText { get; set; }
    public int QuestionId { get; set; }


    // Nav
    public Question Question { get; set; }
    public AnswerPossibility AnswerPossibility { get; set; }

    public Answer()
    {
    }

    public Answer(int answerId, string openAnswer)
    {
        AnswerId = answerId;
        AnswerText = openAnswer;
    }

    public Answer(int answerId, string answerText, int questionId)
    {
        AnswerId = answerId;
        AnswerText = answerText;
        QuestionId = questionId;
    }
}