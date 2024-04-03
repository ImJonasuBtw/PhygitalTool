using PhygitalTool.DAL;
using PhygitalTool.Domain.Platform;

namespace PhygitalTool.BL;

public class BackOfficeManager : IBackOfficeManager
{
    private readonly IRepositoryPersistance _repositoryPersistance;
    private readonly IRepositoryRetrieval _repositoryRetrieval;

    public BackOfficeManager(IRepositoryPersistance repositoryPersistance, IRepositoryRetrieval repositoryRetrieval)
    {
        _repositoryPersistance = repositoryPersistance;
        _repositoryRetrieval = repositoryRetrieval;
    }

    public BackOffice GetBackOfficeForManager(int managerId)
    {
        return _repositoryRetrieval.ReadBackOfficeForManager(managerId);
    }
}