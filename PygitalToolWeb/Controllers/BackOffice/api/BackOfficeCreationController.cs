using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PhygitalTool.BL.BackOffice;
using PhygitalTool.Domain.Platform;
using PhygitalTool.Domain.Util;
using PhygitalTool.Web.Models;

namespace PhygitalTool.Web.Controllers.BackOffice.api;

[ApiController]
[Route("api/[controller]")]
public class BackOfficeCreationController : Controller
{
    private readonly IBackOfficeManager _backOfficeManager;

    public BackOfficeCreationController(IBackOfficeManager backOfficeManager)
    {
        _backOfficeManager = backOfficeManager;
    }

    [Authorize(Roles = "Admin")]
    [HttpPost("AddBackOffice")]
    public IActionResult AddBackOffice([FromBody] BackOfficeModel backOffice)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            var domainBackOffice = new Domain.Platform.BackOffice
            {
                Name = backOffice.Name,
                AdminPlatformId = backOffice.AdminPlatformId
            };

            _backOfficeManager.AddBackOffice(domainBackOffice);
            return Ok();
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"internal server error: {ex.Message}");
        }
    }
    
    [Authorize(Roles = "Admin")]
    [HttpDelete("DeleteBackOffice/{backOfficeId}")]
    public IActionResult DeleteBackOffice(int backOfficeId)
    {
        try
        {
            _backOfficeManager.DeleteBackOffice(backOfficeId);
            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest($"Error deleting backoffice: {ex.Message}");
        }
    }
    
    [Authorize(Roles = "Admin")]
    [HttpGet("GetBackOfficeDetails/{backOfficeId}")]
    public IActionResult GetBackOfficeDetails(int backOfficeId)
    {
        try
        {
            var backOffice = _backOfficeManager.GetBackOffice(backOfficeId);
            if (backOffice == null)
            {
                return NotFound($"BackOffice with ID {backOfficeId} not found.");
            }

            var model = new BackOfficeModel
            {
                Name = backOffice.Name,
                AdminPlatformId = backOffice.AdminPlatformId
            };
        
            return Ok(model);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
    
    [Authorize(Roles = "Admin")]
    [HttpPut("UpdateBackOffice/{backOfficeId}")]
    public IActionResult UpdateBackOffice(int backOfficeId, [FromBody] BackOfficeModel backOfficeModel)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            var existingBackOffice = _backOfficeManager.GetBackOffice(backOfficeId);
            if (existingBackOffice == null)
            {
                return NotFound($"BackOffice with ID {backOfficeId} not found.");
            }

            existingBackOffice.Name = backOfficeModel.Name;
       
            _backOfficeManager.UpdateBackOffice(existingBackOffice);

            return Ok();
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
}