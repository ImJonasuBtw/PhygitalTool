using PhygitalTool.DAL;
using PhygitalTool.Domain.FlowPackage;

namespace PhygitalTool.BL;

public class FlowManger : IFlowManager
{
    private readonly IRepositoryPersistance _repositoryPersistance;
    private readonly IRepositoryRetrieval _repositoryRetrieval;

    public FlowManger(IRepositoryPersistance repositoryPersistance, IRepositoryRetrieval repositoryRetrieval)
    {
        _repositoryPersistance = repositoryPersistance;
        _repositoryRetrieval = repositoryRetrieval;
    }

    // Returns a question based on its id
    public Question GetQuestion(int id)
    {
        return _repositoryRetrieval.ReadQuestion(id);
    }

    // Returns a question based on its id, but includes its answer possibilities
    public Question GetQuestionWithAnswerPossibilities(int id)
    {
        return _repositoryRetrieval.ReadQuestionWithAnswerPossibilities(id);
    }

    // Creates a new UserInput and returns it
    public UserInput AddUserInput(int userId, int flowId, int answerId)
    {
        UserInput userInput = new UserInput(userId, flowId, answerId);
        _repositoryPersistance.CreateUserInput(userInput);
        return userInput;
    }

    // Returns all userInputs
    public IEnumerable<UserInput> GetAllUserInputs()
    {
        return _repositoryRetrieval.ReadAllUserInputs();
    }

    // Creates a new answer using an answerId, answerDes and the questionId its connected to, and returns it.
    public Answer AddAnswer(int answerId, string answerDes, int questionId)
    {
        //creates a new answer
        Answer answer = new Answer(answerId, answerDes, questionId);
        _repositoryPersistance.CreateAnswer(answer);
        return answer;
    }

    // Returns all Answers
    public IEnumerable<Answer> GetAllAnswers()
    {
        return _repositoryRetrieval.ReadAllAnswers();
    }

    // Returns a flow based on its id
    public Flow GetFlow(int flowId)
    {
        return _repositoryRetrieval.ReadFlow(flowId);
    }

    // Returns a collection of question from a certain flow
    public ICollection<Question> GetFlowQuestions(int flowId)
    {
        return _repositoryRetrieval.ReadFlowQuestions(flowId);
    }

    // Returns the next question after currentQuestionId in a certain flow
    public Question GetNextQuestionInFlow(int flowId, int currentQuestionId)
    {
        return _repositoryRetrieval.ReadNextQuestionInFlow(flowId, currentQuestionId);
    }

    // Returns the first Question from a flow
    public Question GetFirstFlowQuestion(int flowId)
    {
        return _repositoryRetrieval.ReadFirstFlowQuestion(flowId);
    }

    // Saves contactinformation
    public void SaveContactInformation(ContactInformation contactInformation)
    {
        _repositoryPersistance.SaveContactInformation(contactInformation);
    }

    // Returns a FlowSubTheme using its flowId and subThemeId
    public FlowSubTheme GetFlowSubTheme(int flowId, int subThemeId)
    {
        return _repositoryRetrieval.ReadFlowSubTheme(flowId, subThemeId);
    }
}