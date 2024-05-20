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
        var backOffice = _context.Managers
            .Where(manager => manager.Id == managerId)
            .Include(manager => manager.BackOffice.Projects)
            .Include(manager => manager.BackOffice.Managers)
            .Select(manager => manager.BackOffice)
            .AsNoTracking()
            .FirstOrDefault();

        return backOffice;
    }

    public BackOffice ReadBackOffice(int backofficeId)
    {
        return _context.BackOffices.Include(bo => bo.Projects)
            .SingleOrDefault(office => office.BackOfficeId == backofficeId);
    }

    public IEnumerable<Supervisor> ReadSuperVisorsForBackoffice(int backofficeId)
    {
        return _context.BackOffices.AsNoTracking().Where(b => b.BackOfficeId == backofficeId).SelectMany(b => b.Supervisors).ToList();
    }

    public IEnumerable<BackOffice> ReadBackOffices()
    {
        return _context.BackOffices.AsNoTracking().ToList();
    }

    public AdminPlatform ReadAdminPlatform()
    {
        return _context.AdminPlatforms
            .Include(a => a.BackOffices)
            .Include(a => a.Admins)
            .AsNoTracking()
            .FirstOrDefault();
    }

    public IEnumerable<Manager> ReadManagers()
    {
        return _context.Managers.AsNoTracking().ToList();
    }
}