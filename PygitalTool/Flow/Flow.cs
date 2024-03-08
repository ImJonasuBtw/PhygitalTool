using PygitalTool.Domain.Util;

namespace PygitalTool.Domain.Flow;

public class Flow
{
    public int FlowId { get;  set; }
    public FlowType FlowType { get;  set; }
    public Language Language { get;  set; }
}