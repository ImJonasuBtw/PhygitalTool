using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using PhygitalTool.BL.Users;
using PhygitalTool.DAL.IRepositorys;
using PhygitalTool.Domain.Platform;
using PhygitalTool.Web.Models;

namespace PhygitalTool.Web.Controllers.BackOffice.api;


[ApiController]
[Route("api/[controller]")]


public class SupervisorsController : Controller
{
    private readonly IUserManager _userManager;

    private readonly UserManager<IdentityUser> _identityUserManager;
    
    private readonly IRepositoryBackOffice _repositoryBackOffice;
    
    private const string Supervisorrole = "Supervisor";

    public SupervisorsController(IUserManager userManager, UserManager<IdentityUser> identityUserManager, IRepositoryBackOffice repositoryBackOffice)
    {
        _userManager = userManager;
        _identityUserManager = identityUserManager;
        _repositoryBackOffice = repositoryBackOffice;
    }

    [Authorize(Roles = "Manager")]
    [HttpGet("GetSupervisors/{backofficeId}")]
    public IActionResult GetSupervisors(int backofficeId)
    {
        
        IEnumerable <Supervisor> supervisors = _userManager.GetSuperVisorsForBackoffice(backofficeId);
        
        if (!supervisors.Any())
        {
            return NoContent();
        }
        
        return Ok(supervisors);
    }

    [Authorize(Roles = "Manager")]
    [HttpPost]
    public IActionResult CreateSupervisor(SupervisorDto supervisorDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }


        var supervisor = new Supervisor
        {
            Email = supervisorDto.Email,
            UserName = supervisorDto.Email,
            ImageUrl = supervisorDto.ImageUrl,
            BackOfficeId = supervisorDto.BackOfficeId,
            EmailConfirmed = true
        };
        var result = _identityUserManager.CreateAsync(supervisor, supervisorDto.Password).Result;
        _identityUserManager.AddToRoleAsync(supervisor, Supervisorrole).Wait();
        if (!result.Succeeded)
        {
            return BadRequest(result.Errors);
        }

        return Ok(new { Message = "Supervisor added successfully" });
    }
    
    
    [HttpGet("show-supervisor-screen")]
    public IActionResult ShowSupervisorScreen(string supervisorId)
    {
        var supervisor = _repositoryBackOffice.ReadSupervisorWithFlows(supervisorId);

        return View("~/Views/Supervisors/SupervisorView.cshtml", supervisor);
    }
    
    [HttpGet("show-start-screen")]
    public IActionResult ShowStartScreen()
    {
        return View("~/Views/Circularflow/CircularFlowWithSupervisor.cshtml");
    }
    
    [HttpGet("show-supervisor-control-screen")]
    public IActionResult ShowSuperVisorFlowControl()
    {
        return View("~/Views/Supervisors/SuperVisorFlowControl.cshtml");
    }
}