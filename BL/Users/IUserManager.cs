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

    void AddCommentToIdea(int ideaId,Comment comment);

    void UpdateLikeIdea(Idea idea);
    Idea GetIdea(int id);
    IEnumerable<Manager> GetManagers();
}