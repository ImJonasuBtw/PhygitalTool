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
                        domainQuestion.AnswerPossibilities.Add(domainAnswer);
                        _projectManager.AddAnswerPossibility(domainAnswer);
                    }
                }
            }
            
        }
        
       
        return Ok();
        
    }
}
    
    
