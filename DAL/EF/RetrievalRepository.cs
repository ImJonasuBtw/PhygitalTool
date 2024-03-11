using Domain.Flow;

namespace DAL.EF;

public class RetrievalRepository : IRepositoryRetrieval
{
    private readonly PhygitalToolDbContext _context;

    public RetrievalRepository(PhygitalToolDbContext context)
    {
        _context = context;
    }

    public Question readQuestion(int id)
    {
        //Return Question of a certain id
        return _context.Questions.SingleOrDefault(q => q.QuestionId == id);
    }
}