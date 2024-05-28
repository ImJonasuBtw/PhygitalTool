using Microsoft.AspNetCore.Mvc;
using PhygitalTool.BL.BackOffice;
using PhygitalTool.BL.Flows;
using PhygitalTool.Domain.FlowPackage;

namespace PhygitalTool.Web.Controllers.Flows;

public class SubThemeController : Controller
{
    private readonly IFlowManager _flowManager;
    private readonly IProjectManager _projectManager;

    public SubThemeController(IFlowManager iFlowManager, IProjectManager projectManager)
    {
        _flowManager = iFlowManager;
        _projectManager = projectManager;
    }

    // Returns the information view after a user/supervisor selects a subtheme
    public IActionResult ShowSubThemeInformation(int flowId)
    {
        Flow flow = _flowManager.GetFlow(flowId);
        return View("SubThemeInformationBeginView", flow);
    }

    public IActionResult ShowSubThemeSelection(int mainThemeId )
    {
        var mainTheme = _projectManager.GetThemeWithSubthemes(mainThemeId);
        return View("SubThemeSelectionView", mainTheme);
    }
}