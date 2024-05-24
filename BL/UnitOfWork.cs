using PhygitalTool.DAL.EF;

namespace PhygitalTool.BL;

public class UnitOfWork
{
    private readonly PhygitalToolDbContext _dbContext;

    public UnitOfWork(PhygitalToolDbContext dbContext)
    {
        _dbContext = dbContext;
    }
    
    public void BeginTransaction()
    {
        _dbContext.Database.BeginTransaction();
    }
    
    public void Commit()
    {
        _dbContext.SaveChanges();
        _dbContext.Database.CommitTransaction();
    }
    
}