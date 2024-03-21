using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using PhygitalTool.Web.Models;

namespace PhygitalTool.Web.Controllers;

public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;

    public HomeController(ILogger<HomeController> logger)
    {
        _logger = logger;
    }

    // Returns the index page
    public IActionResult Index()
    {
        return View();
    }

    // Returns the privacy page
    public IActionResult Privacy()
    {
        return View();
    }

    // Returns the error page 
    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }

    // Return the contact page
    [HttpGet]
    public IActionResult Contact()
    {
        return View();
    }
    
    // Returns to index after user fills in contact form
    [HttpPost]
    public IActionResult Contact(ContactViewModel contactVM)
    {
        if (ModelState.IsValid)
        {
            // Send an email or save the message in a table...
            // Redirect to a page that says "Thanks for contacting us!"...

            return RedirectToAction("Index");
        }

        return View();
    }
}