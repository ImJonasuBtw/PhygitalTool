using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PhygitalTool.BL;
using PhygitalTool.DAL.IRepositorys;
using PhygitalTool.Domain.Platform;

namespace PhygitalTool.Web.Controllers.BackOffice;

public class SupervisorsController : Controller
{
    private readonly IRepositoryBackOffice _repositoryBackOffice;
    // GET
    public SupervisorsController( IRepositoryBackOffice repositoryBackOffice)
    {
        _repositoryBackOffice = repositoryBackOffice;
    }
    
    public IEnumerable<Supervisor> ReadSupervisorWithFlows(string supervisorId)
    {
        var supervisorWithFlows = _repositoryBackOffice.ReadSupervisorWithFlows(supervisorId);

        return supervisorWithFlows != null ? new List<Supervisor> { supervisorWithFlows } : new List<Supervisor>();
    }
}