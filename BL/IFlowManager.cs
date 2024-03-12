using Domain.Domain.Flow;
using Domain.Flow;

namespace BL;

public interface IFlowManager
{
    Question GetQuestion(int id);
    Question GetQuestionWithAnswerPossibilities(int id);

    UserInput AddUserInput(int userId, int flowId, int answerId);
    IEnumerable<UserInput> GetAllUserInputs();

    Answer AddAnswer(int answerId,string answer);
    IEnumerable<Answer> GetAllAnswers();
}