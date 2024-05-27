using PhygitalTool.Domain.FlowPackage;

namespace PhygitalTool.DAL.IRepositorys;

public interface IRepositoryAnswerPossibility
{
    void CreateAnswerPossibility(AnswerPossibility answerPossibility);
    
    void UpdateAnswerPossibility(AnswerPossibility answerPossibility);
    
    void RemoveAnswerPossibility(int answerPossibilityId);
    
    AnswerPossibility ReadAnswerPossibility(int answerPossibilityId);
}