using PhygitalTool.DAL;
using PhygitalTool.Domain.Platform;

namespace PhygitalTool.BL;

public class AdminPlatformManager: IAdminPlatformManager
{
    private readonly IRepositoryPersistance _persistence;
    private readonly IRepositoryRetrieval _retrieval;

    public AdminPlatformManager(IRepositoryPersistance persistence, IRepositoryRetrieval retrieval)
    {
        _persistence = persistence;
        _retrieval = retrieval;
    }
    
    public AdminPlatform GetAdminPlatform()
    {
        return _retrieval.ReadAdminPlatform();
    }

    public IEnumerable<BackOffice> getBackoffices()
    {
        return _retrieval.readBackoffices();
    }
}