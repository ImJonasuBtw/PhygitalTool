using Domain.Domain.Flow;
using Domain.Flow;

namespace DAL;

public interface IRepositoryPersistance
{
    void CreateUserInput(UserInput userInput);
    void CreateAnswer(Answer answer);
}