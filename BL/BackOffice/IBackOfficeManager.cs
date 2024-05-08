using PhygitalTool.Domain.Platform;

namespace PhygitalTool.BL;

public interface IBackOfficeManager
{
    void AddBackOffice(BackOffice backOffice);
    BackOffice GetBackOfficeForManager(string managerId);

    BackOffice GetBackOffice(int backofficeId);
} 