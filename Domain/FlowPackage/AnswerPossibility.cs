namespace PhygitalTool.Domain.FlowPackage;

public class AnswerPossibility
{
    // Prop
    public int AnswerPossibilityId { get; set; }
    public string Description { get; set; }

    // Nav
    public Question Question { get; set; }
    public Answer Answer { get; set; }

    public AnswerPossibility(int answerPossibilityId, string description)
    {
        AnswerPossibilityId = answerPossibilityId;
        Description = description;
    }
}