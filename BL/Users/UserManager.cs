using Microsoft.AspNetCore.Identity;
using PhygitalTool.DAL;
using PhygitalTool.DAL.IRepositorys;
using PhygitalTool.Domain.FlowPackage;
using PhygitalTool.Domain.Platform;

namespace PhygitalTool.BL.Users;

public class UserManager : IUserManager
{
    
    private readonly IRepositoryBackOffice _repositoryBackOffice;
    private readonly IRepositoryIdea _repositoryIdeas;
   

    public UserManager(IRepositoryBackOffice repositoryBackOffice, IRepositoryIdea repositoryIdeas)
    {
        _repositoryBackOffice = repositoryBackOffice;
        _repositoryIdeas = repositoryIdeas;
    }

    public IEnumerable<Supervisor> GetSuperVisorsForBackoffice(int backofficeId)
    {
        return _repositoryBackOffice.ReadSuperVisorsForBackoffice(backofficeId);
    }

    public IEnumerable<Idea> GetAllIdeasWithUsers()
    {
        return _repositoryIdeas.ReadAllIdeas();
    }

    public void AddIdeas(Idea idea)
    {
        _repositoryIdeas.CreateIdea(idea);
    }

    public IdentityUser GetUser(string userId)
    {
        return _repositoryIdeas.ReadUser(userId);
    }

    public Supervisor GetSupervisor(string supervisorId)
    {
        return _repositoryBackOffice.ReadSupervisorWithFlows(supervisorId);
    }

    public void AddCommentToIdea(int IdeaId, Comment comment)
    {
        _repositoryIdeas.CreateCommentToIdea(IdeaId, comment);
    }

    public void UpdateLikeIdea(Idea idea)
    {
        _repositoryIdeas.UpdateLikeIdea(idea);
    }

    public Idea GetIdea(int id)
    {
        return _repositoryIdeas.ReadIdea(id);
    }

    public IEnumerable<Manager> GetManagers()
    {
        return _repositoryBackOffice.ReadManagers();
    }
}