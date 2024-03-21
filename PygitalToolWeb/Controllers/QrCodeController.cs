using Microsoft.AspNetCore.Mvc;
using QRCoder;

namespace PhygitalTool.Web.Controllers;

public class QrCodeController : Controller
{
    [HttpGet] // Change to Get if you want to call it directly from an <img> tag
    public IActionResult Generate(string data)
    {
        using (QRCodeGenerator qrGenerator = new QRCodeGenerator())
        {
            QRCodeData qrCodeData = qrGenerator.CreateQrCode(data, QRCodeGenerator.ECCLevel.Q);
            using (BitmapByteQRCode qrCode = new BitmapByteQRCode(qrCodeData))
            {
                byte[] qrCodeImage = qrCode.GetGraphic(20);
                // Return the image file
                return File(qrCodeImage, "image/png");
            }
        }
    }
}

