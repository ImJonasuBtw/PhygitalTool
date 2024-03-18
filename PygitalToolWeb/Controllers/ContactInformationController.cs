using Microsoft.AspNetCore.Mvc;

namespace PygitalToolWeb.Controllers;

public class ContactInformationController : Controller
{
    // GET
    public IActionResult Index()
    {
        return View("index");
    }
}