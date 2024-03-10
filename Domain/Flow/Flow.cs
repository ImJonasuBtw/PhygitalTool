using Domain.Domain.Util;
using Domain.Flow;

namespace Domain.Domain.Flow;

public class Flow
{
    //prop
    public int FlowId { get;  set; }
    public FlowType FlowType { get;  set; }
    public Language Language { get;  set; }
    
    //nav
    public ICollection<Question> Questions { get;  set; }

    public Flow()
    {
        Questions = new List<Question>();
    }

    public Flow(int flowId, FlowType flowType, Language language)
    {
        FlowId = flowId;
        FlowType = flowType;
        Language = language;
    }
}