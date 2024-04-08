using PhygitalTool.Domain.FlowPackage;
using PhygitalTool.Domain.Platform;

namespace PhygitalTool.DAL;

public interface IRepositoryRetrieval
{
    // Returns Question of a certain id
    Question ReadQuestion(int id);

    // Returns Question of a certain id with the answerPossibilities
    Question ReadQuestionWithAnswerPossibilities(int id);

    // Returns all userInputs
    IEnumerable<UserInput> ReadAllUserInputs();

    // Returns all Answers
    IEnumerable<Answer> ReadAllAnswers();

    // Returns a flow with FlowSubTheme and SubTheme
    Flow ReadFlow(int flowId);

    // Returns a collection of questions from a certain flow
    public ICollection<Question> ReadFlowQuestions(int flowId);

    // Returns the first question of a flow
    public Question ReadNextQuestionInFlow(int flowId, int currentQuestionId);

    // Returns the next question in a flow after given currentQuestionId
    public Question ReadFirstFlowQuestion(int flowId);

    // Returns a FlowSubTheme using a flowId and subThemeId
    public FlowSubTheme ReadFlowSubTheme(int flowId, int subThemeId);
    public BackOffice ReadBackOfficeForManager(string managerId);
    BackOffice ReadBackOffice(int backofficeId);
}