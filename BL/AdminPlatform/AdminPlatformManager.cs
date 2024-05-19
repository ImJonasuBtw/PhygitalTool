using PhygitalTool.DAL.IRepositorys;

namespace PhygitalTool.BL.AdminPlatform;

public class AdminPlatformManager: IAdminPlatformManager
{
    private readonly IRepositoryBackOffice _repositoryBackOffice;

    public AdminPlatformManager(IRepositoryBackOffice repositoryBackOffice )
    {
        _repositoryBackOffice = repositoryBackOffice;
    }
    
    public Domain.Platform.AdminPlatform GetAdminPlatform()
    {
        return _repositoryBackOffice.ReadAdminPlatform();
    }

    public IEnumerable<Domain.Platform.BackOffice> getBackoffices()
    {
        return _repositoryBackOffice.ReadBackOffices();
    }
}