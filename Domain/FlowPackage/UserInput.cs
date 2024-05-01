namespace PhygitalTool.Domain.FlowPackage;

public class UserInput
{
    // Prop
    public int UserInputId { get; set; }
    public int AnswerId { get; set; }
    public int FlowId { get; set; }
    public int ProjectId { get; set; }
    public int MainThemeId { get; set; }
    public int SubThemeId { get; set; }
    

    public UserInput()
    {
    }

    public UserInput(int answerId, int flowId, int mainThemeId, int subThemeId, int projectId)
    {
        AnswerId = answerId;
        FlowId = flowId;
        MainThemeId = mainThemeId;
        SubThemeId = subThemeId;
        ProjectId = projectId;
    }
}