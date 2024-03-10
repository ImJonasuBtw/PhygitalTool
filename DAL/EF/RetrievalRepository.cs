namespace DAL.EF;

public class RetrievalRepository : IRepositoryRetrieval
{
    private readonly PhygitalToolDbContext _context;

    public RetrievalRepository(PhygitalToolDbContext context)
    {
        _context = context;
    }
}