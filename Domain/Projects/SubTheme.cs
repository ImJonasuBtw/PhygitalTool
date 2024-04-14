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