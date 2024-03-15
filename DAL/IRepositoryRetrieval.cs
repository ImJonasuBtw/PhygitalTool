using Domain.Domain.Flow;
using Domain.FlowPackage;

namespace DAL;

public interface IRepositoryRetrieval
{
    Question ReadQuestion(int id);
    Question ReadQuestionWithAnswerPossibilities(int id);

    IEnumerable<UserInput> ReadAllUserInputs();
    IEnumerable<Answer> ReadAllAnswers();
    Flow ReadFlow(int flowId);
    public ICollection<Question> ReadFlowQuestions(int flowId);
}