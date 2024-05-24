using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PhygitalTool.BL;
using PhygitalTool.BL.Users;
using PhygitalTool.Domain.FlowPackage;

namespace PhygitalTool.Web.Controllers.BackOffice.api;
[ApiController]
[Route("api/[controller]")]
public class CommentController: ControllerBase
{
    private readonly IUserManager _userManager;
    private readonly UnitOfWork _unitOfWork;

    public CommentController(IUserManager userManager, UnitOfWork unitOfWork)
    {
        _userManager = userManager;
        _unitOfWork = unitOfWork;
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
        
        _unitOfWork.BeginTransaction();
        _userManager.AddCommentToIdea(comment.IdeaId,domainComment);
        _unitOfWork.Commit();
        
        return Ok();
    }
}