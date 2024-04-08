using PhygitalTool.Domain.FlowPackage;
using PhygitalTool.Domain.Projects;

namespace PhygitalTool.DAL.EF;

public class PersistanceRepository : IRepositoryPersistance
{
    private readonly PhygitalToolDbContext _context;

    public PersistanceRepository(PhygitalToolDbContext context)
    {
        _context = context;
    }

    // Creates a new userInput
    public void CreateUserInput(UserInput userInput)
    {
        // saves the new user input
        _context.UserInputs.Add(userInput);
        _context.SaveChanges();
    }

    // Creates a new answer
    public void CreateAnswer(Answer answer)
    {
        //saves the new Answer
        _context.Answers.Add(answer);
        _context.SaveChanges();
    }

    // Saves Contact Information when user submits form.
    public void SaveContactInformation(ContactInformation contactInformation)
    {
        _context.ContactInformations.Add(contactInformation);
        _context.SaveChanges();
    }

    public void CreateProject(Project project)
    {
        _context.Projects.Add(project);
        _context.SaveChanges();
    }
}