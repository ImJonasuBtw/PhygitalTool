using BL;
using Domain.FlowPackage;
using Domain.Projects;
using Microsoft.AspNetCore.Mvc;

namespace PygitalToolWeb.Controllers;

public class SubThemeController : Controller
{
    private readonly IFlowManager _flowManager;
    private readonly ILogger<SubThemeController> _logger;

    public SubThemeController(IFlowManager iFlowManager, ILogger<SubThemeController> logger)
    {
        _flowManager = iFlowManager;
        _logger = logger;
    }

    public IActionResult ShowSubThemeInformation(int flowId, int subThemeId)
    {
        FlowSubTheme flowSubTheme = _flowManager.GetFlowSubTheme(flowId, subThemeId);
        return View("SubThemeInformationView", flowSubTheme);
    }
}