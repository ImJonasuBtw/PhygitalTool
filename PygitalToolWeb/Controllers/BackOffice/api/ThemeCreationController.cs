
using Microsoft.AspNetCore.Authorization;

namespace PhygitalTool.Web.Controllers.BackOffice.api;

using Microsoft.AspNetCore.Mvc;
using PhygitalTool.BL;
using PhygitalTool.Web.Models;


[ApiController]
[Route("api/[controller]")]
public class ThemeCreationController : Controller
{
    private readonly IProjectManager _projectManager;
    private readonly ILogger<ThemeCreationController> _logger;

    public ThemeCreationController(IProjectManager projectManager, ILogger<ThemeCreationController> logger)
    {
        _projectManager = projectManager;
        _logger = logger;
    }
    
    [Authorize(Roles = "Manager")]
    [HttpPost("AddThemeToBackoffice")]
    public IActionResult AddThemeToBackoffice([FromBody] ThemeModel theme)
    {
        
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        
        var domainTheme = new Domain.Projects.MainTheme
        {
            ThemeName = theme.ThemeName,
            MainThemeInformation = theme.MainThemeInformation,
            ProjectId = theme.ProjectId
        };

        _projectManager.AddMainTheme(domainTheme);
        return Ok();
    }
    [Authorize(Roles = "Manager")]
    [HttpDelete("DeleteMainTheme/{mainThemeId}")]
    public IActionResult DeleteMainTheme(int mainThemeId)
    {
        try
        {
            _projectManager.DeleteMainTheme(mainThemeId);
            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest($"Error deleting subTheme: {ex.Message}");
        }
    }
    [Authorize(Roles = "Manager")]
    [HttpGet("GetMainThemeDetails/{mainthemeId}")]
    public IActionResult GetMainThemeDetails(int mainthemeId)
    {
        try
        {
            var mainTheme = _projectManager.GetThemeWithSubthemes(mainthemeId);
            Console.WriteLine($"{mainTheme}");
            if (mainTheme == null)
            {
                return NotFound($"Theme with ID {mainthemeId} not found.");
            }

            var model = new ThemeModel()
            {
                ThemeName = mainTheme.ThemeName,
                MainThemeInformation = mainTheme.MainThemeInformation,
                ProjectId = mainTheme.ProjectId
            };
        
            return Ok(model);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
    [Authorize(Roles = "Manager")]
    [HttpPut("UpdateMainTheme/{mainThemeId}")]
    public IActionResult UpdateMainTheme(int mainThemeId, [FromBody] ThemeModel themeModel)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            var existingMainTheme = _projectManager.GetThemeWithSubthemes(mainThemeId);
            if (existingMainTheme == null)
            {
                return NotFound($"Maintheme with ID {mainThemeId} not found.");
            }

            existingMainTheme.ThemeName = themeModel.ThemeName;
            existingMainTheme.MainThemeInformation = themeModel.MainThemeInformation;
       
            _projectManager.UpdateMainTheme(existingMainTheme);
            _logger.LogInformation("Existing main theme: {@ExistingMainTheme}", existingMainTheme);

            return Ok();
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }


}