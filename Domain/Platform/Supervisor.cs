using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace PhygitalTool.Domain.Platform;

public class Supervisor : IdentityUser
{
    [Required(ErrorMessage = "ImageURL is required")]
    //prop
    public string ImageUrl{ get; set; }
    
    // Foreign key for BackOffice
    public int BackOfficeId { get; set; }
    
    //nav
    public BackOffice BackOffice;
}