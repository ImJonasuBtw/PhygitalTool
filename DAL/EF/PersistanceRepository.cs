namespace DAL.EF;

public class PersistanceRepository : IRepositoryPersistance
{
    private readonly PhygitalToolDbContext _context;

    public PersistanceRepository(PhygitalToolDbContext context)
    {
        _context = context;
    }
}