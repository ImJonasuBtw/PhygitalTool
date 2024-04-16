using PhygitalTool.Domain.FlowPackage;

namespace PhygitalTool.Domain.Projects;

public class SubTheme
{
    // Prop
    public int SubThemeId { get; set; }
    public string SubThemeName { get; set; }
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