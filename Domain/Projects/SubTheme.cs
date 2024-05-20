using System.ComponentModel.DataAnnotations;
using PhygitalTool.Domain.FlowPackage;

namespace PhygitalTool.Domain.Projects;

public class SubTheme
{
    // Prop
    public int SubThemeId { get; set; }
    [Required(ErrorMessage = "SubTheme Name is required")]
    [StringLength(25, ErrorMessage = "Name cannot exceed 25 characters.")]
    public string SubThemeName { get; set; }
    [Required(ErrorMessage = "Information is required")]
    [StringLength(500, ErrorMessage = "MainThemeInformation cannot exceed 500 characters.")]
    public string SubThemeInformation { get; set; }

    // Nav
    public ICollection<Flow> Flows { get; set; } = new List<Flow>();
    public MainTheme MainTheme { get; set; }
    public int MainThemeId { get; set; }

    public SubTheme()
    {
    }

    public SubTheme( string subThemeName, string subThemeInformation)
    {
        SubThemeName = subThemeName;
        SubThemeInformation = subThemeInformation;
    }
    public SubTheme( string subThemeName, string subThemeInformation, int mainThemeId)
    {
        SubThemeName = subThemeName;
        SubThemeInformation = subThemeInformation;
        MainThemeId = mainThemeId;
    }
}