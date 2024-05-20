using Microsoft.AspNetCore.Identity;
using PhygitalTool.Domain.FlowPackage;

namespace PhygitalTool.DAL.IRepositorys;

public interface IRepositoryIdea
{
    IEnumerable<Idea> ReadAllIdeas();
    IdentityUser ReadUser(string userId);
    
    void UpdateLikeIdea(Idea idea);
    
    Idea ReadIdea(int id);
    
    void CreateIdea(Idea idea);
    
    void CreateCommentToIdea(int ideaId, Comment comment);
}