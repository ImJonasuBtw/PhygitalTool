using Microsoft.AspNetCore.Mvc;
using PhygitalTool.BL;
using PhygitalTool.Domain.Projects;
using PhygitalTool.Web.Models;

namespace PhygitalTool.Web.Controllers.BackOffice.api;

[ApiController]
[Route("api/[controller]")]
public class ProjectCreationController : Controller
{
    private readonly IProjectManager _projectManager;

    public ProjectCreationController(IProjectManager projectManager)
    {
        _projectManager = projectManager;
    }
    
    [HttpPost("AddProjectToBackoffice")]
    public IActionResult AddProjectToBackoffice([FromBody] ProjectModel project)
    {
        
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        
        var domainProject = new Domain.Projects.Project
        {
            Description = project.Description,
            ProjectName = project.ProjectName,
            CreationDate = project.CreationDate,
            Status = project.Status,
            BackOfficeId = project.BackOfficeId
        };

        _projectManager.AddProject(domainProject);
        return Ok();
    }
    
}