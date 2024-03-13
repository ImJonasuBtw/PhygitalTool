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
}