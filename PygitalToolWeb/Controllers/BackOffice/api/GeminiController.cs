using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Configuration;

namespace PhygitalTool.Web.Controllers.BackOffice.api;

[ApiController]
[Route("api/[controller]")]
public class GeminiController : ControllerBase
{
    private readonly string _apiKey;

    public GeminiController(IConfiguration configuration)
    {
        _apiKey = configuration["Keys:gemini_api_key"];
    }

    [HttpGet("gemini-api-key")]
    [Authorize]
    public IActionResult GetGeminiApiKey()
    {
        return Ok(new { apiKey = _apiKey });
    }
}