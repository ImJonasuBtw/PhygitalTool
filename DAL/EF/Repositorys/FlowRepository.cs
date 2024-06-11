using Microsoft.EntityFrameworkCore;
using PhygitalTool.DAL.IRepositorys;
using PhygitalTool.Domain.FlowPackage;
using PhygitalTool.Domain.Projects;

namespace PhygitalTool.DAL.EF.Repositorys;

public class FlowRepository : IRepositoryFlow
{
    private readonly PhygitalToolDbContext _context;

    public FlowRepository(PhygitalToolDbContext context)
    {
        _context = context;
    }

    public Flow ReadFlow(int flowId)
    {
        return _context.Flows
            .Include(fst => fst.SubTheme)
            .ThenInclude(m => m.MainTheme)
            .Include(flow => flow.Questions)
            .ThenInclude(q => q.AnswerPossibilities)
            .AsNoTracking()
            .SingleOrDefault(f => f.FlowId == flowId);
    }

    public int ReadTotalAmountOfFlows()
    {
        return _context.Flows.Count();
    }

    public Flow ReadFlowWithQuestionAndAnswerpossibilities(int flowId)
    {
        return _context.Flows.Include(f => f.Questions)
            .ThenInclude(question => question.AnswerPossibilities)
            .AsNoTracking()
            .SingleOrDefault(flow => flow.FlowId == flowId);
    }
    
    public Flow ReadFlowWithQuestionsAndNotesAndSubtheme(int flowId)
    {
        return _context.Flows.Include(f => f.SubTheme)
            .ThenInclude(s => s.MainTheme)
            .ThenInclude(m => m.Project)
            .ThenInclude(p => p.BackOffice)
            .ThenInclude(b => b.Managers)
            .Include(f => f.Questions)
            .ThenInclude(question => question.Notes)
            .AsNoTracking()
            .SingleOrDefault(flow => flow.FlowId == flowId);
    }

    public Flow CreateFlow(Flow flow)
    {
        _context.Flows.Add(flow);
        _context.SaveChanges();
        return _context.Flows.SingleOrDefault(f =>
            f.FlowName == flow.FlowName && f.FlowDescription == flow.FlowDescription);
    }

    public void RemoveFlow(int flowId)
    {
        var flow = _context.Flows.Find(flowId);
        if (flow == null) throw new ArgumentException("Flow not found");
        _context.Flows.Remove(flow);
        _context.SaveChanges();
    }

    public void UpdateFlow(Flow flow)
    {
        var existingFlow = _context.Flows.Find(flow.FlowId);
        if (existingFlow == null) throw new ArgumentException("Flow not found");
        existingFlow.FlowName = flow.FlowName;
        existingFlow.FlowImage = flow.FlowImage;
        existingFlow.FlowDescription = flow.FlowDescription;
        existingFlow.FlowType = flow.FlowType;
        existingFlow.Language = flow.Language;
        _context.SaveChanges();
    }
}