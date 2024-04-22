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
   
    void AddFlow(Flow flow);
    void AddQuestion(Question question);

    void AddAnswerPossibility(AnswerPossibility answerPossibility);
    void AddMainTheme(MainTheme mainTheme);
    void UpdateSubTheme(SubTheme subTheme);
    void UpdateMainTheme(MainTheme mainTheme);
    void UpdateProject(Project existingProject);
}