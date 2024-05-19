using System.ComponentModel.DataAnnotations;

namespace PhygitalTool.Web.Models;

public class ThemeModel
{
    [Required(ErrorMessage = "theme Name is required")]
    [StringLength(25, ErrorMessage = "Name cannot exceed 25 characters.")]
    public string ThemeName { get; set; }
    [Required(ErrorMessage = "Information is required")]
    [StringLength(150, ErrorMessage = "MainThemeInformation cannot exceed 150 characters.")]
    public string MainThemeInformation { get; set; }
    [Required(ErrorMessage = "ProjectId is required")]
    public int ProjectId { get; set; }
}