using PhygitalTool.Domain.Util;

namespace PhygitalTool.Domain.FlowPackage;

public class Flow
{
    //prop
    public int FlowId { get; set; }

    public string FlowDescription { get; set; }
    public FlowType FlowType { get; set; }
    public Language Language { get; set; }

    //nav
    public ICollection<FlowSubTheme> FlowSubThemes { get; set; } = new List<FlowSubTheme>();
    public ICollection<Question> Questions { get; set; } = new List<Question>();
    public ICollection<ContactInformation> ContactInformations { get; set; } = new List<ContactInformation>();

    public Flow()
    {
        
    }

    public Flow(int flowId, FlowType flowType, Language language, string flowDescription)
    {
        FlowId = flowId;
        FlowType = flowType;
        Language = language;
        FlowDescription = flowDescription;
    }
}