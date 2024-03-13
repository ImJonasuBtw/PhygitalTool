
using BL;
using Domain.FlowPackage;
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
    public IActionResult SaveAnswerAndUserInput(string selectedAnswer)
    {
        // logic to store the user's response in the database
        int newUserid;
        int newAnswerId;
       //TODO Knowing if it's the same user or not, for the userID
        if (_flowManager.GetAllUserInputs().IsNullOrEmpty())
        {
            newUserid = 1;
        }
        else
        {
            int maxUserId = _flowManager.GetAllUserInputs().Max(a => a.UserId);
             newUserid = maxUserId+1;
        }

        if (_flowManager.GetAllAnswers().IsNullOrEmpty())
        {
            newAnswerId = 1;
        }
        else
        {
            int MaxAnswerId = _flowManager.GetAllAnswers().Max(a => a.AnswerId);
            newAnswerId = MaxAnswerId + 1;
        }
        
        //TODO Jonas Still has to make the flow :)
        _flowManager.AddAnswer(newAnswerId, selectedAnswer);
        _flowManager.AddUserInput(newUserid, 1, newUserid);
        
        
        return View("index");
    }
    public IActionResult Open(int id)
    {
        Question question = _flowManager.GetQuestion(id);
        return View(question);
        
    }
  
}