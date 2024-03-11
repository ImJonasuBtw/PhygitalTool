using Domain.Domain.Flow;

namespace DAL.EF;

public class PersistanceRepository : IRepositoryPersistance
{
    private readonly PhygitalToolDbContext _context;

    public PersistanceRepository(PhygitalToolDbContext context)
    {
        _context = context;
    }


    public void CreateUserInput(UserInput userInput)
    {
        // saves the new user input
        _context.UserInputs.Add(userInput);
        _context.SaveChanges();
    }
}