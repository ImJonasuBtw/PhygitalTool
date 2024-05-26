using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PhygitalTool.BL;
using PhygitalTool.BL.Users;
using PhygitalTool.Domain.FlowPackage;

namespace PhygitalTool.Web.Controllers.BackOffice.api;

[ApiController]
[Route("api/[controller]")]
public class IdeasController : ControllerBase
{
    private readonly IUserManager _userManager;
    private readonly UnitOfWork _unitOfWork;

    public IdeasController(IUserManager userManager, UnitOfWork unitOfWork)
    {
        _userManager = userManager;
        _unitOfWork = unitOfWork;
    }

    // POST: api/Ideas
    [HttpPost]
    public IActionResult PostIdea(Idea idea)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        
        _unitOfWork.BeginTransaction();
        _userManager.AddIdeas(idea.Title, idea.Description, idea.UserId);
        _unitOfWork.Commit();
        
        return Ok();
    }

    [HttpPost("Like/{ideaId}")]
    public IActionResult LikeIdea(int ideaId)
    {
        try
        {
            _unitOfWork.BeginTransaction();
            var likesAmount =_userManager.UpdateLikeIdea(ideaId);
            _unitOfWork.Commit();
            return Ok(new { likes = likesAmount });
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
}