using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
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

    public FlowCreationController(IProjectManager projectManager)
    {
        _projectManager = projectManager;
    }

    [Authorize(Roles = "Manager")]
    [HttpPost("AddFlowToSubtheme")]
    public IActionResult AddFlowToSubtheme([FromBody] FlowModel flow)
    {
        if (!ModelState.IsValid)
        {
            var errors = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage));
            return BadRequest(errors);
        }


        var domainFlow = new Flow()
        {
            FlowDescription = flow.FlowDescription,
            FlowName = flow.FlowName,
            FlowType = flow.FlowType,
            Language = flow.Language,
            SubThemeId = flow.SubthemeId,
        };

        Flow newFlow = _projectManager.AddFlow(domainFlow);
        domainFlow.FlowId = newFlow.FlowId;

        if (flow.Questions != null && flow.Questions.Count > 0)
        {
            foreach (var questionModel in flow.Questions)
            {
                var domainQuestion = new Question()
                {
                    QuestionText = questionModel.QuestionText,
                    QuestionType = questionModel.QuestionType,
                    QuestionImage = questionModel.QuestionImage,
                    FlowId = newFlow.FlowId,
                };
                Question newQuestion = _projectManager.AddQuestion(domainQuestion);
                questionModel.QuestionId = newQuestion.QuestionId;
                domainQuestion.QuestionId = newQuestion.QuestionId;
                newFlow.Questions.Add(domainQuestion);


                if (questionModel.AnswerPossibilities != null && questionModel.AnswerPossibilities.Any())
                {
                    foreach (var answer in questionModel.AnswerPossibilities)
                    {
                        var domainAnswer = new AnswerPossibility()
                        {
                            Description = answer.Description,
                            QuestionId = newQuestion.QuestionId
                        };
                        _projectManager.AddAnswerPossibility(domainAnswer);
                        domainQuestion.AnswerPossibilities.Add(domainAnswer);
                    }
                }
            }
        }


        return Ok();
    }

    [Authorize(Roles = "Manager")]
    [HttpDelete("DeleteFlow/{FlowId}")]
    public IActionResult DeleteFlow(int flowId)
    {
        try
        {
            _projectManager.DeleteFlow(flowId);
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
            }


            // Update bestaande vragen en antwoordmogelijkheden
            foreach (var existingQuestion in existingFlow.Questions)
            {
                var updatedQuestion =
                    flowModel.Questions.FirstOrDefault(q => q.QuestionId == existingQuestion.QuestionId);
                if (updatedQuestion != null)
                {
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
            _projectManager.DeleteQuestion(questionId);
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
            _projectManager.DeleteAnswerPossibility(AnswerPossibility);
            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest($"Error deleting AnswerPossibility: {ex.Message}");
        }
    }
}