
using Microsoft.AspNetCore.Mvc;

namespace PygitalToolWeb.Controllers;

public class QuestionController : Controller
{
    private readonly ILogger<QuestionController> _logger;

    public QuestionController(ILogger<QuestionController> logger)
    {
        _logger = logger;
    }

    public IActionResult SingleChoice()
    {
        
        return View();
        
    }
}