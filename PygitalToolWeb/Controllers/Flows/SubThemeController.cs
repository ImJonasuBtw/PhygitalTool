using Microsoft.AspNetCore.Mvc;
using PhygitalTool.BL.BackOffice;
using PhygitalTool.BL.Flows;
using PhygitalTool.Domain.FlowPackage;

namespace PhygitalTool.Web.Controllers.Flows;

public class SubThemeController : Controller
{
    private readonly IFlowManager _flowManager;
    private readonly IBackOfficeManager _backOfficeManager;

    public SubThemeController(IFlowManager iFlowManager, IBackOfficeManager backOfficeManager)
    {
        _flowManager = iFlowManager;
        _backOfficeManager = backOfficeManager;
    }

    // Returns the information view after a user/supervisor selects a subtheme
    public IActionResult ShowSubThemeInformation(int flowId)
    {
        Flow flow = _flowManager.GetFlow(flowId);
        return View("SubThemeInformationBeginView", flow);
    }

    public IActionResult ShowSubThemeSelection(int backOfficeId )
    {
        var mainTheme = _backOfficeManager.GetBackOfficeWithProjectsAndStuff (backOfficeId);
        return View("SubThemeSelectionView", mainTheme);
    }
}