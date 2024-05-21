using PhygitalTool.Domain.Platform;

namespace PhygitalTool.DAL.IRepositorys;

public interface IRepositoryBackOffice
{
    BackOffice ReadBackOfficeForManager(string managerId);
    
    BackOffice ReadBackOffice(int backofficeId);
    
    IEnumerable<Supervisor> ReadSuperVisorsForBackoffice(int backofficeId);

    IEnumerable<BackOffice> ReadBackOffices();
    
    AdminPlatform ReadAdminPlatform();
    
    IEnumerable<Manager> ReadManagers();
    
    void CreateBackOffice(BackOffice backOffice);
    void RemoveBackOffice(int backOfficeId);
    void UpdateBackOffice(BackOffice backOffice);
}