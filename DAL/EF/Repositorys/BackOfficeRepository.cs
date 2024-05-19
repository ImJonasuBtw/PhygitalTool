using Microsoft.EntityFrameworkCore;
using PhygitalTool.DAL.IRepositorys;
using PhygitalTool.Domain.Platform;

namespace PhygitalTool.DAL.EF;

public class BackOfficeRepository : IRepositoryBackOffice
{
    private readonly PhygitalToolDbContext _context;

    public BackOfficeRepository(PhygitalToolDbContext context)
    {
        _context = context;
    }

    public BackOffice ReadBackOfficeForManager(string managerId)
    {
        var backOfficeId = _context.Managers.Where(manager => manager.Id == managerId)
            .Select(manager => manager.BackOfficeId).FirstOrDefault();
        
        return _context.BackOffices.Include(bo => bo.Projects).Include(bo => bo.Managers)
            .FirstOrDefault(bo => bo.BackOfficeId == backOfficeId);
    }

    public BackOffice ReadBackOffice(int backofficeId)
    {
        return _context.BackOffices.Include(bo => bo.Projects)
            .SingleOrDefault(office => office.BackOfficeId == backofficeId);
    }

    public IEnumerable<Supervisor> ReadSuperVisorsForBackoffice(int backofficeId)
    {
        return _context.BackOffices.Where(b => b.BackOfficeId == backofficeId).SelectMany(b => b.Supervisors).ToList();
    }

    public IEnumerable<BackOffice> ReadBackOffices()
    {
        return _context.BackOffices.ToList();
    }

    public AdminPlatform ReadAdminPlatform()
    {
        return _context.AdminPlatforms
            .Include(a => a.BackOffices)
            .Include(a => a.Admins)
            .FirstOrDefault();
    }
    
    public IEnumerable<Manager> ReadManagers()
    {
        return _context.Managers.ToList();
    }
}