using PhygitalTool.DAL;
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
}