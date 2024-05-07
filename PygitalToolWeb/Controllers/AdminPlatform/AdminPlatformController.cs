using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PhygitalTool.BL;

namespace PhygitalTool.Web.Controllers.AdminPlatform;

public class AdminPlatformController : Controller
{
    private readonly IAdminPlatformManager _adminPlatformManager;

    private readonly ILogger<AdminPlatformController> _logger;

    public AdminPlatformController(IAdminPlatformManager adminPlatformManager,
        ILogger<AdminPlatformController> logger)
    {
        _adminPlatformManager = adminPlatformManager;
        _logger = logger;
    }

    // GET
    [Authorize(Roles = "Admin")]
    public IActionResult Index()
    {
        Domain.Platform.AdminPlatform adminPlatform = _adminPlatformManager.GetAdminPlatform();
        return View("AdminPlatformView", adminPlatform);
    }
    
}