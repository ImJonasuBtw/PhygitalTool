using Microsoft.AspNetCore.Identity;
using PhygitalTool.Domain.FlowPackage;

namespace PhygitalTool.Domain.Platform;

public class User: IdentityUser
{
    // Prop
    public string ImageUrl{ get; set; }
    
    //nav
    public List<Idea> Ideas;
    public List<Comment> Comments;
}