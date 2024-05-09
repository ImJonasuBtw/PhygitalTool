using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;
using PhygitalTool.Domain.Platform;

namespace PhygitalTool.Domain.FlowPackage;

public class Comment
{
    
    [Key]
    public int CommentId { get; set; }
    public string Description { get; set; }
    
    //nav
    public User User { get; set; }

    public Comment()
    {
    }

    public Comment( string description)
    {
        Description = description;
    }
}