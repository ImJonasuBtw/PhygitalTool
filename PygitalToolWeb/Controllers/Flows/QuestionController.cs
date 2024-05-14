using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using PhygitalTool.BL;
using PhygitalTool.Domain.FlowPackage;
using PhygitalTool.Domain.Projects;
using PhygitalTool.Domain.Util;

namespace PhygitalTool.Web.Controllers.Flows;

public class QuestionController : Controller
{
    private readonly IFlowManager _flowManager;
    private readonly IProjectManager _projectManager;
    private readonly ILogger<QuestionController> _logger;

    public QuestionController(ILogger<QuestionController> logger, IFlowManager iflowManager,
        IProjectManager projectManager)
    {
        _logger = logger;
        _flowManager = iflowManager;
        _projectManager = projectManager;
    }


    [HttpPost]
    public IActionResult SaveAnswerAndUserInput(string selectedAnswer, int currentFlow, int currentQuestion,
        int subThemeId)
    {
        SubTheme subTheme = _projectManager.GetSubTheme(subThemeId);
        int mainThemeId = subTheme.MainThemeId;
        MainTheme mainTheme = _projectManager.GetMainTheme(mainThemeId);
        int projectId = mainTheme.ProjectId;
        _flowManager.SaveUserAnswer(selectedAnswer, currentFlow, currentQuestion, projectId, mainThemeId, subThemeId);


        if (_flowManager.GetFlow(currentFlow).FlowType == FlowType.Circular)
        {
            return RedirectToAction("GetNextQuestion", "CircularFlow",
                new { flowId = currentFlow, questionId = currentQuestion, subThemeId = subThemeId });
        }

        return RedirectToAction("GetNextQuestion", "LinearFlow",
            new { flowId = currentFlow, questionId = currentQuestion, answer = selectedAnswer });
    }

    // Saves users input for multiple choice questions. Takes all the selected answers and saves them using a string array.
    [HttpPost]
    public IActionResult SaveAnswersAndUserInput(string[] selectedAnswers, int currentFlow, int currentQuestion,
        int subThemeId)
    {
        SubTheme subTheme = _projectManager.GetSubTheme(subThemeId);
        int mainThemeId = subTheme.MainThemeId;
        MainTheme mainTheme = _projectManager.GetMainTheme(mainThemeId);
        int projectId = mainTheme.ProjectId;

        for (int i = 0; i < selectedAnswers.Length; i++)
        {
            _flowManager.SaveUserAnswer(selectedAnswers[i].Equals("[]") ? "no answer" : selectedAnswers[i], currentFlow,
                currentQuestion, projectId, mainThemeId, subThemeId);
        }

        if (_flowManager.GetFlow(currentFlow).FlowType == FlowType.Circular)
        {
            return RedirectToAction("GetNextQuestion", "CircularFlow",
                new { flowId = currentFlow, questionId = currentQuestion, subThemeId = subThemeId });
        }

        return RedirectToAction("GetNextQuestion", "LinearFlow",
            new { flowId = currentFlow, questionId = currentQuestion });
    }

 
}