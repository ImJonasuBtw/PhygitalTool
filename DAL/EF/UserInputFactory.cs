using PhygitalTool.Domain.FlowPackage;

namespace PhygitalTool.DAL.EF;

public class UserInputFactory
{
    private readonly IRepositoryRetrieval _retrieval;
    private readonly IRepositoryPersistance _persistence;

    public UserInputFactory(IRepositoryRetrieval retrieval, IRepositoryPersistance persistence)
    {
        _retrieval = retrieval;
        _persistence = persistence;
    }

    public void GenerateRandomUserInput(int flowId)
    {
        var flow = _retrieval.ReadFlow(flowId);
        
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

        _persistence.CreateUserInput(userInput);
    }

    private int AddAnswer(string answerText, int questionId)
    {
        var domainAnswer = new Answer()
        {
            AnswerText = answerText,
            QuestionId = questionId
        };

        var newAnswer = _persistence.CreateAndReturnAnswer(domainAnswer);
        domainAnswer.AnswerId = newAnswer.AnswerId;

        return domainAnswer.AnswerId;
    }
}