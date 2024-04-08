namespace PhygitalTool.Domain.FlowPackage;

public class UserInput
{
    // Prop
    public int UserInputId { get; set; }
    public int AnswerId { get; set; }
    public int FlowId { get; set; }

    public UserInput()
    {
    }

    public UserInput(int answerId, int flowId)
    {
        AnswerId = answerId;
        FlowId = flowId;
    }
}