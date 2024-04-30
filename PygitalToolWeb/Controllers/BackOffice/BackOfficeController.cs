using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PhygitalTool.BL;

namespace PhygitalTool.Web.Controllers.BackOffice;

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
    [Authorize(Roles = "Manager")]
    public IActionResult Index()
    {
        string managerId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        Domain.Platform.BackOffice backOffice = _backOfficeManager.GetBackOfficeForManager(managerId);
        return View("ProjectsView", backOffice);
    }
    
}