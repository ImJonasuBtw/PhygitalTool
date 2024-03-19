using Domain.Domain.Flow;
using Domain.FlowPackage;

namespace DAL;

public interface IRepositoryPersistance
{
    void CreateUserInput(UserInput userInput);
    void CreateAnswer(Answer answer);

    void SaveContactInformation(ContactInformation contactInformation);
}