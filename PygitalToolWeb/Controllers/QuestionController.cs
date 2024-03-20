using BL;
using Domain.Domain.Util;
using Domain.FlowPackage;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
    public IActionResult SaveAnswerAndUserInput(string selectedAnswer, int currentFlow, int currentQuestion)
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
            newUserid = maxUserId + 1;
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

        if (selectedAnswer.IsNullOrEmpty())
        {
            selectedAnswer = "no answer";
        }
        _flowManager.AddAnswer(newAnswerId, selectedAnswer, currentQuestion);
        _flowManager.AddUserInput(newUserid, currentFlow, newUserid);


        if (_flowManager.GetFlow(currentFlow).FlowType == FlowType.Circular)
        {
            return RedirectToAction("GetNextQuestion", "CircularFlow",
                new { flowId = currentFlow, questionId = currentQuestion });
        }
        
        return RedirectToAction("GetNextQuestion", "LiniareFlow",
            new { flowId = currentFlow, questionId = currentQuestion });
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

            _flowManager.AddAnswer(newAnswerId, 
                selectedAnswers[i].Equals("[]") ? "no answer" : selectedAnswers[i],
                currentQuestion);
            
            _flowManager.AddUserInput(newUserid, currentFlow, newUserid);
            newAnswerIds[i] = newAnswerId;
        }
        
        // Opmerking: Je zou de nieuwe antwoord-ID's kunnen doorgeven aan de volgende actie, afhankelijk van je vereisten.

        if (_flowManager.GetFlow(currentFlow).FlowType == FlowType.Circular)
        {
            return RedirectToAction("GetNextQuestion", "CircularFlow",
                new { flowId = currentFlow, questionId = currentQuestion });
        }
        
        return RedirectToAction("GetNextQuestion", "LiniareFlow",
                new { flowId = currentFlow, questionId = currentQuestion });
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