using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PhygitalTool.BL.BackOffice;
using PhygitalTool.BL.Flows;
using PhygitalTool.Domain.Projects;
using PhygitalTool.Web.Models;
using Project = PhygitalTool.Domain.Projects.Project;

namespace PhygitalTool.Web.Controllers.BackOffice.api;

[ApiController]
[Route("api/[controller]")]
public class ResultsController : Controller
{
    private readonly IProjectManager _projectManager;
    private readonly IFlowManager _flowManager;

    public ResultsController(IProjectManager iProjectManager, IFlowManager iFlowManager)
    {
        _projectManager = iProjectManager;
        _flowManager = iFlowManager;
    }

    [Authorize(Roles = "Manager")]
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

    [Authorize(Roles = "Manager")]
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

    [Authorize(Roles = "Manager")]
    [HttpGet("GetProjectFromFlowId/{flowId}")]
    public IActionResult GetProjectFromFlowId(int flowId)
    {
        try
        {
            ProjectDTO projectFromFlow = _flowManager.GetProjectFromFlow(flowId);

            if (projectFromFlow == null)
            {
                return NotFound("No answers with questions found.");
            }

            return Ok(projectFromFlow);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    public IActionResult Index(int projectId)
    {
        Project project = _projectManager.GetProjectWithThemes(projectId);
        return View("~/Views/BackOffice/ResultsView.cshtml", project);
    }
}