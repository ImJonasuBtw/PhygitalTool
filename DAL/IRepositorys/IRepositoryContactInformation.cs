using PhygitalTool.Domain.FlowPackage;

namespace PhygitalTool.DAL.IRepositorys;

public interface IRepositoryContactInformation
{
    void SaveContactInformation(ContactInformation contactInformation);
}