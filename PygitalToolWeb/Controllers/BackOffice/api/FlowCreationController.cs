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
            SubThemeId = flow.SubthemeId
            
        };
        
        if (flow.Questions != null && flow.Questions.Count > 0)
        {
            foreach (var question in flow.Questions)
            {
                var domainQuestion = new Question()
                {
                    QuestionText = question.QuestionText,
                    QuestionType = question.QuestionType,

                };
                if (question.AnswerPossibilities != null && question.AnswerPossibilities.Any())
                {
                    foreach (var answer in question.AnswerPossibilities)
                    {
                        var domainAnswer = new AnswerPossibility()
                        {
                            Description = answer.Description
                        };
                        domainQuestion.AnswerPossibilities.Add(domainAnswer);
                        _projectManager.AddAnswerPossibility(domainAnswer);
                    }
                }

                domainFlow.Questions.Add(domainQuestion);
                _projectManager.AddQuestion(domainQuestion);
            }
            
        }
        
        _projectManager.AddFlow(domainFlow);
        return Ok();
        
    }
}
    
    
