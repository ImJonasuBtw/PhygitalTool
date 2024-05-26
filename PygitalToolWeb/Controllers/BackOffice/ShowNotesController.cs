using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PhygitalTool.BL;

namespace PhygitalTool.Web.Controllers.BackOffice;

public class ShowNotesController: Controller
{
    private readonly IProjectManager _projectManager;
    // GET
    public ShowNotesController( IProjectManager projectManager)
    {
        _projectManager = projectManager;
    }
    
    public IActionResult Index(int projectId)
    {
        return View("~/Views/Supervisors/NotesResults.cshtml");
    }
}