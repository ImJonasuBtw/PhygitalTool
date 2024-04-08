using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using PhygitalTool.BL;
using PhygitalTool.Domain.Platform;
using PhygitalTool.Domain.Projects;

namespace PhygitalTool.Web.Controllers;

public class BackOfficeController : Controller
{
    private readonly IBackOfficeManager _backOfficeManager;
    private readonly IProjectManager _projectManager;

    private readonly ILogger<BackOfficeController> _logger;

    public BackOfficeController(IBackOfficeManager backOfficeManager, IProjectManager projectManager,
        ILogger<BackOfficeController> logger)
    {
        _backOfficeManager = backOfficeManager;
        _projectManager = projectManager;
        _logger = logger;
    }

    // GET
    [Authorize]
    public IActionResult Index()
    {
        string managerId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        BackOffice backOffice = _backOfficeManager.GetBackOfficeForManager(managerId);
        TempData["ManagerId"] = managerId;
        return View("ProjectsView", backOffice);
    }

    [HttpPost]
    public IActionResult Create(Project project, int backOfficeId, int managerId)
    {
        BackOffice backOffice = _backOfficeManager.GetBackOffice(backOfficeId);
        if (ModelState.IsValid)
        {
            try
            {
                project.BackOfficeId = backOfficeId;
                project.CreationDate = DateTime.UtcNow;
                _projectManager.AddProject(project);
                
                return RedirectToAction(nameof(Index), new {managerId});
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating project");
                ModelState.AddModelError(string.Empty, "An error occurred while creating the project.");
            }
        }
        return View("ProjectsView", backOffice);
    }
}