using Microsoft.AspNetCore.Mvc;
using PhygitalTool.BL;
using PhygitalTool.Domain.FlowPackage;

namespace PhygitalTool.Web.Controllers;

public class ContactInformationController : Controller
{
    
    private readonly IFlowManager _flowManager;
    private readonly ILogger<QuestionController> _logger;
    
    public ContactInformationController(IFlowManager flowManager, ILogger<QuestionController> logger)
    {
        _flowManager = flowManager;
        _logger = logger;
    }

    // GET
    public IActionResult Index(int id)
    {
        var contactinfostart = new ContactInformation(_flowManager.GetFlow(id));
        return View("index", contactinfostart);
    }
    
    [HttpPost]
    public IActionResult Contact(ContactInformation contactInformation)
    {
        if(ModelState.IsValid)
        {
            _flowManager.SaveContactInformation(contactInformation);
            return RedirectToAction("Index", "Home"); 
        }
        
        return View("Index", contactInformation);
    }
}