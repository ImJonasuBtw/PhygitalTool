using Microsoft.AspNetCore.Mvc;
using PhygitalTool.BL;
using PhygitalTool.Domain.FlowPackage;

namespace PhygitalTool.Web.Controllers;

public class SubThemeController : Controller
{
    private readonly IFlowManager _flowManager;
    private readonly ILogger<SubThemeController> _logger;

    public SubThemeController(IFlowManager iFlowManager, ILogger<SubThemeController> logger)
    {
        _flowManager = iFlowManager;
        _logger = logger;
    }

    // Returns the information view after a user/supervisor selects a subtheme
    public IActionResult ShowSubThemeInformation(int flowId, int subThemeId)
    {
        FlowSubTheme flowSubTheme = _flowManager.GetFlowSubTheme(flowId, subThemeId);
        return View("SubThemeInformationBeginView", flowSubTheme);
    }
}