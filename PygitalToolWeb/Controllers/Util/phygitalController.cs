using System.Reflection.Metadata;
using Microsoft.AspNetCore.Mvc;

namespace PhygitalTool.Web.Controllers;

public class phygitalController : Controller
{
    [HttpPost]
    public IActionResult keyBoardPressToButtonClick(string keyPress)
    {
        if (keyPress == "1")
        {
            
        }
        return Ok();
    }

}