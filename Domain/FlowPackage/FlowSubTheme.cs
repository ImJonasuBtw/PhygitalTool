using System.ComponentModel.DataAnnotations;
using Domain.Projects;

namespace Domain.FlowPackage;

public class FlowSubTheme
{
    [Key]
    public Flow Flow { get; set; }
    [Key]
    public SubTheme SubTheme { get; set; }
}