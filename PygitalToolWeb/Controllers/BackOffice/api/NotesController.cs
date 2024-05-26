using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PhygitalTool.BL;
using PhygitalTool.BL.BackOffice;
using PhygitalTool.DAL;
using PhygitalTool.Domain.FlowPackage;
using PhygitalTool.Web.Models;

namespace PhygitalTool.Web.Controllers.BackOffice.api;

[ApiController]
[Route("api/[controller]")]

public class NotesController : Controller
{
    private readonly IProjectManager _projectManager;
    private readonly UnitOfWork _unitOfWork;

    public NotesController(IProjectManager projectManager, UnitOfWork unitOfWork)
    {
        _projectManager = projectManager;
        _unitOfWork = unitOfWork;
    }
    
    [HttpPost("PostNote")]
    public IActionResult PostNote(Note note)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        } 
        
        _unitOfWork.BeginTransaction();
        _projectManager.AddNote(note.QuestionId, note.Description);
        _unitOfWork.Commit();
        
        return Ok();
    }
    
    [Authorize(Roles = "Manager,Supervisor")]
    [HttpGet("GetNotes")]
    public IActionResult GetNotes()
    {
        var notes = _projectManager.GetNotes();
        
        if (!notes.Any())
        {
            return NoContent();
        }
        return Ok(notes);
    }
    public IActionResult Index()
    {
        return View("~/Views/Supervisors/NotesView.cshtml");
    }
}