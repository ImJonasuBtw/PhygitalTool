using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using PhygitalTool.DAL.IRepositorys;
using PhygitalTool.Domain.FlowPackage;

namespace PhygitalTool.DAL.EF.Repositorys;

public class IdeaRepository : IRepositoryIdea
{
    private readonly PhygitalToolDbContext _context;

    public IdeaRepository(PhygitalToolDbContext context)
    {
        _context = context;
    }
    
    public IEnumerable<Idea> ReadAllIdeas()
    {
        return _context.Ideas.Include(u =>u.Comments).ThenInclude(c =>c.User)
            .Include(i =>i.User);

    }
    
    public IdentityUser GetUser(string userId)
    {
        return _context.Users
            .FirstOrDefault(u => u.Id == userId);

    }

    public void UpdateLikeIdea(Idea idea)
    {
        var existingIdea = _context.Ideas.FirstOrDefault(i => i.IdeaId == idea.IdeaId);


        if (existingIdea != null)
        {
            existingIdea.Likes = idea.Likes;

            _context.SaveChanges();
        }
        else
        {
            throw new ArgumentException("Het idea kon niet worden gevonden.");
        }
    }

    public Idea GetIdea(int id)
    {
        return _context.Ideas.FirstOrDefault(i => i.IdeaId == id);
    }
    
    public void CreateIdea(Idea idea)
    {
        _context.Ideas.Add(idea);
        _context.SaveChanges();
    }

    public void CreateCommentToIdea(int ideaId, Comment comment)
    {
        _context.Comments.Add(comment);
        Idea idea =  _context.Ideas.FirstOrDefault(i => i.IdeaId == ideaId);
        idea?.Comments.Add(comment);
        _context.SaveChanges();
    }
}