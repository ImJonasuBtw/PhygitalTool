using PhygitalTool.DAL;
using PhygitalTool.Domain.Platform;

namespace PhygitalTool.BL.Users;

public class UserManager : IUserManager
{
    
    private readonly IRepositoryPersistance _repositoryPersistance;
    private readonly IRepositoryRetrieval _repositoryRetrieval;

    public UserManager(IRepositoryPersistance repositoryPersistance, IRepositoryRetrieval repositoryRetrieval)
    {
        _repositoryPersistance = repositoryPersistance;
        _repositoryRetrieval = repositoryRetrieval;
    }

    public IEnumerable<Supervisor> getSuperVisorsForBackoffice(int backofficeId)
    {
        return _repositoryRetrieval.ReadSuperVisorsForBackoffice(backofficeId);
    }


}