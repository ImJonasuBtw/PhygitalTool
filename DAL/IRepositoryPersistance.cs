using PhygitalTool.Domain.FlowPackage;
using PhygitalTool.Domain.Platform;
using PhygitalTool.Domain.Projects;

namespace PhygitalTool.DAL;

public interface IRepositoryPersistance
{
    // Creates a new userInput
    void CreateUserInput(UserInput userInput);

    // Creates a new answer
    void CreateAnswer(Answer answer);
    Answer CreateAndReturnAnswer(Answer answer);

    // Saves Contact Information when user submits form.
    void SaveContactInformation(ContactInformation contactInformation);
    void CreateProject(Project project); 
    Flow CreateFlow(Flow flow);
    Question CreateQuestion(Question question);
    void CreateSubTheme(SubTheme subTheme);
    void CreateMainTheme(MainTheme mainTheme);
    void DeleteSubTheme(int subThemeId);
    void DeleteMainTheme(int mainThemeId);
    void RemoveProject(int projectId);
    void UpdateProject(Project project);
    void createAnswerPossilility(AnswerPossibility answerPossibility);
    void RemoveFlow(int FlowId);
    void UpdateFlow(Flow flow);
    void RemoveQuestion( int questionId);
    void UpdateQuestion(Question question);
    void updateAnswerPossibility(AnswerPossibility answerPossibility);
    void RemoveAnswerPossibilty(int answerPossibilityId);

    void createIdea(Idea idea);
    void createCommentToIdea(int ideaId, Comment comment);
}