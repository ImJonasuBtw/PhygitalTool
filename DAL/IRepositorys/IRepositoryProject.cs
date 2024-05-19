using PhygitalTool.Domain.Projects;

namespace PhygitalTool.DAL.IRepositorys;

public interface IRepositoryProject
{
    Project ReadProjectWithThemes(int projectId);
    
    MainTheme ReadThemeWithSubthemes(int themeId);
    
    SubTheme ReadSubThemeWithFlows(int subThemeId);
    
    SubTheme ReadSubTheme(int subThemeId);
    
    MainTheme ReadMainTheme(int mainThemeId);
    
    void CreateProject(Project project);
    
    void CreateSubTheme(SubTheme subTheme);
    
    void CreateMainTheme(MainTheme mainTheme);
    
    void RemoveProject(int projectId);
    
    void UpdateProject(Project project);
    
    void DeleteSubTheme(int subThemeId);
    
    void DeleteMainTheme(int mainThemeId);
    
    void UpdateSubTheme(SubTheme updatedSubTheme);
    
    void UpdateMainTheme(MainTheme updatedMainTheme);
    
    ProjectDTO ReadProjectFromFlowId(int flowId);
}