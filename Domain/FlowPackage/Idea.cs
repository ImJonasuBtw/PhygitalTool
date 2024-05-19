using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;
using PhygitalTool.Domain.Platform;

namespace PhygitalTool.Domain.FlowPackage;

public class Idea
{
    // Prop
    [Key]
    public int IdeaId { get; set; }
    [Required(ErrorMessage = "Title is required")]
    [StringLength(50, ErrorMessage = "Title cannot exceed 50 characters.")]
    public string Title{ get; set; }
    [Required(ErrorMessage = "Description is required")]
    [StringLength(500, ErrorMessage = "Description  cannot exceed 500 characters.")]
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