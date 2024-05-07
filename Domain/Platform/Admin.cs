using Microsoft.AspNetCore.Identity;

namespace PhygitalTool.Domain.Platform;

public class Admin : IdentityUser
{
    // Prop
    public string ImageUrl{ get; set; }
    
    // Foreign key for BackOffice
    public int AdminPlatformId { get; set; }
    
    // Nav
    public AdminPlatform AdminPlatform;
}