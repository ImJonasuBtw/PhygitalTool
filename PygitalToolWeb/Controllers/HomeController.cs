using Microsoft.AspNetCore.Mvc;

namespace PhygitalTool.Web.Controllers;

public class HomeController : Controller
{
    // Returns the index page
    public IActionResult Index()
    {
        return View();
    }
}