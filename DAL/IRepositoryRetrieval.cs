using Domain.Domain.Flow;
using Domain.Flow;

namespace DAL;

public interface IRepositoryRetrieval
{
    Question ReadQuestion(int id);
    Question ReadQuestionWithAnswerPossibilities(int id);

    IEnumerable<UserInput> ReadAllUserInputs();
    IEnumerable<Answer> ReadAllAnswers();
}