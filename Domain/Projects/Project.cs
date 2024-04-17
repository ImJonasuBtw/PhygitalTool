using System.ComponentModel.DataAnnotations;
using PhygitalTool.Domain.Platform;
using PhygitalTool.Domain.Util;

namespace PhygitalTool.Domain.Projects;

public class Project
{
    // Prop
    [Key]
    public int ProjectId { get; set; }
    public string Description { get; set; }
    public string ProjectName { get; set; }
    public DateTime CreationDate { get; set; }
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