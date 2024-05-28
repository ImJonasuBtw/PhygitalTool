using PhygitalTool.DAL.IRepositorys;
using PhygitalTool.Domain.FlowPackage;
using PhygitalTool.Domain.Projects;
using PhygitalTool.Domain.Util;

namespace PhygitalTool.BL.BackOffice;

public class ProjectManager : IProjectManager
{
    private readonly IRepositoryProject _repositoryProject;
    private readonly IRepositoryFlow _repositoryFlow;
    private readonly IRepositoryQuestion _repositoryQuestion;
    private readonly IRepositoryAnswerPossibility _answerPossibilityRepository;
    private readonly IRepositoryNote _noteRepository;

    public ProjectManager(IRepositoryProject repositoryProject, IRepositoryFlow repositoryFlow,
        IRepositoryQuestion repositoryQuestion, IRepositoryAnswerPossibility answerPossibilityRepository,
        IRepositoryNote noteRepository)
    {
        _repositoryProject = repositoryProject;
        _repositoryFlow = repositoryFlow;
        _repositoryQuestion = repositoryQuestion;
        _answerPossibilityRepository = answerPossibilityRepository;
        _noteRepository = noteRepository;
    }

    public void AddProject(string description, string projectName, DateTime creationDate, ProjectStatus status,
        int backOfficeId)
    {
        var newProject = new Project
        {
            Description = description,
            ProjectName = projectName,
            CreationDate = creationDate,
            Status = status,
            BackOfficeId = backOfficeId
        };
        _repositoryProject.CreateProject(newProject);
    }

    public void AddNote(int questionId, string noteDesc)
    {
        var newNote = new Note
        {
            QuestionId = questionId,
            Description = noteDesc
        };
        _noteRepository.CreateNote(newNote);
    }

    public IEnumerable<Note> GetNotes()
    {
        return _noteRepository.ReadAllNotes();
    }

    public void AddSubTheme(string subThemeName, string subThemeInformation, int mainThemeId)
    {
        var newSubTheme = new SubTheme
        {
            SubThemeName = subThemeName,
            SubThemeInformation = subThemeInformation,
            MainThemeId = mainThemeId
        };
        _repositoryProject.CreateSubTheme(newSubTheme);
    }

    public void AddMainTheme(string mainThemeName, string mainThemeInformation, int projectId)
    {
        var newMainTheme = new MainTheme
        {
            ThemeName = mainThemeName,
            MainThemeInformation = mainThemeInformation,
            ProjectId = projectId
        };
        _repositoryProject.CreateMainTheme(newMainTheme);
    }

    public void DeleteSubTheme(int subThemeId)
    {
        _repositoryProject.DeleteSubTheme(subThemeId);
    }

    public void DeleteMainTheme(int mainThemeId)
    {
        _repositoryProject.DeleteMainTheme(mainThemeId);
    }

    public Project GetProjectWithThemes(int projectId)
    {
        return _repositoryProject.ReadProjectWithThemes(projectId);
    }

    public MainTheme GetThemeWithSubthemes(int themeId)
    {
        return _repositoryProject.ReadThemeWithSubthemes(themeId);
    }

    public SubTheme GetSubThemeWithFlows(int subThemeId)
    {
        return _repositoryProject.ReadSubThemeWithFlows(subThemeId);
    }

    public Flow AddFlow(Flow flow)
    {
        return _repositoryFlow.CreateFlow(flow);
    }

    public Question AddQuestion(Question question)
    {
        return _repositoryQuestion.CreateQuestion(question);
    }

    public void AddAnswerPossibility(AnswerPossibility answerPossibility)
    {
        _answerPossibilityRepository.CreateAnswerPossibility(answerPossibility);
    }

    public void UpdateProject(string projectName, string projectDesc, ProjectStatus projectStatus, int projectId)
    {
        try
        {
            var existingProject = GetProjectWithThemes(projectId);

            existingProject.ProjectName = projectName;
            existingProject.Description = projectDesc;
            existingProject.Status = projectStatus;
            _repositoryProject.UpdateProject(existingProject);
        }
        catch (Exception e)
        {
            Console.WriteLine(e.Message);
            throw;
        }
    }

    public void DeleteFlow(int flowId)
    {
        _repositoryFlow.RemoveFlow(flowId);
    }

    public Flow GetFlowWithQuestionAndAnswerPossibilities(int flowId)
    {
        return _repositoryFlow.ReadFlowWithQuestionAndAnswerpossibilities(flowId);
    }

    public void UpdateFlow(Flow flow)
    {
        _repositoryFlow.UpdateFlow(flow);
    }

    public void DeleteQuestion(int questionId)
    {
        _repositoryQuestion.RemoveQuestion(questionId);
    }

    public void UpdateQuestion(Question question)
    {
        _repositoryQuestion.UpdateQuestion(question);
    }

    public Question GetQuestion(int questionId)
    {
        return _repositoryQuestion.ReadQuestion(questionId);
    }

    public void UpdateAnswerPossibility(AnswerPossibility answerPossibility)
    {
        _answerPossibilityRepository.UpdateAnswerPossibility(answerPossibility);
    }

    public void DeleteAnswerPossibility(int answerPossibilityId)
    {
        _answerPossibilityRepository.RemoveAnswerPossibility(answerPossibilityId);
    }

    public void DeleteProject(int projectId)
    {
        _repositoryProject.RemoveProject(projectId);
    }

    public SubTheme GetSubTheme(int subThemeId)
    {
        return _repositoryProject.ReadSubTheme(subThemeId);
    }

    public MainTheme GetMainTheme(int mainthemeId)
    {
        return _repositoryProject.ReadMainTheme(mainthemeId);
    }

