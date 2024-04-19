using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using PhygitalTool.BL;
using PhygitalTool.Domain.Projects;

namespace PhygitalTool.Web.Controllers.BackOffice;

public class SubThemeController: Controller
{
    private readonly IProjectManager _projectManager;

    public SubThemeController(IProjectManager projectManager)
    {
        _projectManager = projectManager;
    }

    // GET
    public IActionResult Index(int subThemeId)
    {
        SubTheme subTheme = _projectManager.GetSubTheme(subThemeId);
        return View("~/Views/BackOffice/FlowsView.cshtml",subTheme);
    }
}