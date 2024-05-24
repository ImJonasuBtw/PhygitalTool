using Microsoft.AspNetCore.Identity;
using PhygitalTool.Domain.FlowPackage;
using PhygitalTool.Domain.Platform;

namespace PhygitalTool.BL.Users;

public interface IUserManager
{
    IEnumerable<Supervisor> GetSuperVisorsForBackoffice(int backofficeId);

    IEnumerable<Idea> GetAllIdeasWithUsers();

    void AddIdeas(Idea idea);

    IdentityUser GetUser(string userId);

    public void AddCommentToIdea(string description, string userId, int ideaId);
    //void AddManager(string email, string password, string imageUrl, int backOfficeId, bool emailConfirmed);

    void UpdateLikeIdea(Idea idea);
    Idea GetIdea(int id);
    IEnumerable<Manager> GetManagers();
}