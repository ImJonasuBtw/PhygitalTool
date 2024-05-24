using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PhygitalTool.BL.BackOffice;
using PhygitalTool.Domain.FlowPackage;
using PhygitalTool.Domain.Util;

namespace PhygitalTool.Web.Controllers.BackOffice.api;

using Microsoft.AspNetCore.Mvc;
using PhygitalTool.BL;
using PhygitalTool.Web.Models;

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
        _projectManager.AddFlowWithQuestionsAndAnswers(flow.FlowDescription, flow.FlowName, flow.FlowType, flow.Language, flow.SubthemeId, questions);
        _unitOfWork.Commit();

        return Ok();
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
    public IActionResult GcetFlowDetails(int FlowId)
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
    public IActionResult UpdateFlow(int FlowId, [FromBody] FlowModel flowModel)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            var existingFlow = _projectManager.GetFlowWithQuestionAndAnswerPossibilities(FlowId);
            if (existingFlow == null)
            {
                return NotFound($"Flow with ID {FlowId} not found.");
            }


            existingFlow.FlowName = flowModel.FlowName;
            existingFlow.FlowDescription = flowModel.FlowDescription;
            existingFlow.FlowType = flowModel.FlowType;
            existingFlow.Language = flowModel.Language;
            

            var newQuestions =
                flowModel.Questions.Where(q => !existingFlow.Questions.Any(eq => eq.QuestionId == q.QuestionId));
            var newAnswerPossibilities = newQuestions.SelectMany(q => q.AnswerPossibilities);


            foreach (var newQuestion in newQuestions)
            {
                _unitOfWork.BeginTransaction();
                var domainQuestion = new Question()
                {
                    QuestionText = newQuestion.QuestionText,
                    QuestionType = newQuestion.QuestionType,
                    QuestionImage = newQuestion.QuestionImage,
                    FlowId = FlowId
                };
                _projectManager.AddQuestion(domainQuestion);
                existingFlow.Questions.Add(domainQuestion);
                foreach (var newAnswerPossibility in newQuestion.AnswerPossibilities)
                {
                    var domainAnswer = new AnswerPossibility()
                    {
                        Description = newAnswerPossibility.Description,
                        QuestionId = domainQuestion.QuestionId
                    };
                    _projectManager.AddAnswerPossibility(domainAnswer);
                    domainQuestion.AnswerPossibilities.Add(domainAnswer);
                }
                _unitOfWork.Commit();
            }


            // Update bestaande vragen en antwoordmogelijkheden
            foreach (var existingQuestion in existingFlow.Questions)
            {
                var updatedQuestion =
                    flowModel.Questions.FirstOrDefault(q => q.QuestionId == existingQuestion.QuestionId);
                if (updatedQuestion != null)
                {
                    _unitOfWork.BeginTransaction();
                    existingQuestion.QuestionText = updatedQuestion.QuestionText;
                    existingQuestion.QuestionImage = updatedQuestion.QuestionImage;
                    existingQuestion.QuestionType = updatedQuestion.QuestionType;
                    _projectManager.UpdateQuestion(existingQuestion);


                    foreach (var updatedAnswer in updatedQuestion.AnswerPossibilities)
                    {
                        var existingAnswer = existingQuestion.AnswerPossibilities.FirstOrDefault(a =>
                            a.AnswerPossibilityId == updatedAnswer.AnswerPossibilityId);
                        if (existingAnswer != null)
                        {
                            existingAnswer.Description = updatedAnswer.Description;
                            _projectManager.UpdateAnswerPossibility(existingAnswer);
                        }
                        else
                        {
                            var domainAnswer = new AnswerPossibility()
                            {
                                Description = updatedAnswer.Description,
                                QuestionId = existingQuestion.QuestionId
                            };
                            _projectManager.AddAnswerPossibility(domainAnswer);
                            existingQuestion.AnswerPossibilities.Add(domainAnswer);
                        }
                    }
                    _unitOfWork.Commit();
                }
            }

            _projectManager.UpdateFlow(existingFlow);

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