using Domain.Domain.Flow;

namespace DAL;

public interface IRepositoryPersistance
{
    void CreateUserInput(UserInput userInput);
}