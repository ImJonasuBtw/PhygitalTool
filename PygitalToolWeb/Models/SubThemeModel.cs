using System.ComponentModel.DataAnnotations;

namespace PhygitalTool.Web.Models;

public class SubThemeModel
{
    [Required(ErrorMessage = "SubTheme Name is required")]
    [StringLength(25, ErrorMessage = "Name cannot exceed 25 characters.")]
    public string SubThemeName { get; set; }
    [Required(ErrorMessage = "Information is required")]
    [StringLength(500, ErrorMessage = "MainThemeInformation cannot exceed 500 characters.")]
    public string SubThemeInformation { get; set; }
    [Required(ErrorMessage = "MainThemeId is required")]
    public int MainThemeId { get; set; }
}