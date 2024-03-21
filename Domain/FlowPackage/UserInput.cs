namespace PhygitalTool.Domain.FlowPackage;

public class UserInput
{
    public int UserInputId { get;  set; }
    public int AnswerId { get;  set; }
    public int FlowId{ get;  set; }
    public int UserId { get;  set; }

    public UserInput()
    {
    }

    public UserInput(int answerId, int flowId, int userId)
    {
        AnswerId = answerId;
        FlowId = flowId;
        UserId = userId;
    }
}
