namespace PhygitalTool.Domain.Platform;

public interface ISystemUser
{
    // Prop
    public string Username { get; set; }
    public string Password { get; set; }
    public string Email { get; set; }

}