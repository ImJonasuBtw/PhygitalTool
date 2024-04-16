using System.ComponentModel.DataAnnotations;
using PhygitalTool.Domain.FlowPackage;
using PhygitalTool.Domain.Util;

namespace PhygitalTool.Web.Models;

public class FlowModel
{
     public int FlowId { get; set; }
    [Required(ErrorMessage = "FLow Name is required")]
    public string FlowName { get; set; }
    [Required(ErrorMessage = "Description is required")]
    public string FlowDescription { get; set; }
    [Required(ErrorMessage = "FlowType is required")]
    public FlowType FlowType { get; set; }
    public Language Language{ get; set; }
    [Required(ErrorMessage = "SubthemeId is required")]
    public int SubthemeId { get; set; }
    public ICollection<Question> Questions { get; set; } 
}