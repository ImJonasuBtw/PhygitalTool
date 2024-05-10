using Microsoft.AspNetCore.Identity;
using PhygitalTool.Domain.FlowPackage;
using PhygitalTool.Domain.Platform;

namespace PhygitalTool.BL.Users;

public interface IUserManager
{
    IEnumerable<Supervisor> getSuperVisorsForBackoffice(int backofficeId);

    IEnumerable<Idea> getAllIdeasWithUsers();

    void addIdeas(Idea idea);

    IdentityUser getUser(string userId);

    void AddCommentToIdea(int IdeaId,Comment comment);
    


}