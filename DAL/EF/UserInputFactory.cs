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
            var randomAnswerPossibility = rnd.Next(0, maxAnswerPossibilities);

            string answerText = question.AnswerPossibilities(randomAnswerPossibility);
            var answerId = 0;
            
            var answer = new Answer(answerId, answerText, question.QuestionId);
            
        }
    }
    
    private void addUserInput(int answerId, int flowId, int mainThemeId, int subThemeId, int projectId)
    {
        var userInput = new UserInput(answerId, flowId, mainThemeId, subThemeId, projectId);
        _persistence.CreateUserInput(userInput);
    }

    private void addAnswer(string answerText, int questionId)
    {
        var domainAnswer = new Answer()
        {
            AnswerText = answerText,
            QuestionId = questionId
        };

        Answer newAnswer = domainAnswer;
        
        //domainFlow.FlowId = newFlow.FlowId;
    }
}