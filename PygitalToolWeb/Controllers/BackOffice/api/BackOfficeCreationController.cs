using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PhygitalTool.BL;
using PhygitalTool.Domain.Projects;
using PhygitalTool.Domain.Platform;
using PhygitalTool.Web.Models;

namespace PhygitalTool.Web.Controllers.BackOffice.api;

[ApiController]
[Route("api/[controller]")]

public class BackOfficeCreationController : Controller
{
    private readonly IBackOfficeManager _backOfficeManager;
    
    public BackOfficeCreationController(IBackOfficeManager backOfficeManager)
    {
        _backOfficeManager = backOfficeManager;
    }
    
    
    [Authorize(Roles = "Admin")]
    [HttpPost("AddBackOffice")]
    
    public IActionResult AddBackOffice([FromBody] BackOfficeModel backOffice)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        
        var domainBackOffice = new Domain.Platform.BackOffice
        {
            Name = backOffice.Name,
            AdminPlatformId = backOffice.AdminPlatformId
        };

        _backOfficeManager.AddBackOffice(domainBackOffice);
        return Ok();
    }
}