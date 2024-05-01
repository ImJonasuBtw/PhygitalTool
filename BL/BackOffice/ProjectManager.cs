using PhygitalTool.DAL;
using PhygitalTool.Domain.FlowPackage;
using PhygitalTool.Domain.Projects;

namespace PhygitalTool.BL;

public class ProjectManager : IProjectManager
{
    private readonly IRepositoryPersistance _repositoryPersistance;
    private readonly IRepositoryRetrieval _repositoryRetrieval;
    private IProjectManager _projectManagerImplementation;

    public ProjectManager(IRepositoryPersistance repositoryPersistance, IRepositoryRetrieval repositoryRetrieval)
    {
        _repositoryPersistance = repositoryPersistance;
        _repositoryRetrieval = repositoryRetrieval;
    }

    public void AddProject(Project project) 
    {
        _repositoryPersistance.CreateProject(project);
    }
    public void AddSubTheme(SubTheme subTheme)
    {
        _repositoryPersistance.CreateSubTheme(subTheme);
    }
    public void AddMainTheme(MainTheme mainTheme)
    {
        _repositoryPersistance.CreateMainTheme(mainTheme);
    }

    public void DeleteSubTheme(int subThemeId)
    {
        _repositoryPersistance.DeleteSubTheme(subThemeId);
    }
    
    public void DeleteMainTheme(int mainThemeId)
    {
        _repositoryPersistance.DeleteMainTheme(mainThemeId);
    }

    public Project GetProjectWithThemes(int projectId)
    {
        return _repositoryRetrieval.ReadProjectWithThemes(projectId);
    }

    public MainTheme GetThemeWithSubthemes(int themeId)
    {
        return _repositoryRetrieval.ReadThemeWithSubthemes(themeId);
    }

    public SubTheme GetSubThemeWithFlows(int subThemeId)
    {
        return _repositoryRetrieval.ReadSubThemeWithFlows(subThemeId);
    }
    

    public Flow AddFlow(Flow flow)
    {
      return _repositoryPersistance.CreateFlow(flow);
    }

    public Question AddQuestion(Question question)
    {
       return _repositoryPersistance.CreateQuestion(question);
    }

    public void AddAnswerPossibility(AnswerPossibility answerPossibility)
    {
        _repositoryPersistance.createAnswerPossilility(answerPossibility);
    }

    public void UpdateProject(Project project)
    {
        _repositoryPersistance.UpdateProject(project);
    }

    public void DeleteFlow(int FlowId)
    {
        _repositoryPersistance.RemoveFlow(FlowId);
    }

    public Flow GetFlowWithQuestionAndAnswerPossibilities(int FlowId)
    {
        return _repositoryRetrieval.ReadFlowWithQuestionAndAnswerpossibilities(FlowId);
    }

    public void UpdateFlow(Flow flow)
    {
        _repositoryPersistance.UpdateFlow(flow);
    }

    public void DeleteQuestion(int questionId)
    {
        _repositoryPersistance.RemoveQuestion(questionId);
    }

    public void UpdateQuestion(Question question)
    {
        _repositoryPersistance.UpdateQuestion(question);
    }

    public Question GetQuestion(int QuestionId)
    {
       return _repositoryRetrieval.ReadQuestion(QuestionId);
    }

    public void UpdateAnswerPossibility(AnswerPossibility answerPossibility)
    {
        _repositoryPersistance.updateAnswerPossibility(answerPossibility);
    }

    public void DeleteanswerPossibility(int answerPossibilityID)
    {
        _repositoryPersistance.RemoveAnswerPossibilty(answerPossibilityID);
    }

    public void DeleteProject(int projectId)
    { 
        _repositoryPersistance.RemoveProject(projectId);
    }

    public SubTheme GetSubTheme(int subThemeId)
    {
        return _repositoryRetrieval.ReadSubTheme(subThemeId);
    }
    public MainTheme GetMainTheme(int mainthemeId)
    {
        return _repositoryRetrieval.ReadMainTheme(mainthemeId);
    }

    public void UpdateSubTheme(SubTheme subTheme)
    {
        _repositoryRetrieval.UpdateSubTheme(subTheme);
    }
    public void UpdateMainTheme(MainTheme mainTheme)
    {
        _repositoryRetrieval.UpdateMainTheme(mainTheme);
    }
}