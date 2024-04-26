using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Client;
using PhygitalTool.BL.Users;
using PhygitalTool.Domain.Platform;
using PhygitalTool.Web.Models;

namespace PhygitalTool.Web.Controllers.BackOffice.api;


[ApiController]
[Route("api/[controller]")]


public class SupervisorsController : Controller
{
    private readonly IUserManager _userManager;

    private readonly UserManager<IdentityUser> _identityUserManager;

    public SupervisorsController(IUserManager userManager, UserManager<IdentityUser> identityUserManager)
    {
        _userManager = userManager;
        _identityUserManager = identityUserManager;
    }

    [HttpGet("GetSupervisors/{backofficeId}")]
    public IActionResult GetSupervisors(int backofficeId)
    {
        
        IEnumerable <Supervisor> supervisors = _userManager.getSuperVisorsForBackoffice(backofficeId);
        
        if (!supervisors.Any())
        {
            return NoContent();
        }
        return Ok(supervisors);
    }
    
    
    [HttpPost]
    public IActionResult CreateSupervisor([FromBody] SupervisorDto supervisorDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        

        var supervisor = new Supervisor {
            Email = supervisorDto.Email,
            UserName = supervisorDto.Email,
            ImageUrl = supervisorDto.ImageUrl,
            BackOfficeId = supervisorDto.BackOfficeId
        };
        var result = _identityUserManager.CreateAsync(supervisor, supervisorDto.Password).Result;
        
        if (!result.Succeeded)
        {
            return BadRequest(result.Errors);
        }

        var addResult = _userManager.AddSupervisor(supervisor); 
        if (!addResult)
        {
            return BadRequest("Failed to add supervisor details");
        }

        return Ok(new { Message = "Supervisor added successfully", SupervisorId = supervisor.Id });
    }


}