using System.ComponentModel.DataAnnotations.Schema;
using Domain.FlowPackage;

namespace Domain.Projects;

public class SubTheme
{
    public int SubThemeId { get;  set; }
    public string SubThemeName { get;  set; }
    public string SubThemeInformation { get;  set; }

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