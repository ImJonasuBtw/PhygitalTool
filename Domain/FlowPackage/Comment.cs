using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;
using PhygitalTool.Domain.Platform;

namespace PhygitalTool.Domain.FlowPackage;

public class Comment
{
    
    [Key]
    public int CommentId { get; set; }
    [Required(ErrorMessage = "Description is required")]
    [StringLength(500, ErrorMessage = "Description  cannot exceed 500 characters.")]
    public string Description { get; set; }
    
    //nav
    public string UserId { get; set; }
    public int IdeaId { get; set; }
    public User User { get; set; }
    public Idea Idea{ get; set; }

    public Comment()
    {
    }

    public Comment( string description)
    {
        Description = description;
    }
}