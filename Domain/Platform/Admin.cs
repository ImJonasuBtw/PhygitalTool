namespace PhygitalTool.Domain.Platform;

public class Admin : ISystemUser
{
    // Prop
    public int AdminId { get; set; }
    public string Username { get; set; }
    public string Password { get; set; }
    public string Email { get; set; }
}