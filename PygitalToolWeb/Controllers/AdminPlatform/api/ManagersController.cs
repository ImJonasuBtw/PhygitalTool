using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using PhygitalTool.BL.AdminPlatform;
using PhygitalTool.BL.Users;
using PhygitalTool.Domain.Platform;
using PhygitalTool.Web.Models;

namespace PhygitalTool.Web.Controllers.AdminPlatform.api;

[ApiController]
[Route("api/[controller]")]
public class ManagersController : Controller
{
    private readonly IUserManager _userManager;
    

    private readonly UserManager<IdentityUser> _identityUserManager;
    private const string Managerrole = "Manager";
    public ManagersController(IUserManager userManager, UserManager<IdentityUser> identityUserManager,IAdminPlatformManager adminPlatformManager)
    {
        _userManager = userManager;
        _identityUserManager = identityUserManager;
        
    }
    [Authorize(Roles = "Admin")]
    [HttpGet("GetManagers")]
    public IActionResult GetManagers()
    {
        
        IEnumerable <Manager> managers = _userManager.GetManagers();
        
        if (!managers.Any())
        {
            return NoContent();
        }
        return Ok(managers);
    }
    [Authorize(Roles = "Admin")]
    [HttpPost]
    public IActionResult CreateManager(ManagerDto  managerDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        
        var manager = new Manager() {
            Email = managerDto.Email,
            UserName = managerDto.Email,
            ImageUrl = managerDto.ImageUrl,
            BackOfficeId = managerDto.BackOfficeId,
            EmailConfirmed = true
        };
        
        var result = _identityUserManager.CreateAsync(manager, managerDto.Password).Result;
        _identityUserManager.AddToRoleAsync(manager, Managerrole).Wait();
        if (!result.Succeeded)
        {
            return BadRequest(result.Errors);
        }

        return Ok(new { Message = "Manager added successfully"});
    }
  
}
