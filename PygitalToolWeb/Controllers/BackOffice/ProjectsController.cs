using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PhygitalTool.BL.BackOffice;
using PhygitalTool.Domain.Projects;

namespace PhygitalTool.Web.Controllers.BackOffice;

public class ProjectsController : Controller

{
    private readonly IProjectManager _projectManager;

    // GET
    public ProjectsController(IProjectManager projectManager)
    {
        _projectManager = projectManager;
    }

    [Authorize(Roles = "Manager")]
    public IActionResult Index(int projectId)
    {
        Project project = _projectManager.GetProjectWithThemes(projectId);
        return View("~/Views/BackOffice/ThemesView.cshtml", project);
    }
}