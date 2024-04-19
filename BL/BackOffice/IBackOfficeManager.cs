using PhygitalTool.Domain.Platform;

namespace PhygitalTool.BL;

public interface IBackOfficeManager
{
    BackOffice GetBackOfficeForManager(string managerId);

    BackOffice GetBackOffice(int backofficeId);
} 