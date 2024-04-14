using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using PhygitalTool.Domain.FlowPackage;
using PhygitalTool.Domain.Platform;
using PhygitalTool.Domain.Projects;

namespace PhygitalTool.DAL.EF;

public class RetrievalRepository : IRepositoryRetrieval
{
    private readonly PhygitalToolDbContext _context;
    private readonly ILogger<RetrievalRepository> _logger;

    public RetrievalRepository(PhygitalToolDbContext context, ILogger<RetrievalRepository> logger)
    {
        _context = context;
        _logger = logger;
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

    public Answer ReadAnswer(int answerId)
    {
        return _context.Answers.SingleOrDefault(a => a.AnswerId == answerId);
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
            .Include(f => f.FlowSubThemes)
            .ThenInclude(fst => fst.SubTheme)
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
    public Question ReadNextQuestionInFlow(int flowId, int currentQuestionId, string answer)
    {
        // Retrieve all questions in the flow, ordered by QuestionId
        var questionsInFlow = ReadFlowQuestions(flowId);
        Question currentQuestion = ReadQuestion(currentQuestionId);

        if (currentQuestion.IsConditional)
        {
            foreach (var answerPossibility in ReadQuestionWithAnswerPossibilities(currentQuestionId).AnswerPossibilities)
            {
                if (answer == answerPossibility.Description)
                {
                    _logger.LogInformation("Antwoordovereenkomst gevonden voor vraag ID: " + answerPossibility.NextQuestionId);
                    // Return the next question if found based on the answer possibility
                    return questionsInFlow.FirstOrDefault(q => q.QuestionId == answerPossibility.NextQuestionId);
                    
                }
            }
            // If the answer does not match any answer possibility, throw an exception
            throw new Exception("Het gegeven antwoord komt niet overeen met een geldige optie voor deze vraag: " + currentQuestionId);
        }

        // If the current question is not conditional, proceed with the default logic to get the next question
        if (questionsInFlow == null || !questionsInFlow.Any())
        {
            // If there are no questions in the flow, throw an exception
            throw new Exception("Er zijn geen vragen beschikbaar in deze stroom.");
        }
        throw new Exception("De huidige vraag is de laatste in de stroom of kan niet worden gevonden, en er is geen volgende vraag beschikbaar.");
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


    // Returns a FlowSubTheme using a flowId and subThemeId
    public FlowSubTheme ReadFlowSubTheme(int flowId, int subThemeId)
    {
        return _context.FlowSubThemes
            .Include(f => f.Flow)
            .Include(s => s.SubTheme)
            .FirstOrDefault(flowSubTheme =>
                flowSubTheme.Flow.FlowId == flowId && flowSubTheme.SubTheme.SubThemeId == subThemeId);
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

    public SubTheme ReadSubthemeWithFlowSubthemes(int subThemeId)
    {
        return _context.SubThemes
            .Include(theme => theme.FlowSubThemes)
            .ThenInclude(theme => theme.Flow)
            .FirstOrDefault(theme => theme.SubThemeId == subThemeId);
    }
}