using PhygitalTool.Domain.FlowPackage;
using PhygitalTool.Domain.Platform;
using PhygitalTool.Domain.Projects;

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
    public Question ReadNextQuestionInFlow(int flowId, int currentQuestionId, string answer);

    // Returns the next question in a flow after given currentQuestionId
    public Question ReadFirstFlowQuestion(int flowId);
    
    public BackOffice ReadBackOfficeForManager(string managerId);
    BackOffice ReadBackOffice(int backofficeId);
    Project ReadProjectWithThemes(int projectId);
    MainTheme ReadThemeWithSubthemes(int themeId);
    SubTheme ReadSubThemeWithFlows(int subthemeId);
    SubTheme ReadSubTheme(int subTheme);
    public void UpdateSubTheme(SubTheme subTheme);
}