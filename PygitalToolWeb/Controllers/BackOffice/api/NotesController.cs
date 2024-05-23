using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PhygitalTool.BL;
using PhygitalTool.DAL;
using PhygitalTool.Domain.FlowPackage;
using PhygitalTool.Web.Models;

namespace PhygitalTool.Web.Controllers.BackOffice.api;

[ApiController]
[Route("api/[controller]")]

public class NotesController : Controller
{
    private readonly IProjectManager _projectManager;

    public NotesController(IProjectManager projectManager)
    {
        _projectManager = projectManager;
    }
    
    [HttpPost("PostNote")]
    public IActionResult PostNote([FromBody] Note note)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        } 

        var domainNote = new Note
        {
            QuestionId = note.QuestionId,
            Description = note.Description
        };
        _projectManager.AddNote(domainNote);
        return Ok();
    }
    
    [Authorize(Roles = "Manager")]
    [HttpGet("GetNotes")]
    public IActionResult GetNotes()
    {
        IEnumerable<Note> notes = _projectManager.getNotes();
        
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