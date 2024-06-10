using PhygitalTool.DAL.IRepositorys;

namespace PhygitalTool.BL.BackOffice;

public class BackOfficeManager : IBackOfficeManager
{
    private readonly IRepositoryBackOffice _repositoryBackOffice;
    
    public BackOfficeManager(IRepositoryBackOffice repositoryBackOffice)
    {
        _repositoryBackOffice = repositoryBackOffice;
    }

    public Domain.Platform.BackOffice GetBackOfficeForManager(string managerId)
    {
        return _repositoryBackOffice.ReadBackOfficeForManager(managerId);
    }

    public Domain.Platform.BackOffice GetBackOffice(int backofficeId)
    {
        return _repositoryBackOffice.ReadBackOffice(backofficeId);
    }
    public Domain.Platform.BackOffice GetBackOfficeWithProjectsAndStuff(int backofficeId)
    {
        return _repositoryBackOffice.ReadBackOfficeWithProjectsAndStuff(backofficeId);
    }
    

    public void AddBackOffice(Domain.Platform.BackOffice backOffice)
    {
        _repositoryBackOffice.CreateBackOffice(backOffice);
    }

    public void DeleteBackOffice(int backOfficeId)
    {
        _repositoryBackOffice.RemoveBackOffice(backOfficeId);
    }

    public void UpdateBackOffice(Domain.Platform.BackOffice backOffice)
    {
        _repositoryBackOffice.UpdateBackOffice(backOffice);
    }
}