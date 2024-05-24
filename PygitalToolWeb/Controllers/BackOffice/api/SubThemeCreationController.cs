using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PhygitalTool.BL;
using PhygitalTool.BL.BackOffice;
using PhygitalTool.Web.Models;

namespace PhygitalTool.Web.Controllers.BackOffice.api;

[ApiController]
[Route("api/[controller]")]
public class SubThemeCreationController : Controller
{
    private readonly IProjectManager _projectManager;
    private readonly ILogger<SubThemeCreationController> _logger;
    private readonly UnitOfWork _unitOfWork;

    public SubThemeCreationController(IProjectManager projectManager, ILogger<SubThemeCreationController> logger, UnitOfWork unitOfWork)
    {
        _projectManager = projectManager;
        _logger = logger;
        _unitOfWork = unitOfWork;
    }
    
    [Authorize(Roles = "Manager")]
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
 
        _unitOfWork.BeginTransaction();
        _projectManager.AddSubTheme(domainSubTheme);
        _unitOfWork.Commit();
        return Ok();
    }
    [Authorize(Roles = "Manager")]
    [HttpDelete("DeleteSubTheme/{subThemeId}")]
    public IActionResult DeleteSubTheme(int subThemeId)
    {
        try
        {
            _unitOfWork.BeginTransaction();
            _projectManager.DeleteSubTheme(subThemeId);
            _unitOfWork.Commit();
            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest($"Error deleting subTheme: {ex.Message}");
        }
    }
    [Authorize(Roles = "Manager")]
    [HttpGet("GetSubThemeDetails/{subThemeId}")]
    public IActionResult GetSubThemeDetails(int subThemeId)
    {
        try
        {
            var subTheme = _projectManager.GetSubTheme(subThemeId);
            if (subTheme == null)
            {
                return NotFound($"Subtheme with ID {subThemeId} not found.");
            }

            var model = new SubThemeModel()
            {
                SubThemeName = subTheme.SubThemeName,
                SubThemeInformation = subTheme.SubThemeInformation,
                MainThemeId = subTheme.MainThemeId
            };
        
            return Ok(model);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
    [Authorize(Roles = "Manager")]
    [HttpPut("UpdateSubTheme/{subThemeId}")]
    public IActionResult UpdateSubTheme(int subThemeId, [FromBody] SubThemeModel subThemeModel)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            var existingSubTheme = _projectManager.GetSubThemeWithFlows(subThemeId);
            if (existingSubTheme == null)
            {
                return NotFound($"Subtheme with ID {subThemeId} not found.");
            }

            existingSubTheme.SubThemeName = subThemeModel.SubThemeName;
            existingSubTheme.SubThemeInformation = subThemeModel.SubThemeInformation;
            _unitOfWork.BeginTransaction();
            _projectManager.UpdateSubTheme(existingSubTheme);
            _unitOfWork.Commit();

            return Ok();
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }


}