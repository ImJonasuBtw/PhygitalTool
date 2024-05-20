using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PhygitalTool.Domain.FlowPackage;

public class ContactInformation
{
    // Prop
    public int ContactInformationId;

    [Required(ErrorMessage = "Email is required")] 
    [EmailAddress(ErrorMessage = "Invalid Email Address")] 
    public string Email { get; set; }

    [Required(ErrorMessage = "Name is required")]
    [StringLength(100, ErrorMessage = "Name cannot be longer than 100 characters")] 
    public string Name { get; set; }
    [Required(ErrorMessage = "Birthdate is required")] 
    public DateOnly Birthdate { get; set; }

    //fk
    public int FlowId { get; set; }

    // nav
    [ForeignKey("FlowId")] 
    public Flow Flow { get; set; }


    public ContactInformation()
    {
    }

    public ContactInformation(int contactInformationId, string email, string name, DateOnly birthdate)
    {
        ContactInformationId = contactInformationId;
        Email = email;
        Name = name;
        Birthdate = birthdate;
    }

    public ContactInformation(Flow flow)
    {
        Flow = flow;
        FlowId = flow?.FlowId ?? 0;
    }
}
