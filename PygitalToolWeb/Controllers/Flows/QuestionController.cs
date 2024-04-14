using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using PhygitalTool.BL;
using PhygitalTool.Domain.FlowPackage;
using PhygitalTool.Domain.Util;

namespace PhygitalTool.Web.Controllers;

public class QuestionController : Controller
{
    private readonly IFlowManager _flowManager;
    private readonly ILogger<QuestionController> _logger;

    public QuestionController(ILogger<QuestionController> logger, IFlowManager iflowManager)
    {
        _logger = logger;
        _flowManager = iflowManager;
    }

    // Slaat de input van de user op voor single choice, range of 
    [HttpPost]
    public IActionResult SaveAnswerAndUserInput(string selectedAnswer, int currentFlow, int currentQuestion,
        int subThemeId)
    {
        
        _flowManager.SaveUserAnswer(selectedAnswer, currentFlow, currentQuestion);
        
        // Forward to appropriate controller based on type of current
        if (_flowManager.GetFlow(currentFlow).FlowType == FlowType.Circular)
        {
            return RedirectToAction("GetNextQuestion", "CircularFlow",
                new { flowId = currentFlow, questionId = currentQuestion, subThemeId = subThemeId });
        }

        return RedirectToAction("GetNextQuestion", "LinearFlow",
            new { flowId = currentFlow, questionId = currentQuestion, answer = selectedAnswer});
    }

    // Saves users input for multiple choice questions. Takes all the selected answers and saves them using a string array.
    [HttpPost]
    public IActionResult SaveAnswersAndUserInput(string[] selectedAnswers, int currentFlow, int currentQuestion,
        int subThemeId)
    {
        // Loop through all selected answers and save them to the database
        for (int i = 0; i < selectedAnswers.Length; i++)
        {
            _flowManager.SaveUserAnswer(selectedAnswers[i].Equals("[]") ? "no answer" : selectedAnswers[i], currentFlow, currentQuestion);
            
        }
        // Note: You could pass the new answer IDs to the next action, depending on your requirements.
        // If flow is circular, go to next question using CircularFlowController, else use LinearFlowController.
        if (_flowManager.GetFlow(currentFlow).FlowType == FlowType.Circular)
        {
            return RedirectToAction("GetNextQuestion", "CircularFlow",
                new { flowId = currentFlow, questionId = currentQuestion, subThemeId = subThemeId });
        }

        return RedirectToAction("GetNextQuestion", "LinearFlow",
            new { flowId = currentFlow, questionId = currentQuestion });
    }

    // Returns view of a single choice question
    public IActionResult SingleChoice(int id)
    {
        Question question = _flowManager.GetQuestionWithAnswerPossibilities(id);
        return View(question);
    }

    // Returns an open question view using its id
    public IActionResult Open(int id)
    {
        Question question = _flowManager.GetQuestion(id);
        return View(question);
    }

    // Returns a multiple choice question view using its id
    public IActionResult MultipleChoice(int id)
    {
        Question question = _flowManager.GetQuestionWithAnswerPossibilities(id);
        return View(question);
    }

    // Returns a range question view using its id
    public IActionResult Range(int id)
    {
        Question question = _flowManager.GetQuestionWithAnswerPossibilities(id);
        return View(question);
    }
}