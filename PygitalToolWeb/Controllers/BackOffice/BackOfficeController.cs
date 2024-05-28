using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PhygitalTool.BL.BackOffice;

namespace PhygitalTool.Web.Controllers.BackOffice;

public class BackOfficeController : Controller
{
    private readonly IBackOfficeManager _backOfficeManager;

    public BackOfficeController(IBackOfficeManager backOfficeManager)
    {
        _backOfficeManager = backOfficeManager;
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