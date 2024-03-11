using Domain.Domain.Flow;
using Domain.Flow;

namespace BL;

public interface IFlowManager
{
    Question GetQuestionWithAnswerPossibilities(int id);

    UserInput AddUserInput(int userId, int flowId, int answerId);
    IEnumerable<UserInput> GetAllUserInputs();
}