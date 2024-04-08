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
}