using PhygitalTool.Domain.FlowPackage;

namespace PhygitalTool.DAL.IRepositorys;

public interface IRepositoryQuestion
{
    Question ReadQuestion(int id);
    
    Question ReadQuestionWithAnswerPossibilities(int id);
    
    Question CreateQuestion(Question question);
    
    void RemoveQuestion(int questionId);
    
    void UpdateQuestion(Question question);
    
    Question ReadFirstFlowQuestion(int flowId);

    Question ReadNextQuestionInFlow(int flowId, int currentQuestionId, string answer);
    
    Question ReadNextQuestionInFlow(int flowId, int currentQuestionId);
    
    ICollection<Question> ReadFlowQuestions(int flowId);
}