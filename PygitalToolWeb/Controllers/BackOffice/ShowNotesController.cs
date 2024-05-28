using Microsoft.AspNetCore.Mvc;


namespace PhygitalTool.Web.Controllers.BackOffice;

public class ShowNotesController : Controller
{
    public IActionResult Index()
    {
        return View("~/Views/Supervisors/NotesResults.cshtml");
    }
}