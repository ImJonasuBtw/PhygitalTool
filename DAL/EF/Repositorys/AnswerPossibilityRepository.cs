using PhygitalTool.DAL.IRepositorys;
using PhygitalTool.Domain.FlowPackage;

namespace PhygitalTool.DAL.EF.Repositorys;

public class AnswerPossibilityRepository : IRepositoryAnswerPossibility
{
    private readonly PhygitalToolDbContext _context;

    public AnswerPossibilityRepository(PhygitalToolDbContext context)
    {
        _context = context;
    }

    public void CreateAnswerPossibility(AnswerPossibility answerPossibility)
    {
        _context.AnswerPossibilities.Add(answerPossibility);
        _context.SaveChanges();
    }

    public void UpdateAnswerPossibility(AnswerPossibility answerPossibility)
    {
        var existingA = _context.AnswerPossibilities.Find(answerPossibility.AnswerPossibilityId);
        if (existingA == null) throw new ArgumentException("AnswerPossibility not found");
        existingA.Description = answerPossibility.Description;
        _context.SaveChanges();
    }

    public void RemoveAnswerPossibility(int answerPossibilityId)
    {
        var answerPossibility = _context.AnswerPossibilities.Find(answerPossibilityId);
        if (answerPossibility == null) throw new ArgumentException("AnswerPossibility not found");
        _context.AnswerPossibilities.Remove(answerPossibility);
        _context.SaveChanges();
    }
    
    public AnswerPossibility ReadAnswerPossibility(int answerPossibilityId)
    {
        return _context.AnswerPossibilities.Find(answerPossibilityId);
    }
}