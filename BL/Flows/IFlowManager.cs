using PhygitalTool.Domain.FlowPackage;
using PhygitalTool.Domain.Projects;

namespace PhygitalTool.BL.Flows;

public interface IFlowManager
{
    // Returns a question based on its id
    Question GetQuestion(int id);
    
    // Returns all userInputs
    IEnumerable<UserInput> GetAllUserInputsForProject(int projectId);
    
    IEnumerable<Answer> GetAllAnswersWithQuestions(); 
    
    // Returns a flow based on its id
    Flow GetFlow(int flowId);
    
    ProjectDTO GetProjectFromFlow(int flowId);
    
    // Returns the next question after currentQuestionId in a certain flow
    public Question GetNextQuestionInFlow(int flowId, int currentQuestionId);
    
    // Returns the first Question from a flow
    public Question GetFirstFlowQuestion(int flowId);
    
    // Saves contactinformation
    public void SaveContactInformation(ContactInformation contactInformation);
    
    public void AddUserAnswer(string selectedAnswer, int currentFlow, int currentQuestion, int projectId, int mainThemeId, int subthemeId);
    
    public void AddUserAnswer(string selectedAnswer, int currentFlow, int currentQuestion);
   
}