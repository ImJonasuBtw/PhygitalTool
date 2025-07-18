﻿using Microsoft.AspNetCore.Authorization;
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
    private readonly UnitOfWork _unitOfWork;

    public SubThemeCreationController(IProjectManager projectManager, UnitOfWork unitOfWork)
    {
        _projectManager = projectManager;
        _unitOfWork = unitOfWork;
    }
    
    [Authorize(Roles = "Manager")]
    [HttpPost("AddSubThemeToBackoffice")]
    public IActionResult AddSubThemeToBackoffice(SubThemeModel subTheme)
    {
        
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        
        _unitOfWork.BeginTransaction();
        _projectManager.AddSubTheme(subTheme.SubThemeName, subTheme.SubThemeInformation, subTheme.MainThemeId);
        _unitOfWork.Commit();
        
        return NoContent();
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
    public IActionResult UpdateSubTheme(int subThemeId, SubThemeModel subThemeModel)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            _unitOfWork.BeginTransaction();
            _projectManager.UpdateSubTheme(subThemeId, subThemeModel.SubThemeName, subThemeModel.SubThemeInformation);
            _unitOfWork.Commit();

            return Ok();
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }


}