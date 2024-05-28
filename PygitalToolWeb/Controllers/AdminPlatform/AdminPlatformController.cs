using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PhygitalTool.BL.AdminPlatform;


namespace PhygitalTool.Web.Controllers.AdminPlatform;

public class AdminPlatformController : Controller
{
    private readonly IAdminPlatformManager _adminPlatformManager;

    public AdminPlatformController(IAdminPlatformManager adminPlatformManager)
    {
        _adminPlatformManager = adminPlatformManager;
    }

    // GET
    [Authorize(Roles = "Admin")]
    public IActionResult Index()
    {
        Domain.Platform.AdminPlatform adminPlatform = _adminPlatformManager.GetAdminPlatform();
        return View("AdminPlatformView", adminPlatform);
    }
}