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

    public void AddIdeas(string title, string description, string userId)
    {
        var idea = new Idea()
        {
            Title = title,
            Description = description,
            UserId = userId
        };
        _repositoryIdeas.CreateIdea(idea);
    }

    public IdentityUser GetUser(string userId)
    {
        return _repositoryIdeas.ReadUser(userId);
    }
    
    public void AddCommentToIdea(string description, string userId, int ideaId)
    {
        var comment = new Comment()
        {
            Description =description,
            UserId = userId,
            IdeaId = ideaId
        };
        _repositoryIdeas.CreateCommentToIdea(comment);
    }

    public int UpdateLikeIdea(int ideaId)
    {
        try
        {
            var idea = GetIdea(ideaId);
            idea.Likes++;
            _repositoryIdeas.UpdateLikeIdea(idea);
            return idea.Likes;
        }
        catch (Exception e)
        {
            Console.WriteLine("Error updating like idea: " + e.Message);
            throw;
        }
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