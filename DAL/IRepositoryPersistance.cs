using PhygitalTool.Domain.FlowPackage;
using PhygitalTool.Domain.Projects;

namespace PhygitalTool.DAL;

public interface IRepositoryPersistance
{
    // Creates a new userInput
    void CreateUserInput(UserInput userInput);

    // Creates a new answer
    void CreateAnswer(Answer answer);

    // Saves Contact Information when user submits form.
    void SaveContactInformation(ContactInformation contactInformation);
    void CreateProject(Project project);
}