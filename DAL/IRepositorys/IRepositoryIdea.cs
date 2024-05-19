using Microsoft.AspNetCore.Identity;
using PhygitalTool.Domain.FlowPackage;

namespace PhygitalTool.DAL.IRepositorys;

public interface IRepositoryIdea
{
    IEnumerable<Idea> ReadAllIdeas();
    IdentityUser GetUser(string userId);
    
    void UpdateLikeIdea(Idea idea);
    
    Idea GetIdea(int id);
    
    void CreateIdea(Idea idea);
    
    void CreateCommentToIdea(int ideaId, Comment comment);
}