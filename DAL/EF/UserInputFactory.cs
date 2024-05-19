using PhygitalTool.DAL.IRepositorys;
using PhygitalTool.Domain.FlowPackage;

namespace PhygitalTool.DAL.EF;

public class UserInputFactory
{
    private readonly IRepositoryAnswer _answerRepository;
    private readonly IRepositoryUserInput _repositoryUserInput;
    private readonly IRepositoryFlow _repositoryFlow;

    public UserInputFactory(IRepositoryAnswer answerRepository, IRepositoryUserInput repositoryUserInput, IRepositoryFlow repositoryFlow)
    {
        _answerRepository = answerRepository;
        _repositoryUserInput = repositoryUserInput;
        _repositoryFlow = repositoryFlow;
    }

    public void GenerateRandomUserInputForAllFlows(int amountOfFlows, int amountOfGenerationsPerFlow)
    {
        for (int i = 1; i <= amountOfGenerationsPerFlow; i++)
        {
            for (int flowId = 1; flowId <= amountOfFlows; flowId++)
            {
                GenerateRandomUserInput(flowId);
            }
        }
    }

    public void GenerateRandomUserInput(int flowId)
    {
        var flow = _repositoryFlow.ReadFlow(flowId);
        
        foreach (var question in flow.Questions)
        {
            var rnd = new Random();

            var maxAnswerPossibilities = question.AnswerPossibilities.Count;
            var randomAnswerPossibility = rnd.Next(maxAnswerPossibilities);

            if (question.AnswerPossibilities.Count != 0)
            {
                var answerText = question.AnswerPossibilities.ElementAt(randomAnswerPossibility).Description;
                
                var answerId = AddAnswer(answerText, question.QuestionId);
                AddUserInput(
                    answerId,
                    flow.FlowId,
                    flow.SubThemeId,
                    flow.SubTheme.MainThemeId,
                    flow.SubTheme.MainTheme.ProjectId
                );
            }
        }
    }
    
    private void AddUserInput(int answerId, int flowId, int subThemeId, int mainThemeId, int projectId)
    {
        var userInput = new UserInput()
        {
            AnswerId = answerId,
            FlowId = flowId,
            SubThemeId = subThemeId,
            MainThemeId = mainThemeId,
            ProjectId = projectId
        };

        _repositoryUserInput.CreateUserInput(userInput);
    }

    private int AddAnswer(string answerText, int questionId)
    {
        var domainAnswer = new Answer()
        {
            AnswerText = answerText,
            QuestionId = questionId
        };

        var newAnswer = _answerRepository.CreateAndReturnAnswer(domainAnswer);
        domainAnswer.AnswerId = newAnswer.AnswerId;

        return domainAnswer.AnswerId;
    }
}