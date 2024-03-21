using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PhygitalTool.Domain.FlowPackage;

public class ContactInformation
{
    public int ContactInformationId;
    
    [Required]
    [EmailAddress]
    public string Email { get; set; }
    
    [Required]
    [StringLength(100)]
    public string Name { get; set; }

    public int FlowId { get; set; } 
    
    //nav
    [ForeignKey("FlowId")] 
    public Flow Flow { get;  set; }


    public ContactInformation()
    {
    }

    public ContactInformation(int contactInformationId, string email, string name)
    {
        ContactInformationId = contactInformationId;
        Email = email;
        Name = name;
    }

    public ContactInformation(Flow flow)
    {
        Flow = flow;
        FlowId = flow?.FlowId ?? 0;
    }
}