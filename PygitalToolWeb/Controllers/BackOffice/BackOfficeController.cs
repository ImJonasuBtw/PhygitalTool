using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PhygitalTool.BL;

namespace PhygitalTool.Web.Controllers.BackOffice;

public class BackOfficeController : Controller
{
    private readonly IBackOfficeManager _backOfficeManager;

    private readonly ILogger<BackOfficeController> _logger;

    public BackOfficeController(IBackOfficeManager backOfficeManager,
        ILogger<BackOfficeController> logger)
    {
        _backOfficeManager = backOfficeManager;
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