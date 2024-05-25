using Microsoft.AspNetCore.Mvc;
using PhygitalTool.Web.Services;

namespace PhygitalTool.Web.Controllers.BackOffice.api;

[ApiController]
[Route("/api/files")]
public class FilesController : ControllerBase
{
    private readonly CloudStorageService _cloudStorageService;

    public FilesController(CloudStorageService cloudStorageService)
    {
        _cloudStorageService = cloudStorageService;
    }

    [HttpPost("uploadFile")]
    public ActionResult UploadFile(IFormFile file)
    {
        using var memoryStream = new MemoryStream();
        file.CopyTo(memoryStream);
        var url = _cloudStorageService.UploadFileToBucket(memoryStream, file.ContentType);
        return Ok(new { url });
    }
    

}