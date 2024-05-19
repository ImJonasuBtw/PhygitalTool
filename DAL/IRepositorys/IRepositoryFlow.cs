using PhygitalTool.Domain.FlowPackage;

namespace PhygitalTool.DAL.IRepositorys;

public interface IRepositoryFlow
{
    Flow ReadFlow(int flowId);
    
    Flow ReadFlowWithQuestionAndAnswerpossibilities(int flowId);
    
    Flow CreateFlow(Flow flow);
    
    void RemoveFlow(int flowId);
    
    void UpdateFlow(Flow flow);
}