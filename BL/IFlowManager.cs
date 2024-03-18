using Domain.Domain.Flow;
using Domain.FlowPackage;

namespace BL;

public interface IFlowManager
{
    Question GetQuestion(int id);
    Question GetQuestionWithAnswerPossibilities(int id);

    UserInput AddUserInput(int userId, int flowId, int answerId);
    IEnumerable<UserInput> GetAllUserInputs();

    Answer AddAnswer(int answerId, string answer,int Questionid);
    IEnumerable<Answer> GetAllAnswers();
    Flow GetFlow(int flowId);
    ICollection<Question> GetFlowQuestions(int flowId);
    public Question GetNextQuestionInFlow(int flowId, int currentQuestionId);
    public Question GetFirstFlowQuestion(int flowId);
}