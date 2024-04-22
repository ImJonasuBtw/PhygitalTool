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
    public void CreateMainTheme(MainTheme mainTheme)
    {
        _context.MainThemes.Add(mainTheme);
        _context.SaveChanges();
    }

    public Flow CreateFlow(Flow flow)
    {
        _context.Flows.Add(flow);
        _context.SaveChanges();
        var createdFlow =
            _context.Flows.FirstOrDefault(f =>
                f.FlowName == flow.FlowName && f.FlowDescription == flow.FlowDescription);

        return createdFlow;
    }

    public Question CreateQuestion(Question question)
    {
        _context.Questions.Add(question);
        _context.SaveChanges();
        var createdQuestion = _context.Questions.FirstOrDefault(q =>
            q.QuestionText == question.QuestionText && q.QuestionType == question.QuestionType);
        return createdQuestion;
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

    public void createAnswerPossilility(AnswerPossibility answerPossibility)
    {
        _context.AnswerPossibilities.Add(answerPossibility);
        _context.SaveChanges();
    }

    public void RemoveFlow(int FlowId)
    {
        var flow = _context.Flows.Find(FlowId);
        if (flow == null)
        {
            throw new ArgumentException("flow not found");
        }
        
        _context.Flows.Remove(flow);
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

    public void DeleteMainTheme(int mainThemeId)
    {
        // Fetch the project from the database
        var mainTheme = _context.MainThemes.Find(mainThemeId);
        if (mainTheme == null)
        {
            throw new ArgumentException("Theme not found");
        }
        
        _context.MainThemes.Remove(mainTheme);
        _context.SaveChanges();
    }
}