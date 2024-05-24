using PhygitalTool.Domain.FlowPackage;
using PhygitalTool.Domain.Projects;

namespace PhygitalTool.BL;

public interface IProjectManager
{
    void AddProject(Project project);
    void AddSubTheme(SubTheme subTheme);
    void DeleteSubTheme(int subThemeId);
    void DeleteMainTheme(int mainThemeId);
    Project GetProjectWithThemes(int projectId);
    MainTheme GetThemeWithSubthemes(int themeId);
    SubTheme GetSubTheme(int subThemeId);
    MainTheme GetMainTheme(int mainThemeId);
    SubTheme GetSubThemeWithFlows(int subThemeId);
    void DeleteProject(int projectId); 
   
    Flow AddFlow(Flow flow);
    Question AddQuestion(Question question);

    void AddNote(Note note);
    IEnumerable<Note> getNotes();

    void AddAnswerPossibility(AnswerPossibility answerPossibility);
    void AddMainTheme(MainTheme mainTheme);
    void UpdateSubTheme(SubTheme subTheme);
    void UpdateMainTheme(MainTheme mainTheme);
    void UpdateProject(Project existingProject);
    void DeleteFlow(int FlowId);
    Flow GetFlowWithQuestionAndAnswerPossibilities(int FlowId);
    void UpdateFlow(Flow flow);
    void DeleteQuestion(int questionId);
    void UpdateQuestion(Question question);
    Question GetQuestion(int QuestionId);
    void UpdateAnswerPossibility(AnswerPossibility answerPossibility);
    void DeleteAnswerPossibility(int answerPossibilityID);
}