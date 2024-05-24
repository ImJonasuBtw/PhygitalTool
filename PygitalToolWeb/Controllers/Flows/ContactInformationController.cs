using Microsoft.AspNetCore.Mvc;
using PhygitalTool.BL;
using PhygitalTool.BL.Flows;
using PhygitalTool.Domain.FlowPackage;
using PhygitalTool.Web.Controllers.Flows;

namespace PhygitalTool.Web.Controllers;

public class ContactInformationController : Controller
{
    
    private readonly IFlowManager _flowManager;
    private readonly ILogger<QuestionController> _logger;
    private readonly UnitOfWork _unitOfWork;
    
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
            _flowManager.AddUserAnswer(answer.Value, contactInformation.FlowId, answer.Key);
        }
        
        if(ModelState.IsValid)
        {
            _unitOfWork.BeginTransaction();
            _flowManager.SaveContactInformation(contactInformation);
            _unitOfWork.Commit();
            return RedirectToAction("Index", "Home"); 
        }
  
        contactInformation.Flow = _flowManager.GetFlow(contactInformation.FlowId);

        return View("Index", contactInformation);
        
        
    }
}