using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using PhygitalTool.BL;
using PhygitalTool.BL.BackOffice;
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
    [Authorize(Roles = "Manager")]
    public IActionResult Index(int subThemeId)
    {
        SubTheme subTheme = _projectManager.GetSubTheme(subThemeId);
        return View("~/Views/BackOffice/FlowsView.cshtml",subTheme);
    } 
}