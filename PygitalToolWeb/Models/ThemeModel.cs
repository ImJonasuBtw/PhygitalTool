using System.ComponentModel.DataAnnotations;

namespace PhygitalTool.Web.Models;

public class ThemeModel
{
    [Required(ErrorMessage = "theme Name is required")]
    public string ThemeName { get; set; }
    [Required(ErrorMessage = "Information is required")]
    public string MainThemeInformation { get; set; }
    [Required(ErrorMessage = "ProjectId is required")]
    public int ProjectId { get; set; }
}