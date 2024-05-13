using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PhygitalTool.BL.Users;
using PhygitalTool.Domain.FlowPackage;

namespace PhygitalTool.Web.Controllers.BackOffice.api;
[ApiController]
[Route("api/[controller]")]
public class CommentController: ControllerBase
{
    private readonly IUserManager _userManager;

    public CommentController(IUserManager userManager)
    {
        _userManager = userManager;
    }

    [HttpPost]
    [Authorize]
    public IActionResult PostComment( [FromBody] Comment comment)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        var domainComment = new Comment()
        {
            Description =comment.Description,
            UserId = comment.UserId,
            IdeaId = comment.IdeaId
        };
        
        _userManager.AddCommentToIdea(comment.IdeaId,domainComment);
        return Ok();
    }
}