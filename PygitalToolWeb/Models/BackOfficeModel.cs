using System.ComponentModel.DataAnnotations;

namespace PhygitalTool.Web.Models;

public class BackOfficeModel
{
    [Key] public int BackOfficeId { get; set; }

    [Required(ErrorMessage = "BackOffice Name is required")]
    public string Name { get; set; }

    [Required(ErrorMessage = "AdminPlatformId is required")]
    public int AdminPlatformId { get; set; }
}