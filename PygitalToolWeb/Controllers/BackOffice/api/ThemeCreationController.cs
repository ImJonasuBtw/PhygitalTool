using Microsoft.AspNetCore.Authorization;
using PhygitalTool.BL.BackOffice;

namespace PhygitalTool.Web.Controllers.BackOffice.api;

using Microsoft.AspNetCore.Mvc;
using BL;
using Models;

[ApiController]
[Route("api/[controller]")]
public class ThemeCreationController : Controller
{
    private readonly IProjectManager _projectManager;
    private readonly ILogger<ThemeCreationController> _logger;
    private readonly UnitOfWork _unitOfWork;

    public ThemeCreationController(IProjectManager projectManager, ILogger<ThemeCreationController> logger,
        UnitOfWork unitOfWork)
    {
        _projectManager = projectManager;
        _logger = logger;
        _unitOfWork = unitOfWork;
    }

    [Authorize(Roles = "Manager")]
    [HttpPost("AddThemeToBackoffice")]
    public IActionResult AddThemeToBackoffice(ThemeModel theme)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        _unitOfWork.BeginTransaction();
        _projectManager.AddMainTheme(theme.ThemeName, theme.MainThemeInformation, theme.ProjectId);
        _unitOfWork.Commit();

        return Ok();
    }

    [Authorize(Roles = "Manager")]
    [HttpDelete("DeleteMainTheme/{mainThemeId}")]
    public IActionResult DeleteMainTheme(int mainThemeId)
    {
        try
        {
            _unitOfWork.BeginTransaction();
            _projectManager.DeleteMainTheme(mainThemeId);
            _unitOfWork.Commit();
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
    public IActionResult UpdateMainTheme(int mainThemeId, ThemeModel themeModel)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            _unitOfWork.BeginTransaction();
            _projectManager.UpdateMainTheme(mainThemeId, themeModel.ThemeName, themeModel.MainThemeInformation);
            _unitOfWork.Commit();

            return Ok();
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
}