using Domain.Domain.Flow;
using Domain.Flow;

namespace DAL;

public interface IRepositoryRetrieval
{
    Question ReadQuestionWithAnswerPossibilities(int id);

    IEnumerable<UserInput> ReadAllUserInputs();
}