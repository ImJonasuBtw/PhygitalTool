using System.ComponentModel.DataAnnotations;
using PhygitalTool.Domain.Projects;

namespace PhygitalTool.Domain.FlowPackage;

public class FlowSubTheme
{
    [Key]
    public Flow Flow { get; set; }
    [Key]
    public SubTheme SubTheme { get; set; }
}