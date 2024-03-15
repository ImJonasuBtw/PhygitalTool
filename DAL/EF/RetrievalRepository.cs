using Domain.Domain.Flow;
using Domain.FlowPackage;
using Microsoft.EntityFrameworkCore;

namespace DAL.EF;

public class RetrievalRepository : IRepositoryRetrieval
{
    private readonly PhygitalToolDbContext _context;

    public RetrievalRepository(PhygitalToolDbContext context)
    {
        _context = context;
    }

    public Question ReadQuestion(int id)
    {
        //Return Question of a certain id
        return _context.Questions.SingleOrDefault(q => q.QuestionId == id);
    }

    public Question ReadQuestionWithAnswerPossibilities(int id)
    {
        //Return Question of a certain id with the answerPossibilities
        return _context.Questions.Include(q=>q.AnswerPossibilities).SingleOrDefault(q => q.QuestionId == id);
    }

    public IEnumerable<UserInput> ReadAllUserInputs()
    {
        //Return all userInputs
        return _context.UserInputs;
    }

    public IEnumerable<Answer> ReadAllAnswers()
    {
        //Return all Answers
        return _context.Answers;
    }

    public Flow ReadFlow(int flowId)
    {
        return _context.Flows.SingleOrDefault(f => f.FlowId == flowId);
    }

    public ICollection<Question> ReadFlowQuestions(int flowId)
    {
        var flow = _context.Flows
            .Include(f => f.Questions) // Eager loading questions
            .ThenInclude(q => q.AnswerPossibilities)
            .FirstOrDefault(f => f.FlowId == flowId); // Retrieve the flow by ID

        return flow?.Questions
            .OrderBy(q => q.QuestionId) // Order the questions
            .ToList(); // Convert to List
    }
    
    public Question ReadFirstFlowQuestion(int flowId)
    {
        var flow = _context.Flows
            .Include(f => f.Questions) // Eager loading questions
            .ThenInclude(q => q.AnswerPossibilities)
            .FirstOrDefault(f => f.FlowId == flowId); // Retrieve the flow by ID

        return flow?.Questions
            .OrderBy(q => q.QuestionId) // Order the questions
            .FirstOrDefault(); // Get the first question
    }
    
    public Question ReadNextQuestionInFlow(int flowId, int currentQuestionId)
    {
        // Retrieve all questions in the flow, ordered by QuestionId
        var questionsInFlow = ReadFlowQuestions(flowId);

        if (questionsInFlow == null || !questionsInFlow.Any())
        {
            // If there are no questions in the flow, return null
            return null;
        }

        // Find the index of the current question
        var currentQuestionIndex = questionsInFlow.ToList().FindIndex(q => q.QuestionId == currentQuestionId);

        // Check if there's a next question
        if (currentQuestionIndex >= 0 && currentQuestionIndex < questionsInFlow.Count - 1)
        {
            // If there is a next question, return it
            return questionsInFlow.ElementAt(currentQuestionIndex + 1);
        }

        // If the current question is the last one or not found, return null
        return null;
    }

    
}