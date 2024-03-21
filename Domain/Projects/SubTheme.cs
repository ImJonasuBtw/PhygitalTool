using PhygitalTool.Domain.FlowPackage;

namespace PhygitalTool.Domain.Projects;

public class SubTheme
{
    // Prop
    public int SubThemeId { get; set; }
    public string SubThemeName { get; set; }
    public string SubThemeInformation { get; set; }

    // Nav
    public ICollection<FlowSubTheme> FlowSubThemes { get; set; } = new List<FlowSubTheme>();

    public SubTheme()
    {
    }

    public SubTheme(int subThemeId, string subThemeName, string subThemeInformation)
    {
        SubThemeId = subThemeId;
        SubThemeName = subThemeName;
        SubThemeInformation = subThemeInformation;
    }
}