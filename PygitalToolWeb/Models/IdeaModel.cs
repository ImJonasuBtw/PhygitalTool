using PhygitalTool.Domain.FlowPackage;
using PhygitalTool.Domain.Platform;

namespace PhygitalTool.Web.Models;

public class IdeaModel
{
    public int IdeaId { get; set; }
    public string Title{ get; set; }
    public string Description { get; set; }
    public int Likes { get; set; }
    
    //nav
    public string UserId { get; set; }
    public User User { get; set; }
    public List<Comment> Comments { get; set; }
}