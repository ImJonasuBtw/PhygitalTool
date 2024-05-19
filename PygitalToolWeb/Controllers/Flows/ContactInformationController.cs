using Microsoft.AspNetCore.Mvc;
using PhygitalTool.BL;
using PhygitalTool.Domain.FlowPackage;
using PhygitalTool.Web.Controllers.Flows;

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
        var contactInfoStart = new ContactInformation(_flowManager.GetFlow(id));
        return View("index", contactInfoStart);
    }
    
 
    [HttpPost]
    public IActionResult Contact(ContactInformation contactInformation, Dictionary<int, string> answers)
    {
        
        foreach (var answer in answers)
        {
            _flowManager.SaveUserAnswer(answer.Value, contactInformation.FlowId, answer.Key);
        }
        
        if(ModelState.IsValid)
        {
            _flowManager.SaveContactInformation(contactInformation);
            return RedirectToAction("Index", "Home"); 
        }
  
        contactInformation.Flow = _flowManager.GetFlow(contactInformation.FlowId);

        return View("Index", contactInformation);
        
        
    }
}