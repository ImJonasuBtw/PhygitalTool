using PhygitalTool.Domain.Projects;

namespace PhygitalTool.BL;

public interface IProjectManager
{
    void AddProject(Project project);
    Project GetProjectWithThemes(int projectId);
    MainTheme GetThemeWithSubthemes(int themeId);
    SubTheme GetSubThemeWithFlows(int subThemeId);
}