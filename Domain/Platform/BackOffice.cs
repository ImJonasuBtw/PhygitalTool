using PhygitalTool.Domain.Projects;

namespace PhygitalTool.Domain.Platform;

public class BackOffice
{
    // Prop
    public int BackOfficeId { get; set; }
    public string Name { get; set; }
    
    //Nav
    public ICollection<Manager> Managers = new List<Manager>();
    public ICollection<Project> Projects = new List<Project>();
    public ICollection<Supervisor> Supervisors = new List<Supervisor>();

    public BackOffice()
    {
    }

    public BackOffice(int backOfficeId, string name)
    {
        BackOfficeId = backOfficeId;
        Name = name;
    }
}