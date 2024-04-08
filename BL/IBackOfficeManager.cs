using PhygitalTool.Domain.Platform;

namespace PhygitalTool.BL;

public interface IBackOfficeManager
{
    BackOffice GetBackOfficeForManager(int managerId);

    BackOffice GetBackOffice(int backofficeId);
}