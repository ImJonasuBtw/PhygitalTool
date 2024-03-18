using DAL;
using Domain.FlowPackage;

namespace BL;

public class FlowManger : IFlowManager
{
    private readonly IRepositoryPersistance _repositoryPersistance;
    private readonly IRepositoryRetrieval _repositoryRetrieval;

    public FlowManger(IRepositoryPersistance repositoryPersistance, IRepositoryRetrieval repositoryRetrieval)
    {
        _repositoryPersistance = repositoryPersistance;
        _repositoryRetrieval = repositoryRetrieval;
    }


    public Question GetQuestion(int id)
    {
        return _repositoryRetrieval.ReadQuestion(id);
    }

    public Question GetQuestionWithAnswerPossibilities(int id)
    {
        return _repositoryRetrieval.ReadQuestionWithAnswerPossibilities(id);
    }

    public UserInput AddUserInput(int userId, int flowId, int answerId)
    {
        //creates a new Userinput.
        UserInput userInput = new UserInput(userId, flowId, answerId);
        _repositoryPersistance.CreateUserInput(userInput);
        return userInput;
    }

    public IEnumerable<UserInput> GetAllUserInputs()
    {
        return _repositoryRetrieval.ReadAllUserInputs();
    }

    public Answer AddAnswer(int answerId, string answerDes,int Questionid)
    {
        //creates a new answer
        Answer answer = new Answer(answerId, answerDes , Questionid);
        _repositoryPersistance.CreateAnswer(answer);
        return answer;
    }

    public IEnumerable<Answer> GetAllAnswers()
    {
        return _repositoryRetrieval.ReadAllAnswers();
    }

    public Flow GetFlow(int flowId)
    {
        return _repositoryRetrieval.ReadFlow(flowId);
    }

    public ICollection<Question> GetFlowQuestions(int flowId)
    {
        return _repositoryRetrieval.ReadFlowQuestions(flowId);
    }

    public Question GetNextQuestionInFlow(int flowId, int currentQuestionId)
    {
        return _repositoryRetrieval.ReadNextQuestionInFlow(flowId, currentQuestionId);
    }

    public Question GetFirstFlowQuestion(int flowId)
    {
        return _repositoryRetrieval.ReadFirstFlowQuestion(flowId);
    }


}