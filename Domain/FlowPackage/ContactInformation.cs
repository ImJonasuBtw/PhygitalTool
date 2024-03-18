using System.ComponentModel.DataAnnotations;

namespace Domain.FlowPackage;

public class ContactInformation
{
    public int ContactInformationId;
    public string Email;
    public string Name;

    
    //nav
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
}