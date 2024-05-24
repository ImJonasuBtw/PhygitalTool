using Microsoft.EntityFrameworkCore;
using PhygitalTool.DAL.IRepositorys;
using PhygitalTool.Domain.Platform;

namespace PhygitalTool.DAL.EF.Repositorys;

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
            .SingleOrDefault();

        return backOffice;
    }

    public BackOffice ReadBackOffice(int backofficeId)
    {
        return _context.BackOffices.Include(bo => bo.Projects)
            .SingleOrDefault(office => office.BackOfficeId == backofficeId);
    }

    public IEnumerable<Supervisor> ReadSuperVisorsForBackoffice(int backofficeId)
    {
        return _context.BackOffices.AsNoTracking().Where(b => b.BackOfficeId == backofficeId).SelectMany(b => b.Supervisors);
    }

    public IEnumerable<BackOffice> ReadBackOffices()
    {
        return _context.BackOffices.AsNoTracking();
    }

    public AdminPlatform ReadAdminPlatform()
    {
        return _context.AdminPlatforms
            .Include(a => a.BackOffices)
            .Include(a => a.Admins)
            .AsNoTracking()
            .SingleOrDefault();
    }

    public IEnumerable<Manager> ReadManagers()
    {
        return _context.Managers.AsNoTracking();
    }

    public void CreateBackOffice(BackOffice backOffice)
    {
        _context.BackOffices.Add(backOffice);
        _context.SaveChanges();
    }

    public void RemoveBackOffice(int backOfficeId)
    {
        var backOffice = _context.BackOffices.Find(backOfficeId);
        if (backOffice == null) throw new ArgumentException("BackOffice Not Found");
        _context.BackOffices.Remove(backOffice);
        _context.SaveChanges();
    }

    public void UpdateBackOffice(BackOffice backOffice)
    {
        var existingBackOffice = _context.BackOffices.Find(backOffice.BackOfficeId);
        if (existingBackOffice == null) throw new ArgumentException("BackOffice Not Found");
        existingBackOffice.Name = backOffice.Name;
        _context.SaveChanges();
    }
    
    public Supervisor ReadSupervisorWithFlows(string supervisorId)
    {
        var supervisor = _context.Supervisors
            .Where(s => s.Id == supervisorId)
            .Include(s => s.Flows)
            .FirstOrDefault();

        return supervisor;
    }
}