using Microsoft.EntityFrameworkCore;
using PhygitalTool.DAL.IRepositorys;
using PhygitalTool.Domain.Projects;

namespace PhygitalTool.DAL.EF.Repositorys;

public class ProjectRepository : IRepositoryProject
{
    private readonly PhygitalToolDbContext _context;

    public ProjectRepository(PhygitalToolDbContext context)
    {
        _context = context;
    }

    public Project ReadProjectWithThemes(int projectId)
    {
        return _context.Projects.Include(p => p.MainThemes).Include(project => project.BackOffice)
            .ThenInclude(office => office.Managers)
            .AsNoTracking()
            .SingleOrDefault(p => p.ProjectId == projectId);
    }

    public MainTheme ReadThemeWithSubthemes(int themeId)
    {
        return _context.MainThemes.Include(t => t.SubThemes).ThenInclude(theme => theme.Flows)
            .ThenInclude(flow => flow.Questions)
            .Include(mt => mt.Project)
            .ThenInclude(project => project.BackOffice).ThenInclude(office => office.Managers)
            .AsNoTracking()
            .SingleOrDefault(theme => theme.ThemeId == themeId);
    }

    public SubTheme ReadSubThemeWithFlows(int subThemeId)
    {
        return _context.SubThemes.AsNoTracking().Include(s => s.Flows).Include(theme => theme.MainTheme)
            .ThenInclude(theme => theme.Project).ThenInclude(project => project.BackOffice)
            .ThenInclude(office => office.Managers).SingleOrDefault(subTheme => subTheme.SubThemeId == subThemeId);
    }

    public SubTheme ReadSubTheme(int subThemeId)
    {
        return _context.SubThemes.AsNoTracking().SingleOrDefault(subTheme => subTheme.SubThemeId == subThemeId);
    }

    public MainTheme ReadMainTheme(int mainThemeId)
    {
        return _context.MainThemes.AsNoTracking().SingleOrDefault(mainTheme => mainTheme.ThemeId == mainThemeId);
    }

    public void CreateProject(Project project)
    {
        _context.Projects.Add(project);
        _context.SaveChanges();
    }

    public void CreateSubTheme(SubTheme subTheme)
    {
        _context.SubThemes.Add(subTheme);
        _context.SaveChanges();
    }

    public void CreateMainTheme(MainTheme mainTheme)
    {
        _context.MainThemes.Add(mainTheme);
        _context.SaveChanges();
    }

    public void RemoveProject(int projectId)
    {
        var project = _context.Projects.Find(projectId);
        if (project == null) throw new ArgumentException("Project not found");
        _context.Projects.Remove(project);
        _context.SaveChanges();
    }

    public void UpdateProject(Project project)
    {
        var existingProject = _context.Projects.Find(project.ProjectId);
        if (existingProject == null) throw new ArgumentException("Project not found");
        existingProject.ProjectName = project.ProjectName;
        existingProject.Description = project.Description;
        existingProject.Status = project.Status;
        _context.SaveChanges();
    }

    public void DeleteSubTheme(int subThemeId)
    {
        var subTheme = _context.SubThemes.Find(subThemeId);
        if (subTheme == null) throw new ArgumentException("Subtheme not found");
        _context.SubThemes.Remove(subTheme);
        _context.SaveChanges();
    }

    public void DeleteMainTheme(int mainThemeId)
    {
        var mainTheme = _context.MainThemes.Find(mainThemeId);
        if (mainTheme == null) throw new ArgumentException("Theme not found");
        _context.MainThemes.Remove(mainTheme);
        _context.SaveChanges();
    }

    public void UpdateSubTheme(SubTheme updatedSubTheme)
    {
        var existingSubTheme =
            _context.SubThemes.SingleOrDefault(subTheme => subTheme.SubThemeId == updatedSubTheme.SubThemeId);
        if (existingSubTheme != null)
        {
            existingSubTheme.SubThemeName = updatedSubTheme.SubThemeName;
            existingSubTheme.SubThemeInformation = updatedSubTheme.SubThemeInformation;
            _context.SaveChanges();
        }
        else
        {
            throw new ArgumentException("The subtheme could not be found.");
        }
    }

    public void UpdateMainTheme(MainTheme updatedMainTheme)
    {
        var existingMainTheme = _context.MainThemes.SingleOrDefault(theme => theme.ThemeId == updatedMainTheme.ThemeId);
        if (existingMainTheme != null)
        {
            existingMainTheme.ThemeName = updatedMainTheme.ThemeName;
            existingMainTheme.MainThemeInformation = updatedMainTheme.MainThemeInformation;
            _context.SaveChanges();
        }
        else
        {
            throw new ArgumentException("The theme could not be found.");
        }
    }

    public ProjectDTO ReadProjectFromFlowId(int flowId)
    {
        var projectDto = _context.Flows
            .Where(f => f.FlowId == flowId)
            .Select(f => f.SubTheme.MainTheme.Project)
            .AsNoTracking()
            .Select(p => new ProjectDTO { ProjectId = p.ProjectId })
            .SingleOrDefault();

        return projectDto;
    }
}