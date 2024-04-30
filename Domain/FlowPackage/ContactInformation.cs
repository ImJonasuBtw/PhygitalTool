using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PhygitalTool.Domain.FlowPackage;

public class ContactInformation
{
    // Prop
    public int ContactInformationId;

    [Required] [EmailAddress] public string Email { get; set; }

    [Required] [StringLength(100)] public string Name { get; set; }
    [Required] public DateOnly Birthdate { get; set; }

    //fk
    public int FlowId { get; set; }

    // nav
    [ForeignKey("FlowId")] public Flow Flow { get; set; }


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