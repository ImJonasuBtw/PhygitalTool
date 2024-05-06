using PhygitalTool.Domain.FlowPackage;
using PhygitalTool.Domain.Platform;
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

    public Answer CreateAndReturnAnswer(Answer answer)
    {
        _context.Answers.Add(answer);
        _context.SaveChanges();
        return answer;
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

    public void UpdateFlow(Flow flow)
    {
        // Check if the flow exists in the database
        var existingFlow = _context.Flows.Find(flow.FlowId);
        if (existingFlow == null)
        {
            throw new ArgumentException("Project not found");
        }

        // Update properties
        existingFlow.FlowName = flow.FlowName;
        existingFlow.FlowDescription = flow.FlowDescription;

    
        _context.SaveChanges();
    }

    public void RemoveQuestion(int questionId)
    {
        var question = _context.Questions.Find(questionId);
        if (question == null)
        {
            throw new ArgumentException("question not found");
        }
        
        _context.Questions.Remove(question);
        _context.SaveChanges();
    }

    public void UpdateQuestion(Question question)
    {
        var existingQ = _context.Questions.Find(question.QuestionId);
        if (existingQ == null)
        {
            throw new ArgumentException("question not found");
        }
        
        existingQ.QuestionText = question.QuestionText;
        existingQ.QuestionType = question.QuestionType;

    
        _context.SaveChanges();
    }

    public void updateAnswerPossibility(AnswerPossibility answerPossibility)
    {
        var existingA = _context.AnswerPossibilities.Find(answerPossibility.AnswerPossibilityId);
        if (existingA == null)
        {
            throw new ArgumentException("question not found");
        }

        existingA.Description = answerPossibility.Description;

    
        _context.SaveChanges();
    }

    public void RemoveAnswerPossibilty(int answerPossibilityId)
    {
        var answerPossibility = _context.AnswerPossibilities.Find(answerPossibilityId);
        if ( answerPossibility == null)
        {
            throw new ArgumentException(" answerPossibility not found");
        }
        
        _context.AnswerPossibilities.Remove( answerPossibility);
        _context.SaveChanges();
    }


    public void DeleteSubTheme(int subThemeId)
    {
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
        var mainTheme = _context.MainThemes.Find(mainThemeId);
        if (mainTheme == null)
        {
            throw new ArgumentException("Theme not found");
        }
        
        _context.MainThemes.Remove(mainTheme);
        _context.SaveChanges();
    }
}