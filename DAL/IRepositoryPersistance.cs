using PhygitalTool.Domain.FlowPackage;

namespace PhygitalTool.DAL;

public interface IRepositoryPersistance
{
    void CreateUserInput(UserInput userInput);
    void CreateAnswer(Answer answer);

    void SaveContactInformation(ContactInformation contactInformation);
}