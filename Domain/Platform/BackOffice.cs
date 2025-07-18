using System.ComponentModel.DataAnnotations;
using PhygitalTool.Domain.Projects;

namespace PhygitalTool.Domain.Platform;

public class BackOffice
{
    [Key]
    // Prop
    public int BackOfficeId { get; set; }
    [Required(ErrorMessage = "BackOffice Name is required")]
    [StringLength(25, ErrorMessage = "Name cannot exceed 25 characters.")]
    public string Name { get; set; }

    // Foreign key property for AdminPlatform
    public int AdminPlatformId { get; set; } 
    
    //Nav
    public AdminPlatform AdminPlatform { get; set; }
    public ICollection<Manager> Managers = new List<Manager>();
    public ICollection<Project> Projects = new List<Project>();
    public ICollection<Supervisor> Supervisors = new List<Supervisor>();

    public BackOffice()
    {
    }

    public BackOffice( string name, int adminPlatformId)
    {
        Name = name;
        AdminPlatformId = adminPlatformId;
    }
}