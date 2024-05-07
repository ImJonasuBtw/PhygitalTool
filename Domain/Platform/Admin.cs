using Microsoft.AspNetCore.Identity;

namespace PhygitalTool.Domain.Platform;

public class Admin : IdentityUser
{
    // Prop
    public string ImageUrl{ get; set; }
    
    //nav
    public List<BackOffice> BackOffice;
}