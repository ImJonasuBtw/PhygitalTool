using Microsoft.AspNetCore.Identity;
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
    public IEnumerable<UserInput> ReadAllUserInputsForProject(int projectId)
    {
        return _context.UserInputs.Where(ui => ui.ProjectId == projectId);
    }

    // Returns all Answers
    public IEnumerable<Answer> ReadAllAnswers()
    {
        return _context.Answers;
    }
    public IEnumerable<Answer> ReadAllAnswersWithQuestions()
    {
        var answersWithQuestions = _context.Answers.Select(answer => new Answer
        {
            AnswerId = answer.AnswerId,
            AnswerText = answer.AnswerText,
            QuestionId = answer.QuestionId,
            Question = _context.Questions.FirstOrDefault(question => question.QuestionId == answer.QuestionId)
        });

        return answersWithQuestions;
    }


    // Returns a flow with FlowSubTheme and SubTheme
    public Flow ReadFlow(int flowId)
    {
        return _context.Flows
            .Include(fst => fst.SubTheme)
            .ThenInclude(m => m.MainTheme)
            .Include(flow => flow.Questions)
            .ThenInclude(q => q.AnswerPossibilities)
            .SingleOrDefault(f => f.FlowId == flowId);
    }

    public ProjectDTO readProjectFromFlowId(int flowId)
    {
        var flow = _context.Flows
            .Include(f => f.SubTheme)
            .SingleOrDefault(f => f.FlowId == flowId);

        var subtheme = _context.SubThemes
            .SingleOrDefault(s => s.SubThemeId == flow.SubThemeId);

        var maintheme = _context.MainThemes
            .SingleOrDefault(m => m.ThemeId == subtheme.MainThemeId);

        var project = _context.Projects
            .SingleOrDefault(p => p.ProjectId == maintheme.ProjectId);
        // Controleer of de flow gevonden is
        if (flow != null)
        {
            var projectDTO = new ProjectDTO()
            {
                ProjectId = project.ProjectId
            };
            // Retourneer het project gekoppeld aan de flow
            return projectDTO;
        }
        else
        {
            // Als de flow niet gevonden is, retourneer null of verhoog een fout indien nodig
            return null;
        }
    }

    // Returns a collection of questions from a certain flow
    public ICollection<Question> ReadFlowQuestions(int flowId)
    {
        var flow = _context.Flows
            .Include(f => f.Questions) 
            .ThenInclude(q => q.AnswerPossibilities)
            .FirstOrDefault(f => f.FlowId == flowId); 

        return flow?.Questions
            .OrderBy(q => q.QuestionId) 
            .ToList(); 
    }

    // Returns the first question of a flow
    public Question ReadFirstFlowQuestion(int flowId)
    {
        var flow = _context.Flows
            .Include(f => f.Questions) 
            .ThenInclude(q => q.AnswerPossibilities)
            .FirstOrDefault(f => f.FlowId == flowId); 

        return flow?.Questions
            .OrderBy(q => q.QuestionId) 
            .FirstOrDefault(); 
    }

    // Returns the next question in a flow after given currentQuestionId
    public Question ReadNextQuestionInFlow(int flowId, int currentQuestionId, string answer)
    {
        
        var questionsInFlow = ReadFlowQuestions(flowId);
        Question currentQuestion = ReadQuestion(currentQuestionId);

        if (currentQuestion.IsConditional)
        {
            foreach (var answerPossibility in ReadQuestionWithAnswerPossibilities(currentQuestionId).AnswerPossibilities)
            {
                if (answer == answerPossibility.Description)
                {
                    
                    if (answerPossibility.NextQuestionId != 0)
                    {
                        return questionsInFlow.FirstOrDefault(q => q.QuestionId == answerPossibility.NextQuestionId);
                    }

               
                    var currentQuestionIndex = questionsInFlow.ToList().FindIndex(q => q.QuestionId == currentQuestionId);

          
                    if (currentQuestionIndex >= 0 && currentQuestionIndex < questionsInFlow.Count - 1)
                    {
                       
                        return questionsInFlow.ElementAt(currentQuestionIndex + 1);
                    }
                }
            }
        }
        else
        {
            // If the current question is not conditional, proceed with the default logic to get the next question
            var currentQuestionIndex = questionsInFlow.ToList().FindIndex(q => q.QuestionId == currentQuestionId);

            // Check if there's a next question
            if (currentQuestionIndex >= 0 && currentQuestionIndex < questionsInFlow.Count - 1)
            {
                // If there is a next question, return it
                return questionsInFlow.ElementAt(currentQuestionIndex + 1);
            }
        }

        // If there's no next question in the flow, return null
        return null;
    }






    // Returns the next question in a flow after given currentQuestionId
    public Question ReadNextQuestionInFlow(int flowId, int currentQuestionId)
    {
     
        var questionsInFlow = ReadFlowQuestions(flowId);

        if (questionsInFlow == null || !questionsInFlow.Any())
        {
           
            return null;
        }


        var currentQuestionIndex = questionsInFlow.ToList().FindIndex(q => q.QuestionId == currentQuestionId);

  
        if (currentQuestionIndex >= 0 && currentQuestionIndex < questionsInFlow.Count - 1)
        {
          
            return questionsInFlow.ElementAt(currentQuestionIndex + 1);
        }

        
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
            .Include(project => project.BackOffice)
            .ThenInclude(office => office.Managers)
            .FirstOrDefault(p => p.ProjectId == projectId);
    }

    public MainTheme ReadThemeWithSubthemes(int themeId)
    {
        return _context.MainThemes
            .Include(t => t.SubThemes)
            .ThenInclude(theme => theme.Flows)
            .Include(mt => mt.Project )
            .ThenInclude(project => project.BackOffice)
            .ThenInclude(office => office.Managers)
            .FirstOrDefault(theme => theme.ThemeId == themeId);
    }

    public SubTheme ReadSubThemeWithFlows(int subThemeId)
    {
        return _context.SubThemes
            .Include(s => s.Flows)
            .Include(theme => theme.MainTheme)
            .ThenInclude(theme => theme.Project)
            .ThenInclude(project => project.BackOffice)
            .ThenInclude(office => office.Managers)
            .FirstOrDefault(subTheme => subTheme.SubThemeId == subThemeId);
    }

    public SubTheme ReadSubTheme(int subThemeId)
    {
        return _context.SubThemes.FirstOrDefault(subTheme => subTheme.SubThemeId == subThemeId);
    }
    public MainTheme ReadMainTheme(int mainThemeId)
    {
        try
        {
            return _context.MainThemes.FirstOrDefault(mainTheme => mainTheme.ThemeId == mainThemeId);
        }
        catch (Exception ex)
        {
            // Voeg logging toe om de exacte fout te zien
            Console.WriteLine($"Fout bij het ophalen van hoofdthema: {ex}");
            throw; // Of retourneer null of een foutindicatie, afhankelijk van de gewenste foutafhandeling
        }
    }


    public void UpdateSubTheme(SubTheme updatedSubTheme)
    {
            // Zoek het bestaande subthema op basis van het meegegeven ID
            var existingSubTheme = _context.SubThemes.FirstOrDefault(subTheme => subTheme.SubThemeId == updatedSubTheme.SubThemeId);

            // Controleer of het subthema bestaat
            if (existingSubTheme != null)
            {
                // Werk de eigenschappen van het bestaande subthema bij met de waarden van het bijgewerkte subthema
                existingSubTheme.SubThemeName = updatedSubTheme.SubThemeName;
                existingSubTheme.SubThemeInformation = updatedSubTheme.SubThemeInformation;

                // Sla de wijzigingen op in de database
                _context.SaveChanges();
            }
            else
            {
                // Het subthema werd niet gevonden, dus log een fout of voer andere gewenste acties uit
                // Bijvoorbeeld:
                throw new ArgumentException("Het subthema kon niet worden gevonden.");
            }
    }
    
    public void UpdateMainTheme(MainTheme updatedMainTheme)
    {
        // Zoek het bestaande subthema op basis van het meegegeven ID
        var existingMainTheme = _context.MainThemes.FirstOrDefault(theme => theme.ThemeId == updatedMainTheme.ThemeId);

        // Controleer of het subthema bestaat
        if (existingMainTheme != null)
        {
            // Werk de eigenschappen van het bestaande subthema bij met de waarden van het bijgewerkte subthema
            existingMainTheme.ThemeName = updatedMainTheme.ThemeName;
            existingMainTheme.MainThemeInformation = updatedMainTheme.MainThemeInformation;

            // Sla de wijzigingen op in de database
            _context.SaveChanges();
        }
        else
        {
            // Het subthema werd niet gevonden, dus log een fout of voer andere gewenste acties uit
            // Bijvoorbeeld:
            throw new ArgumentException("Het thema kon niet worden gevonden.");
        }
    }

    public IEnumerable<Supervisor> ReadSuperVisorsForBackoffice(int backofficeId)
    {
        var supervisors = _context.BackOffices
            .Where(b => b.BackOfficeId == backofficeId) 
            .SelectMany(b => b.Supervisors)   
            .ToList();

        return supervisors;
    }

    public Flow ReadFlowWithQuestionAndAnswerpossibilities(int Flowid)
    {
        return _context.Flows
            .Include(f => f.Questions)
            .ThenInclude(question =>question.AnswerPossibilities )
            .FirstOrDefault(flow => flow.FlowId == Flowid);
    }

    public AdminPlatform ReadAdminPlatform()
    {
        return _context.AdminPlatforms
            .Include(a => a.BackOffices)
            .Include(a => a.Admins)
            .FirstOrDefault();
    }

    public IEnumerable<Idea> readAllIdeas()
    {
        return _context.Ideas.Include(u =>u.Comments).ThenInclude(c =>c.User)
            .Include(i =>i.User);
            
    }

    public IdentityUser getUser(string userId)
    {
            return _context.Users
                .FirstOrDefault(u => u.Id == userId);
        
    }

    public void updateLikeIdea(Idea idea)
    {
        var existingIdea = _context.Ideas.FirstOrDefault(i => i.IdeaId == idea.IdeaId);

        
        if (existingIdea != null)
        {
            existingIdea.Likes = idea.Likes;
                
            _context.SaveChanges();
        }
        else
        {
            throw new ArgumentException("Het idea kon niet worden gevonden.");
        }
    }

    public Idea getIdea(int id)
    {
       return _context.Ideas.FirstOrDefault(i => i.IdeaId == id);
    }

    public IEnumerable<Manager> ReadManagers()
    {
        return _context.Managers.ToList();
    }

    public IEnumerable<BackOffice> readBackoffices()
    {
        return _context.BackOffices.ToList();
    }

    public AdminPlatform ReadAdminPlatform()
    {
        return _context.AdminPlatforms
            .Include(a => a.BackOffices)
            .Include(a => a.Admins)
            .FirstOrDefault();
    }
}