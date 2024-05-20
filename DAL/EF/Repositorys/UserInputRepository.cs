using Microsoft.EntityFrameworkCore;
using PhygitalTool.DAL.IRepositorys;
using PhygitalTool.Domain.FlowPackage;

namespace PhygitalTool.DAL.EF;

public class UserInputRepository : IRepositoryUserInput
{
    private readonly PhygitalToolDbContext _context;

    public UserInputRepository(PhygitalToolDbContext context)
    {
        _context = context;
    }

    public IEnumerable<UserInput> ReadAllUserInputsForProject(int projectId)
    {
        return _context.UserInputs.AsNoTracking().Where(ui => ui.ProjectId == projectId);
    }

    public void CreateUserInput(UserInput userInput)
    {
        _context.UserInputs.Add(userInput);
        _context.SaveChanges();
    }
}