    public void UpdateSubTheme(int subThemeId, string subThemeName, string subThemeInformation)
    {
        var existingSubTheme = GetSubThemeWithFlows(subThemeId);
        if (existingSubTheme == null)
        {
            throw new Exception($"Subtheme with ID {subThemeId} not found.");
        }

        existingSubTheme.SubThemeName = subThemeName;
        existingSubTheme.SubThemeInformation = subThemeInformation;
        
        _repositoryProject.UpdateSubTheme(existingSubTheme);
    }

    public void UpdateMainTheme(int mainThemeId, string mainThemeName, string mainThemeInformation)
    {
        var existingMainTheme = GetThemeWithSubthemes(mainThemeId);
        if (existingMainTheme == null)
        {
            throw new Exception($"Main theme with ID {mainThemeId} not found.");
        }

        existingMainTheme.ThemeName = mainThemeName;
        existingMainTheme.MainThemeInformation = mainThemeInformation;
        
        _repositoryProject.UpdateMainTheme(existingMainTheme);
    }

    public Flow AddFlowWithQuestionsAndAnswers(string flowDescription, string flowName, string flowImage, FlowType flowType,
        Language language, int subthemeId,
        List<(string QuestionText, QuestionType questionType, string QuestionImage, List<string> AnswerDescriptions)>
            questions)
    {
        var domainFlow = new Flow()
        {
            FlowDescription = flowDescription,
            FlowName = flowName,
            FlowType = flowType,
            Language = language,
            SubThemeId = subthemeId,
            FlowImage = flowImage
        };

        Flow newFlow = AddFlow(domainFlow);
        domainFlow.FlowId = newFlow.FlowId;

        if (questions != null && questions.Count > 0)
        {
            foreach (var (questionText, questionType, questionImage, answerDescriptions) in questions)
            {
                var domainQuestion = new Question()
                {
                    QuestionText = questionText,
                    QuestionType = questionType,
                    QuestionImage = questionImage,
                    FlowId = newFlow.FlowId,
                };
                Question newQuestion = AddQuestion(domainQuestion);
                domainQuestion.QuestionId = newQuestion.QuestionId;
                newFlow.Questions.Add(domainQuestion);

                if (answerDescriptions != null && answerDescriptions.Any())
                {
                    foreach (var answer in answerDescriptions)
                    {
                        var domainAnswer = new AnswerPossibility()
                        {
                            Description = answer,
                            QuestionId = newQuestion.QuestionId
                        };
                        AddAnswerPossibility(domainAnswer);
                        domainQuestion.AnswerPossibilities.Add(domainAnswer);
                    }
                }
            }
        }
        return newFlow;
    }
    
    public void UpdateFlowWithQuestionsAndAnswers(
        int flowId,
        string flowName,
        string flowImage,
        string flowDescription,
        FlowType flowType,
        Language language,
        List<Question> questions)
    {
        var existingFlow = _repositoryFlow.ReadFlowWithQuestionAndAnswerpossibilities(flowId);
        if (existingFlow == null)
        {
            throw new Exception($"Flow with ID {flowId} not found.");
        }

        existingFlow.FlowName = flowName;
        existingFlow.FlowImage = flowImage;
        existingFlow.FlowDescription = flowDescription;
        existingFlow.FlowType = flowType;
        existingFlow.Language = language;

        // Handle new questions
        var newQuestions = questions.Where(q => !existingFlow.Questions.Any(eq => eq.QuestionId == q.QuestionId))
            .ToList();
        foreach (var newQuestion in newQuestions)
        {
            var domainQuestion = new Question
            {
                QuestionText = newQuestion.QuestionText,
                QuestionType = newQuestion.QuestionType,
                QuestionImage = newQuestion.QuestionImage,
                FlowId = flowId
            };
            _repositoryQuestion.CreateQuestion(domainQuestion);
            existingFlow.Questions.Add(domainQuestion);
            foreach (var newAnswerPossibility in newQuestion.AnswerPossibilities)
            {
                var domainAnswer = new AnswerPossibility
                {
                    Description = newAnswerPossibility.Description,
                    QuestionId = domainQuestion.QuestionId
                };
                _answerPossibilityRepository.CreateAnswerPossibility(domainAnswer);
                domainQuestion.AnswerPossibilities.Add(domainAnswer);
            }
        }

        // Handle existing questions and their answers
        foreach (var existingQuestion in existingFlow.Questions)
        {
            var updatedQuestion = questions.FirstOrDefault(q => q.QuestionId == existingQuestion.QuestionId);
            if (updatedQuestion != null)
            {
                existingQuestion.QuestionText = updatedQuestion.QuestionText;
                existingQuestion.QuestionImage = updatedQuestion.QuestionImage;
                existingQuestion.QuestionType = updatedQuestion.QuestionType;
                _repositoryQuestion.UpdateQuestion(existingQuestion);

                foreach (var updatedAnswer in updatedQuestion.AnswerPossibilities)
                {
                    var existingAnswer = _answerPossibilityRepository.ReadAnswerPossibility(updatedAnswer.AnswerPossibilityId);
                    
                    if (existingAnswer != null)
                    {
                        existingAnswer.Description = updatedAnswer.Description;
                        existingAnswer.QuestionId = updatedAnswer.QuestionId;
                        _answerPossibilityRepository.UpdateAnswerPossibility(existingAnswer);
                    }
                    else
                    {
                        var domainAnswer = new AnswerPossibility
                        {
                            Description = updatedAnswer.Description,
                            QuestionId = existingQuestion.QuestionId
                        };
                        _answerPossibilityRepository.CreateAnswerPossibility(domainAnswer);
                        existingQuestion.AnswerPossibilities.Add(domainAnswer);
                    }
                }
            }
        }
        _repositoryFlow.UpdateFlow(existingFlow);
    }
}