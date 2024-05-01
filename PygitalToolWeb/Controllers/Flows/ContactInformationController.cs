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
    
    // Returns to home after user fills in contact form
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
        
        
        return RedirectToAction("Index", new { id = contactInformation.FlowId });
    }
}