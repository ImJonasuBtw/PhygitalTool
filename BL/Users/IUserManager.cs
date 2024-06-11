using Microsoft.AspNetCore.Identity;
using PhygitalTool.Domain.FlowPackage;
using PhygitalTool.Domain.Platform;

namespace PhygitalTool.BL.Users;

public interface IUserManager
{
    IEnumerable<Supervisor> GetSuperVisorsForBackoffice(int backofficeId);
    
    IEnumerable<Idea> GetAllIdeasWithUsers();
    
    void AddIdeas(string title, string description, string userId);
    public void AddFlowToSupervisor(int flowId, int backofficeId);
    
    public void AddCommentToIdea(string description, string userId, int ideaId);
    
    int UpdateLikeIdea(int ideaId);
    
    IEnumerable<Manager> GetManagers();
}