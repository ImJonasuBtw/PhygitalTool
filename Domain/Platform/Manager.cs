using System.Security.Principal;
using Microsoft.AspNetCore.Identity;

namespace PhygitalTool.Domain.Platform;

public class Manager : IdentityUser
{
    // Prop
    public string ImageUrl{ get; set; }
    
    // Foreign key for BackOffice
    public int BackOfficeId { get; set; }
    
    //nav
    public BackOffice BackOffice;
}