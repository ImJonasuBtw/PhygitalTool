using Microsoft.AspNetCore.Mvc;
using QRCoder;

namespace PhygitalTool.Web.Controllers;

public class QrCodeController : Controller
{
    // Generates a QR code for the given link.
    [HttpGet] 
    public IActionResult Generate(string data)
    {
        using (QRCodeGenerator qrGenerator = new QRCodeGenerator())
        {
            QRCodeData qrCodeData = qrGenerator.CreateQrCode(data, QRCodeGenerator.ECCLevel.Q);
            using (BitmapByteQRCode qrCode = new BitmapByteQRCode(qrCodeData))
            {
                byte[] qrCodeImage = qrCode.GetGraphic(20);
               
                return File(qrCodeImage, "image/png");
            }
        }
    }
}

