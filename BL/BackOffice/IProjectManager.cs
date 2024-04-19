using PhygitalTool.Domain.FlowPackage;
using PhygitalTool.Domain.Projects;

namespace PhygitalTool.BL;

public interface IProjectManager
{
    void AddProject(Project project);
    void AddSubTheme(SubTheme subTheme);
    void DeleteSubTheme(int subThemeId);
    Project GetProjectWithThemes(int projectId);
    MainTheme GetThemeWithSubthemes(int themeId);
    SubTheme GetSubTheme(int subThemeId);
    SubTheme GetSubThemeWithFlows(int subThemeId);
    void DeleteProject(int projectId); 
   
    void AddFlow(Flow flow);
    void AddQuestion(Question question);

    void AddAnswerPossibility(AnswerPossibility answerPossibility);
    void UpdateSubTheme(SubTheme subTheme);
    void UpdateProject(Project existingProject);
}