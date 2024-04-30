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

}