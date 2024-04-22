using System.ComponentModel.DataAnnotations;

namespace PhygitalTool.Domain.Projects;

public class MainTheme
{
    // Prop

    [Key]
    public int ThemeId { get; set; }
    public string ThemeName { get; set; }
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