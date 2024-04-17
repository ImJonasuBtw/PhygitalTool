using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using PhygitalTool.Domain.Projects;
using PhygitalTool.Domain.Util;

namespace PhygitalTool.Domain.FlowPackage;

public class Flow
{
    // Prop
    [Key]
    
    public int FlowId { get; set; }
    public string FlowName { get; set; }

    public string FlowDescription { get; set; }
    public FlowType FlowType { get; set; }
    public Language Language { get; set; }
    public int SubthemeId { get; set; }

    // Nav
    public SubTheme SubTheme { get; set; }
    public ICollection<Question> Questions { get; set; } = new List<Question>();
    public ICollection<ContactInformation> ContactInformations { get; set; } = new List<ContactInformation>();

    public Flow()
    {
    }

    public Flow(string flowName, FlowType flowType, Language language, string flowDescription)
    {
        FlowName = flowName;
        FlowType = flowType;
        Language = language;
        FlowDescription = flowDescription;
    }
}