
using BL;
using Domain.Flow;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace PygitalToolWeb.Controllers;

public class QuestionController : Controller
{
    private readonly IFlowManager _flowManager;
    private readonly ILogger<QuestionController> _logger;

    public QuestionController(ILogger<QuestionController> logger, IFlowManager iflowManager)
    {
        _logger = logger;
        _flowManager = iflowManager;
    }

    public IActionResult SingleChoice(int id)
    {
        Question question = _flowManager.GetQuestionWithAnswerPossibilities(id);
        return View(question);
        
    }
    [HttpPost]
    public IActionResult SaveAnswer(int selectedAnswer)
    {
        // logic to store the user's response in the database
        int newUserid;
        //TODO Have user id done automatically
        if (_flowManager.GetAllUserInputs().IsNullOrEmpty())
        {
            newUserid = 1;
        }
        else
        {
            int maxUserId = _flowManager.GetAllUserInputs().Max(a => a.UserId);
             newUserid = maxUserId+1;
        }
        //TODO Jonas Still has to make the flow :)
        _flowManager.AddUserInput(newUserid, 1, selectedAnswer);
        
        
        return View("index");
    }
}