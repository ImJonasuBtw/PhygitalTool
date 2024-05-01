using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis;
using PhygitalTool.BL;
using PhygitalTool.Domain.FlowPackage;
using PhygitalTool.Web.Models;
using Project = PhygitalTool.Domain.Projects.Project;

namespace PhygitalTool.Web.Controllers.BackOffice.api;

[ApiController]
[Route("api/[controller]")]
public class ResultsController : Controller
{
    private readonly IProjectManager _projectManager;
    private readonly IFlowManager _flowManager;
    private readonly ILogger<ResultsController> _logger;

    public ResultsController(IProjectManager iProjectManager,IFlowManager iFlowManager , ILogger<ResultsController> logger)
    {
        _projectManager = iProjectManager;
        _flowManager = iFlowManager;
        _logger = logger;
    }
    
    [HttpGet("GetProjectWithData/{projectId}")]
    public IActionResult GetProjectWithData(int projectId)
    {
        var userInputs = _flowManager.GetAllUserInputsForProject(projectId);
        if (userInputs == null)
        {
            return NotFound($"No user inputs found for project with ID {projectId}.");
        }

        var response = new ProjectDataResponseModel
        {
            UserInputs = userInputs
        };

        return Ok(response);
    }
    // Voeg een nieuwe endpoint toe om alle antwoorden met hun bijbehorende vragen op te halen
    [HttpGet("GetAllAnswersWithQuestions")]
    public IActionResult GetAllAnswersWithQuestions()
    {
        try
        {
            var answersWithQuestions = _flowManager.GetAllAnswersWithQuestions();
            if (answersWithQuestions == null)
            {
                return NotFound("No answers with questions found.");
            }

            return Ok(answersWithQuestions);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }



    // Returns the information view after a user/supervisor selects a subtheme
    public IActionResult Index(int projectId)
    {
        Project project = _projectManager.GetProjectWithThemes(projectId);
        return View("~/Views/BackOffice/ResultsView.cshtml", project);
    }
}