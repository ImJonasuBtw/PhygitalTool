using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PhygitalTool.BL;
using PhygitalTool.BL.BackOffice;
using PhygitalTool.Domain.Projects;
using PhygitalTool.Domain.Util;
using PhygitalTool.Web.Models;

namespace PhygitalTool.Web.Controllers.BackOffice.api;

[ApiController]
[Route("api/[controller]")]
public class ProjectCreationController : Controller
{
    private readonly IProjectManager _projectManager;
    private readonly UnitOfWork _unitOfWork;

    public ProjectCreationController(IProjectManager projectManager, UnitOfWork unitOfWork)
    {
        _projectManager = projectManager;
        _unitOfWork = unitOfWork;
    }

    [Authorize(Roles = "Manager")]
    [HttpPost("AddProjectToBackoffice")]
    public IActionResult AddProjectToBackoffice([FromBody] ProjectModel project)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            var domainProject = new Project
            {
                Description = project.Description,
                ProjectName = project.ProjectName,
                CreationDate = DateTime.UtcNow,
                Status = ProjectStatus.NonActive,
                BackOfficeId = project.BackOfficeId
            };
            _unitOfWork.BeginTransaction();
            _projectManager.AddProject(domainProject);
            _unitOfWork.Commit();
            return Ok();
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [Authorize(Roles = "Manager")]
    [HttpDelete("DeleteProject/{projectId}")]
    public IActionResult DeleteProject(int projectId)
    {
        try
        {
            _unitOfWork.BeginTransaction();
            _projectManager.DeleteProject(projectId);
            _unitOfWork.Commit();
            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest($"Error deleting project: {ex.Message}");
        }
    }

    [Authorize(Roles = "Manager")]
    [HttpGet("GetProjectDetails/{projectId}")]
    public IActionResult GetProjectDetails(int projectId)
    {
        try
        {
            var project = _projectManager.GetProjectWithThemes(projectId);
            if (project == null)
            {
                return NotFound($"Project with ID {projectId} not found.");
            }

            var model = new ProjectModel
            {
                ProjectName = project.ProjectName,
                Description = project.Description,
                ProjectId = project.ProjectId,
                Status = project.Status,
                BackOfficeId = project.BackOfficeId
            };

            return Ok(model);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [Authorize(Roles = "Manager")]
    [HttpPut("UpdateProject/{projectId}")]
    public IActionResult UpdateProject(int projectId, [FromBody] ProjectModel projectModel)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            var existingProject = _projectManager.GetProjectWithThemes(projectId);
            if (existingProject == null)
            {
                return NotFound($"Project with ID {projectId} not found.");
            }

            existingProject.ProjectName = projectModel.ProjectName;
            existingProject.Description = projectModel.Description;
            existingProject.Status = projectModel.Status;

            _unitOfWork.BeginTransaction();
            _projectManager.UpdateProject(existingProject);
            _unitOfWork.Commit();

            return Ok();
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
}