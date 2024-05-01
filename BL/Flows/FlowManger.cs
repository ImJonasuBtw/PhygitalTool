using Microsoft.IdentityModel.Tokens;
using PhygitalTool.DAL;
using PhygitalTool.Domain.FlowPackage;
using PhygitalTool.Domain.Projects;
using PhygitalTool.Domain.Util;

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
    public UserInput AddUserInput( int flowId, int answerId,int projectId, int mainThemeId, int subTheme) 
    {
        UserInput userInput = new UserInput( answerId, flowId,mainThemeId, subTheme, projectId);
        _repositoryPersistance.CreateUserInput(userInput);
        return userInput;
    }

    // Returns all userInputs
    public IEnumerable<UserInput> GetAllUserInputsForProject(int projectId)
    {
        return _repositoryRetrieval.ReadAllUserInputsForProject(projectId);
    }

    // Creates a new answer using an answerId, answerDes and the questionId its connected to, and returns it.
    public Answer AddAnswer( int answerId,string answerDes, int questionId)
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
    
    public IEnumerable<Answer> GetAllAnswersWithQuestions() {
        return _repositoryRetrieval.ReadAllAnswersWithQuestions();
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
    public Question GetNextQuestionInFlow(int flowId, int currentQuestionId, string answer)
    {
        return _repositoryRetrieval.ReadNextQuestionInFlow(flowId, currentQuestionId, answer);
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

    public void SaveUserAnswer(string selectedAnswer, int currentFlow, int currentQuestion,int projectId, int mainThemeId, int subthemeId)
    {
        int newAnswerId;

        if (_repositoryRetrieval.ReadAllAnswers().IsNullOrEmpty())
        {
            newAnswerId = 1;
        }
        else
        {
            int MaxAnswerId = GetAllAnswers().Max(a => a.AnswerId);
            newAnswerId = MaxAnswerId + 1;
        }

        if (selectedAnswer.IsNullOrEmpty())
        {
            selectedAnswer = "no answer";
        }
        AddAnswer(newAnswerId,selectedAnswer, currentQuestion);
        AddUserInput(currentFlow, newAnswerId,  projectId, mainThemeId, subthemeId);
    }
    public void SaveUserAnswer(string selectedAnswer, int currentFlow, int currentQuestion)
    {
        int newAnswerId;
        _repositoryRetrieval.ReadQuestion(currentQuestion);
            

        if (_repositoryRetrieval.ReadAllAnswers().IsNullOrEmpty())
        {
            newAnswerId = 1;
        }
        else
        {
            int MaxAnswerId = GetAllAnswers().Max(a => a.AnswerId);
            newAnswerId = MaxAnswerId + 1;
        }

        if (selectedAnswer.IsNullOrEmpty())
        {
            selectedAnswer = "no answer";
        }
        AddAnswer(newAnswerId,selectedAnswer, currentQuestion);
        Flow flow = _repositoryRetrieval.ReadFlow(currentFlow);
        SubTheme subTheme = _repositoryRetrieval.ReadSubTheme(flow.SubThemeId);
        MainTheme mainTheme = _repositoryRetrieval.ReadMainTheme(subTheme.MainThemeId);
        AddUserInput(currentFlow, newAnswerId,  mainTheme.ProjectId, subTheme.MainThemeId, flow.SubThemeId);
    }

    public ICollection<UserInput> GetUserInputsForProject(int projectId)
    {
       return _repositoryRetrieval.ReadAllUserInputsForProject(projectId).ToList();
    }
}

