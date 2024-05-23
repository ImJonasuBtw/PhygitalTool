using PhygitalTool.DAL.IRepositorys;
using PhygitalTool.Domain.FlowPackage;
using PhygitalTool.Domain.Projects;

namespace PhygitalTool.BL.BackOffice;

public class ProjectManager : IProjectManager
{
    private readonly IRepositoryProject _repositoryProject;
    private readonly IRepositoryFlow _repositoryFlow;
    private readonly IRepositoryQuestion _repositoryQuestion;
    private readonly IRepositoryAnswerPossibility _answerPossibilityRepository;
    private readonly IRepositoryNote _noteRepository;

    public ProjectManager(IRepositoryProject repositoryProject, IRepositoryFlow repositoryFlow, IRepositoryQuestion repositoryQuestion, IRepositoryAnswerPossibility answerPossibilityRepository, IRepositoryNote noteRepository)
    {
        _repositoryProject = repositoryProject;
        _repositoryFlow = repositoryFlow;
        _repositoryQuestion = repositoryQuestion;
        _answerPossibilityRepository = answerPossibilityRepository;
        _noteRepository = noteRepository;
    }
    
    public void AddProject(Project project) 
    {
        _repositoryProject.CreateProject(project);
    }

    public void AddNote(Note note)
    {
        _noteRepository.CreateNote(note);
    }

    public IEnumerable<Note> getNotes()
    {
        return _noteRepository.ReadAllNotes();
    }
    public void AddSubTheme(SubTheme subTheme)
    {
        _repositoryProject.CreateSubTheme(subTheme);
    }
    public void AddMainTheme(MainTheme mainTheme)
    {
        _repositoryProject.CreateMainTheme(mainTheme);
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

    public void UpdateProject(Project project)
    {
        _repositoryProject.UpdateProject(project);
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

    public void UpdateSubTheme(SubTheme subTheme)
    {
        _repositoryProject.UpdateSubTheme(subTheme);
    }
    public void UpdateMainTheme(MainTheme mainTheme)
    {
        _repositoryProject.UpdateMainTheme(mainTheme);
    }
}