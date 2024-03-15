
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
    public IActionResult SaveAnswerAndUserInput(string selectedAnswer , int currentFlow, int currentQuestion)
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

      
        
        return RedirectToAction("GetNextQuestion", "LiniareFlow", new { flowId = currentFlow, questionId = currentQuestion});
    }

      [HttpPost]
    public IActionResult SaveAnswersAndUserInput(string[] selectedAnswers, int currentFlow, int currentQuestion)
    {
        // Logica om de antwoorden van de gebruiker in de database op te slaan
        int newUserid;
        int[] newAnswerIds = new int[selectedAnswers.Length];

        // TODO: Bepalen of het dezelfde gebruiker is of niet, voor de gebruikers-ID
        if (_flowManager.GetAllUserInputs().IsNullOrEmpty())
        {
            newUserid = 1;
        }
        else
        {
            int maxUserId = _flowManager.GetAllUserInputs().Max(a => a.UserId);
            newUserid = maxUserId + 1;
        }

        // Loop door alle geselecteerde antwoorden en sla ze op in de database
        for (int i = 0; i < selectedAnswers.Length; i++)
        {
            int newAnswerId;
            if (_flowManager.GetAllAnswers().IsNullOrEmpty())
            {
                newAnswerId = 1;
            }
            else
            {
                int maxAnswerId = _flowManager.GetAllAnswers().Max(a => a.AnswerId);
                newAnswerId = maxAnswerId + 1;
            }
            
            // TODO: Jonas moet nog de rest van de logica implementeren :)
            _flowManager.AddAnswer(newAnswerId, selectedAnswers[i]);
            _flowManager.AddUserInput(newUserid, 1, newUserid);
            newAnswerIds[i] = newAnswerId;
        }

        _flowManager.AddUserInput(newUserid, 1, newUserid);
        // Opmerking: Je zou de nieuwe antwoord-ID's kunnen doorgeven aan de volgende actie, afhankelijk van je vereisten.
            
        return RedirectToAction("GetNextQuestion", "LiniareFlow", new { flowId = currentFlow, questionId = currentQuestion});
    }

    public IActionResult Open(int id)
    {
        Question question = _flowManager.GetQuestion(id);
        return View(question);
        
    }
    public IActionResult MultipleChoice(int id)
    {
        Question question = _flowManager.GetQuestionWithAnswerPossibilities(id);
        return View(question);
    }
    public IActionResult Range(int id)
    {
        Question question = _flowManager.GetQuestionWithAnswerPossibilities(id);
        return View(question);
    }
    
}