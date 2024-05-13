using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;
using PhygitalTool.Domain.Platform;

namespace PhygitalTool.Domain.FlowPackage;

public class Idea
{
    // Prop
    [Key]
    public int IdeaId { get; set; }
    public string Title{ get; set; }
    public string Description { get; set; }
    public int Likes { get; set; }
    
    //nav
    public string UserId { get; set; }
    public User User { get; set; }
    public List<Comment> Comments { get; set; } = new List<Comment>();

    public Idea(string title, string description, int likes)
    {
        Title = title;
        Description = description;
        Likes = likes;
    }

    public Idea()
    {
    }
}