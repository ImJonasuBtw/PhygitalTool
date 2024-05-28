using System.ComponentModel.DataAnnotations;
using PhygitalTool.Domain.FlowPackage;
using PhygitalTool.Domain.Util;

namespace PhygitalTool.Web.Models;

public class FlowModel
{
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

    [Required(ErrorMessage = "SubthemeId is required")]
    public int SubthemeId { get; set; }

    public ICollection<QuestionModel> Questions { get; set; }
    
    [Required(ErrorMessage = "FlowImage is required")]
    public string FlowImage { get; set; }
}