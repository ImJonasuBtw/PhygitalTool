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

    public IEnumerable<Supervisor> getSuperVisorsForBackoffice(int backofficeId)
    {
        return _repositoryBackOffice.ReadSuperVisorsForBackoffice(backofficeId);
    }

    public IEnumerable<Idea> getAllIdeasWithUsers()
    {
        return _repositoryIdeas.ReadAllIdeas();
    }

    public void addIdeas(Idea idea)
    {
        _repositoryIdeas.CreateIdea(idea);
    }

    public IdentityUser getUser(string userId)
    {
        return _repositoryIdeas.ReadUser(userId);
    }

    public void AddCommentToIdea(int IdeaId, Comment comment)
    {
        _repositoryIdeas.CreateCommentToIdea(IdeaId, comment);
    }

    public void updateLikeIdea(Idea idea)
    {
        _repositoryIdeas.UpdateLikeIdea(idea);
    }

    public Idea getIdea(int id)
    {
        return _repositoryIdeas.ReadIdea(id);
    }

    public IEnumerable<Manager> getManagers()
    {
        return _repositoryBackOffice.ReadManagers();
    }
}