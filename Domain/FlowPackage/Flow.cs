using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using PhygitalTool.Domain.Platform;
using PhygitalTool.Domain.Projects;
using PhygitalTool.Domain.Util;

namespace PhygitalTool.Domain.FlowPackage;

public class Flow
{
    // Prop
    [Key]
    public int FlowId { get; set; }
    [Required(ErrorMessage = "FLow Name is required")]
    [StringLength(25, ErrorMessage = "Name cannot exceed 25 characters.")]
    public string FlowName { get; set; }
    [Required(ErrorMessage = "Description is required")]
    [StringLength(150, ErrorMessage = "FlowDescription cannot exceed 150 characters.")]
    public string FlowDescription { get; set; }
    [Required(ErrorMessage = "FlowType is required")]
    public FlowType FlowType { get; set; }
    [Required(ErrorMessage = "Language is required")]
    public Language Language { get; set; }
    // Nav
    public SubTheme SubTheme { get; set; }
    public ICollection<Question> Questions { get; set; } = new List<Question>();
    public ICollection<ContactInformation> ContactInformations { get; set; } = new List<ContactInformation>();
    
   //Foreign key
    public int SubThemeId { get; set; }
    
    public string SupervisorId { get; set; }
    
    public Supervisor Supervisor { get; set; }

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