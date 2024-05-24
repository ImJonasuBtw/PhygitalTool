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
    public IActionResult PostIdea([FromBody] Idea idea)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var domainIdea = new Idea()
        {
            Title = idea.Title,
            Description = idea.Description,
            UserId = idea.UserId
        };
        _unitOfWork.BeginTransaction();
        _userManager.AddIdeas(domainIdea);
        _unitOfWork.Commit();
        return Ok();
    }

    [HttpPost("Like/{ideaId}")]
    public IActionResult LikeIdea(int ideaId)
    {
        try
        {
            var idea = _userManager.GetIdea(ideaId);
            if (idea == null)
            {
                return NotFound();
            }

            idea.Likes++;
            _unitOfWork.BeginTransaction();
            _userManager.UpdateLikeIdea(idea);
            _unitOfWork.Commit();
            return Ok(new { likes = idea.Likes });
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
}