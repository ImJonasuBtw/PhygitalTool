using PhygitalTool.Domain.Platform;

namespace PhygitalTool.BL.Users;

public interface IUserManager
{
    IEnumerable<Supervisor> getSuperVisorsForBackoffice(int backofficeId);
    
}