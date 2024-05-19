namespace PhygitalTool.BL.BackOffice;

public interface IBackOfficeManager
{
    Domain.Platform.BackOffice GetBackOfficeForManager(string managerId);

    Domain.Platform.BackOffice GetBackOffice(int backofficeId);
} 