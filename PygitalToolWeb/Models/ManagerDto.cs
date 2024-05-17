using System.ComponentModel.DataAnnotations;

namespace PhygitalTool.Web.Models;

public class ManagerDto
{    [Required(ErrorMessage = "Email is required")]
    public string Email { get; set; }
    [Required(ErrorMessage = "Password is required")]
    public string Password { get; set; }
    [Required(ErrorMessage = "ImageURL is required")]
    public string ImageUrl { get; set; }
    public int BackOfficeId{ get; set; }
}