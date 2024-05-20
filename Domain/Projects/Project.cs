using System.ComponentModel.DataAnnotations;
using PhygitalTool.Domain.Platform;
using PhygitalTool.Domain.Util;

namespace PhygitalTool.Domain.Projects;

public class Project
{
    // Prop
    [Key]
    public int ProjectId { get; set; }
    [Required(ErrorMessage = "Description required.")]
    [StringLength(150, ErrorMessage = "Description cannot exceed 150 characters.")]
    public string Description { get; set; }
    
    [Required(ErrorMessage = "Name is required.")]
    [StringLength(25, ErrorMessage = "Name cannot exceed 25 characters.")]
    public string ProjectName { get; set; }
    [Required(ErrorMessage = "CreationDate is required.")]
    public DateTime CreationDate { get; set; }
    [Required(ErrorMessage = "Status is required.")]
    public ProjectStatus Status { get; set; }

    // Foreign key property for BackOffice
    public int BackOfficeId { get; set; } 
    
    //nav
    public BackOffice BackOffice { get; set; }
    public ICollection<MainTheme> MainThemes { get; set; } = new List<MainTheme>();

    public Project()
    {
    }

    public Project(int projectId, string description, string projectName, DateTime creationDate, ProjectStatus status)
    {
        ProjectId = projectId;
        Description = description;
        ProjectName = projectName;
        CreationDate = creationDate;
        Status = status;
    }
}