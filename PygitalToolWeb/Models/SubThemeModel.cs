using System.ComponentModel.DataAnnotations;

namespace PhygitalTool.Web.Models;

public class SubThemeModel
{
    [Required(ErrorMessage = "SubTheme Name is required")]
    public string SubThemeName { get; set; }
    [Required(ErrorMessage = "Information is required")]
    public string SubThemeInformation { get; set; }
    [Required(ErrorMessage = "MainThemeId is required")]
    public int MainThemeId { get; set; }
}