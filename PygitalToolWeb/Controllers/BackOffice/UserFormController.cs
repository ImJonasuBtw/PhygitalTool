using Microsoft.AspNetCore.Mvc;
using PhygitalTool.BL.Users;

namespace PhygitalTool.Web.Controllers.BackOffice;

public class UserFormController : Controller
{
    private readonly IUserManager _userManager;

    public UserFormController(IUserManager userManager)
    {
        _userManager = userManager;
    }
    public IActionResult Index()
    {
        var ideas = _userManager.GetAllIdeasWithUsers();
        return View("~/Views/UserIdea/UserIDeaForm.cshtml",ideas);
    }
}