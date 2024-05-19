using PhygitalTool.Domain.FlowPackage;

namespace PhygitalTool.DAL.IRepositorys;

public interface IRepositoryUserInput
{
    IEnumerable<UserInput> ReadAllUserInputsForProject(int projectId);
    
    void CreateUserInput(UserInput userInput);
}