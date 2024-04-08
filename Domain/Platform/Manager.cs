using System.Security.Principal;

namespace PhygitalTool.Domain.Platform;

public class Manager : ISystemUser
{
    // Prop
    public int ManagerId { get; set; }
    public string Username { get; set; }
    public string Password { get; set; }
    public string Email { get; set; }
    
    // Foreign key for BackOffice
    public int BackOfficeId { get; set; }
    //nav
    public BackOffice BackOffice;
    


    public Manager(int managerId, string username, string password, string email)
    {
        ManagerId = managerId;
        Username = username;
        Password = password;
        Email = email;
    }
}