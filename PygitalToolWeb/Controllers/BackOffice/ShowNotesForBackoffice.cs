using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PhygitalTool.BL.BackOffice;
using PhygitalTool.BL.Flows;
using PhygitalTool.Domain.FlowPackage;
using PhygitalTool.Web.Models;


namespace PhygitalTool.Web.Controllers.BackOffice;

public class ShowNotesForBackoffice : Controller
{
    private readonly IFlowManager _flowManager;

    // GET
    public ShowNotesForBackoffice(IFlowManager flowManager)
    {
        _flowManager = flowManager;
    }

    // GET
    [Authorize(Roles = "Manager")]
    public IActionResult Index(int flowId)
    {
        Flow flow = _flowManager.GetFlowWithQuestionsAndNotesAndSubtheme(flowId);
        return View("~/Views/BackOffice/NotesView.cshtml", flow);
    }
    
}