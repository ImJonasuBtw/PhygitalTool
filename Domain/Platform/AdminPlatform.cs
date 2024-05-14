namespace PhygitalTool.Domain.Platform;

public class AdminPlatform
{
    // Prop
    public int AdminPlatformId { get; set; }

    // Nav
    public ICollection<Admin> Admins = new List<Admin>();
    public ICollection<BackOffice> BackOffices = new List<BackOffice>();

    public AdminPlatform()
    {
    }

    public AdminPlatform(int adminPlatformId)
    {
        AdminPlatformId = adminPlatformId;
    } 
}