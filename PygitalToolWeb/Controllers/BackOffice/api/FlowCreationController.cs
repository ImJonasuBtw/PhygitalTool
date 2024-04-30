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
   

    [HttpPost("AddFlowToSubtheme")]
    public IActionResult AddFlowToSubtheme([FromBody] FlowModel flow)
    {

        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
     
        
        var domainFlow = new Flow()
        {
            FlowDescription = flow.FlowDescription,
            FlowName = flow.FlowName,
            FlowType = flow.FlowType,
            Language = flow.Language,
            SubThemeId = flow.SubthemeId,
            
        };

        Flow  newFlow = _projectManager.AddFlow(domainFlow);
        domainFlow.FlowId = newFlow.FlowId;
        
        if (flow.Questions != null && flow.Questions.Count > 0)
        {
            foreach (var questionModel in flow.Questions)
            {
                var domainQuestion = new Question()
                {
                    QuestionText = questionModel.QuestionText,
                    QuestionType = questionModel.QuestionType,
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
            
            // Map domain questions to view model questions
            var questions = flow.Questions.Select(q => new QuestionModel
            {
                QuestionId = q.QuestionId,
                QuestionText = q.QuestionText,
                QuestionType = q.QuestionType,
                // Map AnswerPossibilities
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

        // Update algemene eigenschappen van de stroom
        existingFlow.FlowName = flowModel.FlowName;
        existingFlow.FlowDescription = flowModel.FlowDescription;
        existingFlow.FlowType = flowModel.FlowType;
        existingFlow.Language = flowModel.Language;

        // Verzamel nieuwe vragen en antwoordmogelijkheden
        var newQuestions = flowModel.Questions.Where(q => !existingFlow.Questions.Any(eq => eq.QuestionId == q.QuestionId));
        var newAnswerPossibilities = newQuestions.SelectMany(q => q.AnswerPossibilities);

        // Voeg nieuwe vragen toe aan de stroom en database
        foreach (var newQuestion in newQuestions)
        {
            var domainQuestion = new Question()
            {
                QuestionText = newQuestion.QuestionText,
                QuestionType = newQuestion.QuestionType,
                FlowId = FlowId // Gebruik de ID van de bestaande stroom
            };
            _projectManager.AddQuestion(domainQuestion);
            existingFlow.Questions.Add(domainQuestion);
            foreach (var newAnswerPossibility in newQuestion.AnswerPossibilities)
            {
                var domainAnswer = new AnswerPossibility()
                {
                    Description = newAnswerPossibility.Description,
                    QuestionId = domainQuestion.QuestionId // Gebruik de ID van de nieuwe vraag
                };
                _projectManager.AddAnswerPossibility(domainAnswer);
                domainQuestion.AnswerPossibilities.Add(domainAnswer);
            }
        }
        

        // Update bestaande vragen en antwoordmogelijkheden
        foreach (var existingQuestion in existingFlow.Questions)
        {
            var updatedQuestion = flowModel.Questions.FirstOrDefault(q => q.QuestionId == existingQuestion.QuestionId);
            if (updatedQuestion != null)
            {
                existingQuestion.QuestionText = updatedQuestion.QuestionText;
                existingQuestion.QuestionType = updatedQuestion.QuestionType;
                _projectManager.UpdateQuestion(existingQuestion);

                // Update antwoordmogelijkheden voor deze vraag
                foreach (var updatedAnswer in updatedQuestion.AnswerPossibilities)
                {
                    var existingAnswer = existingQuestion.AnswerPossibilities.FirstOrDefault(a => a.AnswerPossibilityId == updatedAnswer.AnswerPossibilityId);
                    if (existingAnswer != null)
                    {
                        existingAnswer.Description = updatedAnswer.Description;
                        _projectManager.UpdateAnswerPossibility(existingAnswer);
                    }
                    else
                    {
                        // Voeg nieuwe antwoordmogelijkheden toe aan de bestaande vraag
                        var domainAnswer = new AnswerPossibility()
                        {
                            Description = updatedAnswer.Description,
                            QuestionId = existingQuestion.QuestionId // Gebruik de ID van de bestaande vraag
                        };
                        _projectManager.AddAnswerPossibility(domainAnswer);
                        existingQuestion.AnswerPossibilities.Add(domainAnswer);
                    }
                }
            }
        }

        // Update de stroom in de database
        _projectManager.UpdateFlow(existingFlow);

        return Ok();
    }
    catch (Exception ex)
    {
        return StatusCode(500, $"Internal server error: {ex.Message}");
    }
}
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
            _projectManager.DeleteanswerPossibility(AnswerPossibility);
            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest($"Error deleting AnswerPossibility: {ex.Message}");
        }
    }
}


    
