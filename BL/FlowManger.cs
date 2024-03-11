using DAL;
using Domain.Domain.Flow;
using Domain.Flow;

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
}