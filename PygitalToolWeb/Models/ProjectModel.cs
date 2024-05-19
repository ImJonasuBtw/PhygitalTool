using System.ComponentModel.DataAnnotations;
using PhygitalTool.Domain.Util;

namespace PhygitalTool.Web.Models;

public class ProjectModel
{
    [Key] public int ProjectId { get; set; }

    [Required(ErrorMessage = "Description is required")]
    [StringLength(150, ErrorMessage = "Description cannot exceed 150 characters.")]
    public string Description { get; set; }

    [Required(ErrorMessage = "Project Name is required")]
    [StringLength(25, ErrorMessage = "Name cannot exceed 25 characters.")]
    public string ProjectName { get; set; }

    [Required(ErrorMessage = "Creation Date is required")]
    public DateTime CreationDate { get; set; }

    [Required(ErrorMessage = "Status is required")]
    public ProjectStatus Status { get; set; }

    [Required(ErrorMessage = "BackOfficeId is required")]
    public int BackOfficeId { get; set; }
}