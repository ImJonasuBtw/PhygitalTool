using Microsoft.AspNetCore.Mvc;
using PhygitalTool.BL;
using PhygitalTool.BL.BackOffice;
using PhygitalTool.BL.Flows;
using PhygitalTool.Domain.FlowPackage;

namespace PhygitalTool.Web.Controllers;

public class SubThemeController : Controller
{
    private readonly IFlowManager _flowManager;
    private readonly IProjectManager _projectManager;
    
    private readonly ILogger<SubThemeController> _logger;

    public SubThemeController(IFlowManager iFlowManager, ILogger<SubThemeController> logger, IProjectManager projectManager)
    {
        _flowManager = iFlowManager;
        _projectManager = projectManager;
        _logger = logger;
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