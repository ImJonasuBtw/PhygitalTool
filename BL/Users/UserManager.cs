using Microsoft.AspNetCore.Identity;
using PhygitalTool.DAL;
using PhygitalTool.Domain.FlowPackage;
using PhygitalTool.Domain.Platform;

namespace PhygitalTool.BL.Users;

public class UserManager : IUserManager
{
    
    private readonly IRepositoryPersistance _repositoryPersistance;
    private readonly IRepositoryRetrieval _repositoryRetrieval;

    public UserManager(IRepositoryPersistance repositoryPersistance, IRepositoryRetrieval repositoryRetrieval)
    {
        _repositoryPersistance = repositoryPersistance;
        _repositoryRetrieval = repositoryRetrieval;
    }

    public IEnumerable<Supervisor> getSuperVisorsForBackoffice(int backofficeId)
    {
        return _repositoryRetrieval.ReadSuperVisorsForBackoffice(backofficeId);
    }

    public IEnumerable<Idea> getAllIdeasWithUsers()
    {
        return _repositoryRetrieval.readAllIdeas();
    }

    public void addIdeas(Idea idea)
    {
        _repositoryPersistance.createIdea(idea);
    }

    public IdentityUser getUser(string userId)
    {
        return _repositoryRetrieval.getUser(userId);
    }

    public void AddCommentToIdea(int IdeaId, Comment comment)
    {
        _repositoryPersistance.createCommentToIdea(IdeaId, comment);
    }

    public void updateLikeIdea(Idea idea)
    {
        _repositoryRetrieval.updateLikeIdea(idea);
    }

    public Idea getIdea(int id)
    {
        return _repositoryRetrieval.getIdea(id);
    }

    public IEnumerable<Manager> getManagers()
    {
        return _repositoryRetrieval.ReadManagers();
    }
}