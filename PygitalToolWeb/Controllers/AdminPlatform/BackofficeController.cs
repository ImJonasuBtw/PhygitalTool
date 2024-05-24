using Microsoft.AspNetCore.Mvc;
using PhygitalTool.BL;
using PhygitalTool.BL.AdminPlatform;


namespace PhygitalTool.Web.Controllers.AdminPlatform;
[ApiController]
[Route("api/[controller]")]
public class BackofficeController : Controller
{
    private readonly IAdminPlatformManager _adminPlatformManager;

    public BackofficeController(IAdminPlatformManager adminPlatformManager)
    {
        _adminPlatformManager = adminPlatformManager;
    }
    [HttpGet("GetBackoffices")]
    public IActionResult GetBackoffices()
    {
        
        IEnumerable <Domain.Platform.BackOffice> backoffices = _adminPlatformManager.GetBackoffices();
        
        if (!backoffices.Any())
        {
            return NoContent();
        }
        return Ok(backoffices);
    }
}