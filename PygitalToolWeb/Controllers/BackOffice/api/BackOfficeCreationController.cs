using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PhygitalTool.BL;
using PhygitalTool.BL.BackOffice;
using PhygitalTool.Web.Models;

namespace PhygitalTool.Web.Controllers.BackOffice.api;

[ApiController]
[Route("api/[controller]")]
public class BackOfficeCreationController : Controller
{
    private readonly IBackOfficeManager _backOfficeManager;
    private readonly UnitOfWork _unitOfWork;

    public BackOfficeCreationController(IBackOfficeManager backOfficeManager, UnitOfWork unitOfWork)
    {
        _backOfficeManager = backOfficeManager;
        _unitOfWork = unitOfWork;
    }

    [Authorize(Roles = "Admin")]
    [HttpPost("AddBackOffice")]
    public IActionResult AddBackOffice(BackOfficeModel backOffice)
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

            _unitOfWork.BeginTransaction();
            _backOfficeManager.AddBackOffice(domainBackOffice);
            _unitOfWork.Commit();

            return NoContent();
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
            _unitOfWork.BeginTransaction();
            _backOfficeManager.DeleteBackOffice(backOfficeId);
            _unitOfWork.Commit();
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
    public IActionResult UpdateBackOffice(int backOfficeId,  BackOfficeModel backOfficeModel)
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

            _unitOfWork.BeginTransaction();
            _backOfficeManager.UpdateBackOffice(existingBackOffice);
            _unitOfWork.Commit();

            return Ok();
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
}