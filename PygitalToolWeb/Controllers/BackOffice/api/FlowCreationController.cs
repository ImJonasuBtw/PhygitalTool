using Microsoft.AspNetCore.Authorization;
using PhygitalTool.BL.BackOffice;
using PhygitalTool.Domain.FlowPackage;


namespace PhygitalTool.Web.Controllers.BackOffice.api;

using Microsoft.AspNetCore.Mvc;
using BL;
using Models;

[ApiController]
[Route("api/[controller]")]
public class FlowCreationController : ControllerBase
{
    private readonly IProjectManager _projectManager;
    private readonly UnitOfWork _unitOfWork;

    public FlowCreationController(IProjectManager projectManager, UnitOfWork unitOfWork)
    {
        _projectManager = projectManager;
        _unitOfWork = unitOfWork;
    }

    [Authorize(Roles = "Manager")]
    [HttpPost("AddFlowToSubtheme")]
    public IActionResult AddFlowToSubtheme(FlowModel flow)
    {
        if (!ModelState.IsValid)
        {
            var errors = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage));
            return BadRequest(errors);
        }

        var questions = flow.Questions.Select(q => (q.QuestionText, q.QuestionType, q.QuestionImage, q.AnswerPossibilities.Select(a => a.Description).ToList())).ToList();

        _unitOfWork.BeginTransaction();
        _projectManager.AddFlowWithQuestionsAndAnswers(flow.FlowDescription, flow.FlowName,flow.FlowImage ,flow.FlowType, flow.Language, flow.SubthemeId, questions);
        _unitOfWork.Commit();

        return NoContent();
    }

    [Authorize(Roles = "Manager")]
    [HttpDelete("DeleteFlow/{FlowId}")]
    public IActionResult DeleteFlow(int flowId)
    {
        try
        {
            _unitOfWork.BeginTransaction();
            _projectManager.DeleteFlow(flowId);
            _unitOfWork.Commit();
            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest($"Error deleting flow: {ex.Message}");
        }
    }

    [Authorize(Roles = "Manager")]
    [HttpGet("GetFlowDetails/{FlowId}")]
    public IActionResult GetFlowDetails(int FlowId)
    {
        try
        {
            var flow = _projectManager.GetFlowWithQuestionAndAnswerPossibilities(FlowId);
            if (flow == null)
            {
                return NotFound($"Flow with ID {FlowId} not found.");
            }


            var questions = flow.Questions.Select(q => new QuestionModel
            {
                QuestionId = q.QuestionId,
                QuestionText = q.QuestionText,
                QuestionType = q.QuestionType,
                QuestionImage = q.QuestionImage,

                AnswerPossibilities = q.AnswerPossibilities.Select(ap => new AnswerPossibilityModel
                {
                    Description = ap.Description,
                    AnswerPossibilityId = ap.AnswerPossibilityId,
                    QuestionId = ap.QuestionId
                }).ToList()
            }).ToList();


            var model = new FlowModel()
            {
                FlowId = FlowId,
                FlowDescription = flow.FlowDescription,
                FlowName = flow.FlowName,
                FlowImage = flow.FlowImage,
                FlowType = flow.FlowType,
                Language = flow.Language,
                SubthemeId = flow.SubThemeId,
                Questions = questions
            };

            return Ok(model);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    
    [Authorize(Roles = "Manager")]
    [HttpPut("UpdateFlow/{FlowId}")]
    public IActionResult UpdateFlow(int FlowId,  FlowModel flowModel)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            var questions = flowModel.Questions.Select(q => new Question
            {
                QuestionId = q.QuestionId,
                QuestionText = q.QuestionText,
                QuestionType = q.QuestionType,
                QuestionImage = q.QuestionImage,
                AnswerPossibilities = q.AnswerPossibilities.Select(a => new AnswerPossibility
                {
                    AnswerPossibilityId = a.AnswerPossibilityId,
                    Description = a.Description,
                    QuestionId = a.QuestionId
                }).ToList()
            }).ToList();
        
            _unitOfWork.BeginTransaction();
            _projectManager.UpdateFlowWithQuestionsAndAnswers(
                flowId: FlowId,
                flowName: flowModel.FlowName,
                flowImage: flowModel.FlowImage,
                flowDescription: flowModel.FlowDescription,
                flowType: flowModel.FlowType,
                language: flowModel.Language,
                questions: questions
            );
            _unitOfWork.Commit();

            return Ok();
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
    

    [Authorize(Roles = "Manager")]
    [HttpDelete("DeleteQuestion/{QuestionId}")]
    public IActionResult DeleteQuestion(int questionId)
    {
        try
        {
            _unitOfWork.BeginTransaction();
            _projectManager.DeleteQuestion(questionId);
            _unitOfWork.Commit();
            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest($"Error deleting Question: {ex.Message}");
        }
    }

    [HttpDelete("DeleteAnswerPossibility/{AnswerPossibility}")]
    public IActionResult DeleteAnswerPossibility(int AnswerPossibility)
    {
        try
        {
            _unitOfWork.BeginTransaction();
            _projectManager.DeleteAnswerPossibility(AnswerPossibility);
            _unitOfWork.Commit();
            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest($"Error deleting AnswerPossibility: {ex.Message}");
        }
    }
}