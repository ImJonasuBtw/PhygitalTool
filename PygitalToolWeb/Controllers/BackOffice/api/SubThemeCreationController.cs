using Microsoft.AspNetCore.Mvc;
using PhygitalTool.BL;
using PhygitalTool.Domain.Projects;
using PhygitalTool.Web.Models;

namespace PhygitalTool.Web.Controllers.BackOffice.api;

[ApiController]
[Route("api/[controller]")]
public class SubThemeCreationController : Controller
{
    private readonly IProjectManager _projectManager;

    public SubThemeCreationController(IProjectManager projectManager)
    {
        _projectManager = projectManager;
    }
    
    [HttpPost("AddSubThemeToBackoffice")]
    public IActionResult AddSubThemeToBackoffice([FromBody] SubThemeModel subTheme)
    {
        
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        
        var domainSubTheme = new Domain.Projects.SubTheme
        {
            SubThemeName = subTheme.SubThemeName,
            SubThemeInformation = subTheme.SubThemeInformation,
            MainThemeId = subTheme.MainThemeId
        };

        _projectManager.AddSubTheme(domainSubTheme);
        return Ok();
    }
    
}