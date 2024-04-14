using PhygitalTool.Domain.FlowPackage;
using PhygitalTool.Domain.Util;

namespace PhygitalTool.BL;

public interface IFlowManager
{
    // Returns a question based on its id
    Question GetQuestion(int id);

    // Returns a question based on its id, but includes its answer possibilities
    Question GetQuestionWithAnswerPossibilities(int id);

    // Creates a new UserInput and returns it
    UserInput AddUserInput( int flowId, int answerId);

    // Returns all userInputs
    IEnumerable<UserInput> GetAllUserInputs();

    // Creates a new answer using an answerId, answerDes and the questionId its connected to, and returns it.
    Answer AddAnswer(int answerId, string answer, int questionId);

    // Returns all Answers
    IEnumerable<Answer> GetAllAnswers();

    // Returns a flow based on its id
    Flow GetFlow(int flowId);

    // Returns a collection of question from a certain flow
    ICollection<Question> GetFlowQuestions(int flowId);

    // Returns the next question after currentQuestionId in a certain flow
    public Question GetNextQuestionInFlow(int flowId, int currentQuestionId);
    public Question GetNextQuestionInFlow(int flowId, int currentQuestionId, string answer);

    // Returns the first Question from a flow
    public Question GetFirstFlowQuestion(int flowId);

    // Saves contactinformation
    public void SaveContactInformation(ContactInformation contactInformation);

    // Returns a FlowSubTheme using its flowId and subThemeId
    public FlowSubTheme GetFlowSubTheme(int flowId, int subThemeId);

   public void SaveUserAnswer(string selectedAnswer, int currentFlow, int currentQuestion);
   
}