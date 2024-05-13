using PhygitalTool.Domain.Platform;

namespace PhygitalTool.Web.Models;

public class CommentModel
{
    public int CommentId { get; set; }
    public string Description { get; set; }
    
    //nav
    public string UserId { get; set; }
    public User User { get; set; }
}