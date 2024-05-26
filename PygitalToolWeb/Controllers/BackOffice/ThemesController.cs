using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PhygitalTool.BL;
using PhygitalTool.BL.BackOffice;
using PhygitalTool.Domain.Projects;

namespace PhygitalTool.Web.Controllers.BackOffice;

public class ThemesController : Controller
{
    private readonly IProjectManager _projectManager;

    public ThemesController(IProjectManager projectManager)
    {
        _projectManager = projectManager;
    }

    // GET
    [Authorize(Roles = "Manager")]
    public IActionResult Index(int themeId)
    {
        MainTheme mainTheme = _projectManager.GetThemeWithSubthemes(themeId);
        return View("~/Views/BackOffice/SubThemesView.cshtml",mainTheme);
    }
    
}