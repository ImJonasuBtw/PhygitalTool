using PhygitalTool.DAL.IRepositorys;
using PhygitalTool.Domain.FlowPackage;

namespace PhygitalTool.DAL.EF.Repositorys;

public class ContactInformationRepository : IRepositoryContactInformation
{
    private readonly PhygitalToolDbContext _context;

    public ContactInformationRepository(PhygitalToolDbContext context)
    {
        _context = context;
    }

    public void SaveContactInformation(ContactInformation contactInformation)
    {
        _context.ContactInformations.Add(contactInformation);
        _context.SaveChanges();
    }
}