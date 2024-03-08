using Domain.Domain.Util;

namespace Domain.Domain.Projects;

public class Project
{
    public int ProjectId { get;  set; }
    public string Description { get;  set; }
    public string ProjectName { get;  set; }
    public DateTime CreationDate { get;  set; }
    public ProjectStatus Status { get;  set; }
}