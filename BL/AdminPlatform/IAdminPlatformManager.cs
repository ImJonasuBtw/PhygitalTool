namespace PhygitalTool.BL.AdminPlatform;

public interface IAdminPlatformManager
{
    Domain.Platform.AdminPlatform GetAdminPlatform();
    
    IEnumerable<Domain.Platform.BackOffice> getBackoffices();
}