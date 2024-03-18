using Domain.Domain.Util;

namespace Domain.FlowPackage;

public class Flow
{
    //prop
    public int FlowId { get;  set; }
    
    public string FlowDescription { get; set; }
    public FlowType FlowType { get;  set; }
    public Language Language { get;  set; }
    
    //nav
    public ICollection<Question> Questions { get;  set; } = new List<Question>();
    public ICollection<ContactInformation> ContactInformations { get; set; } = new List<ContactInformation>();

    public Flow()
    {
        
    }

    public Flow(int flowId, FlowType flowType, Language language)
    {
        FlowId = flowId;
        FlowType = flowType;
        Language = language;
    }
}