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

    public Question ReadNextQuestionInFlow(int flowId, int currentQuestionId);

    public Question ReadFirstFlowQuestion(int flowId);
}