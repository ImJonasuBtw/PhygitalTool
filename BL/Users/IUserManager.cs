using Microsoft.AspNetCore.Identity;
using PhygitalTool.Domain.FlowPackage;
using PhygitalTool.Domain.Platform;

namespace PhygitalTool.BL.Users;

public interface IUserManager
{
    IEnumerable<Supervisor> GetSuperVisorsForBackoffice(int backofficeId);

    IEnumerable<Idea> GetAllIdeasWithUsers();

    void AddIdeas(string title, string description, string userId);

    IdentityUser GetUser(string userId);

    public void AddCommentToIdea(string description, string userId, int ideaId);
    //void AddManager(string email, string password, string imageUrl, int backOfficeId, bool emailConfirmed);

    int UpdateLikeIdea(int ideaId);
    Idea GetIdea(int id);
    IEnumerable<Manager> GetManagers();
}