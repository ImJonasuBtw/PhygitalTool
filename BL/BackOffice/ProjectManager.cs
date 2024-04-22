using PhygitalTool.DAL;
using PhygitalTool.Domain.FlowPackage;
using PhygitalTool.Domain.Projects;

namespace PhygitalTool.BL;

public class ProjectManager : IProjectManager
{
    private readonly IRepositoryPersistance _repositoryPersistance;
    private readonly IRepositoryRetrieval _repositoryRetrieval;

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