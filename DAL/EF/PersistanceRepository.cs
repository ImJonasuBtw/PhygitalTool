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
    public void CreateSubTheme(SubTheme subTheme)
    {
        _context.SubThemes.Add(subTheme);
        _context.SaveChanges();
    }

    public void CreateFlow(Flow flow)
    {
        _context.Flows.Add(flow);
        _context.SaveChanges();
    }

    public void CreateQuestion(Question question)
    {
        _context.Questions.Add(question);
        _context.SaveChanges();
    }

    public void RemoveProject(int projectId) 
    {
        // Fetch the project from the database
        var project = _context.Projects.Find(projectId);
        if (project == null)
        {
            throw new ArgumentException("Project not found");
        }
        
        _context.Projects.Remove(project);
        _context.SaveChanges();
    }

    public void UpdateProject(Project project)
    {
        // Check if the project exists in the database
        var existingProject = _context.Projects.Find(project.ProjectId);
        if (existingProject == null)
        {
            throw new ArgumentException("Project not found");
        }

        // Update properties
        existingProject.ProjectName = project.ProjectName;
        existingProject.Description = project.Description;
        existingProject.Status = project.Status;

    
        _context.SaveChanges();
    }


    public void DeleteSubTheme(int subThemeId)
    {
        // Fetch the project from the database
        var subTheme = _context.SubThemes.Find(subThemeId);
        if (subTheme == null)
        {
            throw new ArgumentException("Subtheme not found");
        }
        
        _context.SubThemes.Remove(subTheme);
        _context.SaveChanges();
    }

}