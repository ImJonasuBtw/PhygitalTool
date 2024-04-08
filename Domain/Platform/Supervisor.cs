namespace PhygitalTool.Domain.Platform;

public class Supervisor : ISystemUser
{
    // Prop
    public int SupervisorId { get; set; }
    public string Username { get; set; }
    public string Password { get; set; }
    public string Email { get; set; }
}