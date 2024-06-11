using Microsoft.IdentityModel.Tokens;
using PhygitalTool.DAL.IRepositorys;
using PhygitalTool.Domain.FlowPackage;
using PhygitalTool.Domain.Projects;

namespace PhygitalTool.BL.Flows;

public class FlowManger : IFlowManager
{
    private readonly IRepositoryProject _repositoryProject;
    private readonly IRepositoryFlow _repositoryFlow;
    private readonly IRepositoryQuestion _repositoryQuestion;
    private readonly IRepositoryAnswer _answerRepository;
    private readonly IRepositoryUserInput _repositoryUserInput;
    private readonly IRepositoryContactInformation  _repositoryContactInformation;

    public FlowManger(IRepositoryProject repositoryProject, IRepositoryFlow repositoryFlow,
        IRepositoryQuestion repositoryQuestion, IRepositoryAnswer answerRepository,
        IRepositoryUserInput repositoryUserInput, IRepositoryContactInformation repositoryContactInformation)
    {
        _repositoryProject = repositoryProject;
        _repositoryFlow = repositoryFlow;
        _repositoryQuestion = repositoryQuestion;
        _answerRepository = answerRepository;
        _repositoryUserInput = repositoryUserInput;
        _repositoryContactInformation = repositoryContactInformation;
    }


    // Returns a question based on its id
    public Question GetQuestion(int id)
    {
        return _repositoryQuestion.ReadQuestion(id);
    }

    // Returns a question based on its id, but includes its answer possibilities
    public Question GetQuestionWithAnswerPossibilities(int id)
    {
        return _repositoryQuestion.ReadQuestionWithAnswerPossibilities(id);
    }

    // Creates a new UserInput and returns it
    public UserInput AddUserInput( int flowId, int answerId,int projectId, int mainThemeId, int subTheme) 
    {
        UserInput userInput = new UserInput( answerId, flowId,mainThemeId, subTheme, projectId);
        _repositoryUserInput.CreateUserInput(userInput);
        return userInput;
    }

    // Returns all userInputs
    public IEnumerable<UserInput> GetAllUserInputsForProject(int projectId)
    {
        return _repositoryUserInput.ReadAllUserInputsForProject(projectId);
    }

    // Creates a new answer using an answerId, answerDes and the questionId its connected to, and returns it.
    public Answer AddAnswer( int answerId,string answerDes, int questionId)
    {
        //creates a new answer
        Answer answer = new Answer(answerId, answerDes, questionId);
        _answerRepository.CreateAnswer(answer);
        return answer;
    }

    // Returns all Answers
    public IEnumerable<Answer> GetAllAnswers()
    {
        return _answerRepository.ReadAllAnswers();
    }

    public ProjectDTO GetProjectFromFlow(int flowId)
    {
        return _repositoryProject.ReadProjectFromFlowId(flowId);
    }
    public IEnumerable<Answer> GetAllAnswersWithQuestions() {
        return _answerRepository.ReadAllAnswersWithQuestions();
    }

    // Returns a flow based on its id
    public Flow GetFlow(int flowId)
    {
        return _repositoryFlow.ReadFlow(flowId);
    }
    
    public Flow GetFlowWithQuestionsAndNotesAndSubtheme(int flowId)
    {
        return _repositoryFlow.ReadFlowWithQuestionsAndNotesAndSubtheme(flowId);
    }


    // Returns a collection of question from a certain flow
    public ICollection<Question> GetFlowQuestions(int flowId)
    {
        return _repositoryQuestion.ReadFlowQuestions(flowId);
    }

    // Returns the next question after currentQuestionId in a certain flow
    public Question GetNextQuestionInFlow(int flowId, int currentQuestionId)
    {
        return _repositoryQuestion.ReadNextQuestionInFlow(flowId, currentQuestionId);
    }
 

    
    // Returns the first Question from a flow
    public Question GetFirstFlowQuestion(int flowId)
    {
        return _repositoryQuestion.ReadFirstFlowQuestion(flowId);
    }

    // Saves contactinformation
    public void SaveContactInformation(ContactInformation contactInformation)
    {
        _repositoryContactInformation.SaveContactInformation(contactInformation);
    }

    public void AddUserAnswer(string selectedAnswer, int currentFlow, int currentQuestion,int projectId, int mainThemeId, int subthemeId)
    {
        int newAnswerId;

        if (_answerRepository.ReadAllAnswers().IsNullOrEmpty())
        {
            newAnswerId = 1;
        }
        else
        {
            int maxAnswerId = GetAllAnswers().Max(a => a.AnswerId);
            newAnswerId = maxAnswerId + 1;
        }

        if (selectedAnswer.IsNullOrEmpty())
        {
            selectedAnswer = "no answer";
        }
        AddAnswer(newAnswerId,selectedAnswer, currentQuestion);
        AddUserInput(currentFlow, newAnswerId,  projectId, mainThemeId, subthemeId);
    }
    
    public void AddUserAnswer(string selectedAnswer, int currentFlow, int currentQuestion)
    {
        int newAnswerId;
        _repositoryQuestion.ReadQuestion(currentQuestion);
            

        if (_answerRepository.ReadAllAnswers().IsNullOrEmpty())
        {
            newAnswerId = 1;
        }
        else
        {
            int maxAnswerId = GetAllAnswers().Max(a => a.AnswerId);
            newAnswerId = maxAnswerId + 1;
        }

        if (selectedAnswer.IsNullOrEmpty())
        {
            selectedAnswer = "no answer";
        }
        AddAnswer(newAnswerId,selectedAnswer, currentQuestion);
        Flow flow = _repositoryFlow.ReadFlow(currentFlow);
        SubTheme subTheme = _repositoryProject.ReadSubTheme(flow.SubThemeId);
        MainTheme mainTheme = _repositoryProject.ReadMainTheme(subTheme.MainThemeId);
        AddUserInput(currentFlow, newAnswerId,  mainTheme.ProjectId, subTheme.MainThemeId, flow.SubThemeId);
    }

    public ICollection<UserInput> GetUserInputsForProject(int projectId)
    {
       return _repositoryUserInput.ReadAllUserInputsForProject(projectId).ToList();
    }
}

