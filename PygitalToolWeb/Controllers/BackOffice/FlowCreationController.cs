using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PhygitalTool.BL;
using PhygitalTool.BL.BackOffice;
using PhygitalTool.Domain.FlowPackage;
using PhygitalTool.Domain.Projects;

namespace PhygitalTool.Web.Controllers.BackOffice;

public class FlowCreationController : Controller
{
    private readonly IProjectManager _projectManager;

    public FlowCreationController(IProjectManager projectManager)
    {
        _projectManager = projectManager;
    }

    // GET
    [Authorize(Roles = "Manager")]
    public IActionResult Index(int subThemeId)
    {
        SubTheme subTheme = _projectManager.GetSubThemeWithFlows(subThemeId);
        return View("~/Views/BackOffice/FlowsView.cshtml", subTheme);
    }
}