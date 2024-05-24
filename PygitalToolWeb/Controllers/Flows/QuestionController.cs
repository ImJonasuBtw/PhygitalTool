using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.IdentityModel.Tokens;
using PhygitalTool.BL;
using PhygitalTool.BL.BackOffice;
using PhygitalTool.BL.Flows;
using PhygitalTool.Domain.FlowPackage;
using PhygitalTool.Domain.Projects;
using PhygitalTool.Domain.Util;

namespace PhygitalTool.Web.Controllers.Flows;

public class QuestionController : Controller
{
    private readonly IHubContext<QuestionHub> _hubContext;
    private readonly IFlowManager _flowManager;
    private readonly IProjectManager _projectManager;
    private readonly UnitOfWork _unitOfWork;
    private readonly ILogger<QuestionController> _logger;

    public QuestionController(IHubContext<QuestionHub> hubContext, ILogger<QuestionController> logger,
        IFlowManager iflowManager,
        IProjectManager projectManager, UnitOfWork unitOfWork)
    {
        _hubContext = hubContext;
        _logger = logger;
        _flowManager = iflowManager;
        _projectManager = projectManager;
        _unitOfWork = unitOfWork;
    }


    [HttpPost]
    public IActionResult SaveAnswerAndUserInput(string selectedAnswer, int currentFlow, int currentQuestion,
        int subThemeId)
    {
        SubTheme subTheme = _projectManager.GetSubTheme(subThemeId);
        int mainThemeId = subTheme.MainThemeId;
        MainTheme mainTheme = _projectManager.GetMainTheme(mainThemeId);
        int projectId = mainTheme.ProjectId;
        
        _unitOfWork.BeginTransaction();
        _flowManager.AddUserAnswer(selectedAnswer, currentFlow, currentQuestion, projectId, mainThemeId, subThemeId);
        _unitOfWork.Commit();


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
            _flowManager.AddUserAnswer(selectedAnswers[i].Equals("[]") ? "no answer" : selectedAnswers[i], currentFlow,
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

    [HttpGet("GetQuestion/{questionId}")]
    public IActionResult GetQuestion(int questionId)
    {
        Question question = _flowManager.GetQuestion(questionId);

        if (question == null)
        {
            return NotFound();
        }

        return Ok(question);
    }

    [HttpGet]
    public async Task<IActionResult> ShowQuestion(int questionId)
    {
        // Haal de vraag op uit de database op basis van de ID
        var question = _flowManager.GetQuestion(questionId);

        // Stuur de vraag naar de clients via SignalR
        await _hubContext.Clients.All.SendAsync("SendQuestion", question);
        return Ok(question);
    }

    public async Task UpdateCurrentQuestion(Question question)
    {
        await _hubContext.Clients.All.SendAsync("UpdateCurrentQuestion", question);
    }

    public async Task<IActionResult> QuestionInfo()
    {
        // Gebruik de huidige vraag in je weergave
        return Ok();
    }
}