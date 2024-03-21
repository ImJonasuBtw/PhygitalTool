using System.ComponentModel.DataAnnotations;
using PhygitalTool.Domain.Projects;

namespace PhygitalTool.Domain.FlowPackage;

public class FlowSubTheme
{
    // Intermediary class between Flow and SubTheme as it's got a many-to-many relation.
    [Key] public Flow Flow { get; set; }
    [Key] public SubTheme SubTheme { get; set; }
}