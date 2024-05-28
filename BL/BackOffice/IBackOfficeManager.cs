
namespace PhygitalTool.BL.BackOffice;


public interface IBackOfficeManager
{
    Domain.Platform.BackOffice GetBackOfficeForManager(string managerId);
    
    Domain.Platform.BackOffice GetBackOffice(int backofficeId);
    
    void AddBackOffice(Domain.Platform.BackOffice backOffice);
    
    void DeleteBackOffice(int backOfficeId);
    
    void UpdateBackOffice(Domain.Platform.BackOffice existingBackOffice);
} 