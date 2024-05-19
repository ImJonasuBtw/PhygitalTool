using System.ComponentModel.DataAnnotations;

namespace PhygitalTool.Domain.Projects;

public class MainTheme
{
    // Prop

    [Key]
    public int ThemeId { get; set; }
    [Required(ErrorMessage = "Name is required.")]
    [StringLength(25, ErrorMessage = "Name cannot exceed 25 characters.")]
    public string ThemeName { get; set; }
    [Required(ErrorMessage = "MainThemeInformation required.")]
    [StringLength(150, ErrorMessage = "MainThemeInformation cannot exceed 150 characters.")]
    public string MainThemeInformation { get; set; }
    
    //nav
    public Project Project { get; set; }
    public ICollection<SubTheme> SubThemes { get; set; } = new List<SubTheme>();
    // Foreign key
    public int ProjectId{ get; set; }


    public MainTheme()
    {
    }

    public MainTheme(string themeName, string mainThemeInformation)
    {
        ThemeName = themeName;
        MainThemeInformation = mainThemeInformation;
    }
    public MainTheme(string themeName, string mainThemeInformation, int projectId)
    {
        ThemeName = themeName;
        MainThemeInformation = mainThemeInformation;
        ProjectId = projectId;
    }
}