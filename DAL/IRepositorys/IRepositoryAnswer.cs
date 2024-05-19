using PhygitalTool.Domain.FlowPackage;

namespace PhygitalTool.DAL.IRepositorys;

public interface IRepositoryAnswer
{
    IEnumerable<Answer> ReadAllAnswers();
    
    IEnumerable<Answer> ReadAllAnswersWithQuestions();
    
    void CreateAnswer(Answer answer);
    
    Answer CreateAndReturnAnswer(Answer answer);
}