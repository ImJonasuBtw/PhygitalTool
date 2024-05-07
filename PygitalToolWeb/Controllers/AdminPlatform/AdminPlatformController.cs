using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PhygitalTool.BL;
using PhygitalTool.BL.AdminPlatform;

namespace PhygitalTool.Web.Controllers.AdminPlatform;

public class AdminPlatformController : Controller
{
    private readonly IAdminPlatformManager _adminPlatformManager;

    private readonly ILogger<AdminPlatformController> _logger;

    public AdminPlatformController(IBackOfficeManager backOfficeManager,
        ILogger<AdminPlatformController> logger)
    {
        _adminPlatformManager = AdminPlatformManager;
        _logger = logger;
    }

    // GET
    [Authorize(Roles = "Admin")]
    public IActionResult Index()
    {
        string adminId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        Domain.Platform.AdminPlatform adminPlatform = _adminPlatformManager.GetBackOfficeForManager(adminId);
        return View("AdminPlatformView", adminPlatform);
    }
    
}