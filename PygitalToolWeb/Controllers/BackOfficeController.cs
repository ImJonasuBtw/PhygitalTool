using Microsoft.AspNetCore.Mvc;
using PhygitalTool.BL;
using PhygitalTool.Domain.Platform;

namespace PhygitalTool.Web.Controllers;

public class BackOfficeController : Controller
{
    private readonly IBackOfficeManager _backOfficeManager;

    private readonly ILogger<BackOfficeController> _logger;

    public BackOfficeController(IBackOfficeManager backOfficeManager, ILogger<BackOfficeController> logger)
    {
        _backOfficeManager = backOfficeManager;
        _logger = logger;
    }

    // GET
    public IActionResult Index(int managerId)
    {
        BackOffice backOffice = _backOfficeManager.GetBackOfficeForManager(managerId);
        return View("ProjectsView",backOffice);
    }
}