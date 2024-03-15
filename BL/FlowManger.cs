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
        return  _repositoryRetrieval.ReadQuestionWithAnswerPossibilities(id);
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

    public Answer AddAnswer(int answerId,string answerDes)
    {
        //creates a new answer
        Answer answer = new Answer(answerId, answerDes);
         _repositoryPersistance.CreateAnswer(answer);
         return answer;
    }

    public IEnumerable<Answer> GetAllAnswers()
    {
        return _repositoryRetrieval.ReadAllAnswers();
    }
}