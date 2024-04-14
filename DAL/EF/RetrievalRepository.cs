using Microsoft.EntityFrameworkCore;
using PhygitalTool.Domain.FlowPackage;
using PhygitalTool.Domain.Platform;
using PhygitalTool.Domain.Projects;

namespace PhygitalTool.DAL.EF;

public class RetrievalRepository : IRepositoryRetrieval
{
    private readonly PhygitalToolDbContext _context;

    public RetrievalRepository(PhygitalToolDbContext context)
    {
        _context = context;
    }

    // Returns Question of a certain id
    public Question ReadQuestion(int id)
    {
        return _context.Questions.SingleOrDefault(q => q.QuestionId == id);
    }

    // Returns Question of a certain id with the answerPossibilities
    public Question ReadQuestionWithAnswerPossibilities(int id)
    {
        return _context.Questions.Include(q => q.AnswerPossibilities).SingleOrDefault(q => q.QuestionId == id);
    }

    // Returns all userInputs
    public IEnumerable<UserInput> ReadAllUserInputs()
    {
        return _context.UserInputs;
    }

    // Returns all Answers
    public IEnumerable<Answer> ReadAllAnswers()
    {
        return _context.Answers;
    }

    // Returns a flow with FlowSubTheme and SubTheme
    public Flow ReadFlow(int flowId)
    {
        return _context.Flows
            .Include(fst => fst.SubTheme)
            .SingleOrDefault(f => f.FlowId == flowId);
    }

    // Returns a collection of questions from a certain flow
    public ICollection<Question> ReadFlowQuestions(int flowId)
    {
        var flow = _context.Flows
            .Include(f => f.Questions) // Eager loading questions
            .ThenInclude(q => q.AnswerPossibilities)
            .FirstOrDefault(f => f.FlowId == flowId); // Retrieve the flow by ID

        return flow?.Questions
            .OrderBy(q => q.QuestionId) // Order the questions
            .ToList(); // Convert to List
    }

    // Returns the first question of a flow
    public Question ReadFirstFlowQuestion(int flowId)
    {
        var flow = _context.Flows
            .Include(f => f.Questions) // Eager loading questions
            .ThenInclude(q => q.AnswerPossibilities)
            .FirstOrDefault(f => f.FlowId == flowId); // Retrieve the flow by ID

        return flow?.Questions
            .OrderBy(q => q.QuestionId) // Order the questions
            .FirstOrDefault(); // Get the first question
    }

    // Returns the next question in a flow after given currentQuestionId
    public Question ReadNextQuestionInFlow(int flowId, int currentQuestionId)
    {
        // Retrieve all questions in the flow, ordered by QuestionId
        var questionsInFlow = ReadFlowQuestions(flowId);

        if (questionsInFlow == null || !questionsInFlow.Any())
        {
            // If there are no questions in the flow, return null
            return null;
        }

        // Find the index of the current question
        var currentQuestionIndex = questionsInFlow.ToList().FindIndex(q => q.QuestionId == currentQuestionId);

        // Check if there's a next question
        if (currentQuestionIndex >= 0 && currentQuestionIndex < questionsInFlow.Count - 1)
        {
            // If there is a next question, return it
            return questionsInFlow.ElementAt(currentQuestionIndex + 1);
        }

        // If the current question is the last one or not found, return null
        return null;
    }

    // Returns the backoffice with projects of a specific manager
    public BackOffice ReadBackOfficeForManager(string managerId)
    {
  
        var backOfficeId = _context.Managers
            .Where(manager => manager.Id == managerId)
            .Select(manager => manager.BackOfficeId) 
            .FirstOrDefault();

        
        var backOffice = _context.BackOffices
            .Include(bo => bo.Projects)
            .Include(bo => bo.Managers)
            .FirstOrDefault(bo => bo.BackOfficeId == backOfficeId);

        return backOffice;
    }

    public BackOffice ReadBackOffice(int backofficeId)
    {
        return _context.BackOffices
            .Include(bo => bo.Projects)
            .SingleOrDefault(office => office.BackOfficeId == backofficeId);
    }

    public Project ReadProjectWithThemes(int projectId)
    {
        return _context.Projects
            .Include(p => p.MainThemes)
            .FirstOrDefault(p => p.ProjectId == projectId);
    }

    public MainTheme ReadThemeWithSubthemes(int themeId)
    {
        return _context.MainThemes
            .Include(t => t.SubThemes)
            .FirstOrDefault(theme => theme.ThemeId == themeId);
    }

    public SubTheme ReadSubThemeWithFlows(int subThemeId)
    {
        return _context.SubThemes
            .Include(s => s.Flows)
            .FirstOrDefault(subTheme => subTheme.SubThemeId == subThemeId);
    }
}