using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PhygitalTool.BL;
using PhygitalTool.BL.BackOffice;

namespace PhygitalTool.Web.Controllers.BackOffice;

public class ShowNotesController: Controller
{
    public IActionResult Index()
    {
        return View("~/Views/Supervisors/NotesResults.cshtml");
    }
}