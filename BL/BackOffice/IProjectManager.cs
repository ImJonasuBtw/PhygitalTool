using PhygitalTool.Domain.FlowPackage;
using PhygitalTool.Domain.Projects;
using PhygitalTool.Domain.Util;

namespace PhygitalTool.BL.BackOffice;

public interface IProjectManager
{
    void AddProject(string description, string projectName, DateTime creationDate, ProjectStatus status,
        int backOfficeId);
    
    void AddSubTheme(string subThemeName, string subThemeInformation, int mainThemeId);
    
    void DeleteSubTheme(int subThemeId);
    
    void DeleteMainTheme(int mainThemeId);
    
    Project GetProjectWithThemes(int projectId);
    
    MainTheme GetThemeWithSubthemes(int themeId);
    
    SubTheme GetSubTheme(int subThemeId);
    
    MainTheme GetMainTheme(int mainThemeId);
    
    SubTheme GetSubThemeWithFlows(int subThemeId);
    
    void DeleteProject(int projectId);
    
    void AddNote(int questionId, string noteDesc);
    
    IEnumerable<Note> GetNotes();
    
    void AddMainTheme(string mainThemeName, string mainThemeInformation, int projectId);
    
    void UpdateSubTheme(int subThemeId, string subThemeName, string subThemeInformation);
    
    void UpdateMainTheme(int mainThemeId, string mainThemeName, string mainThemeInformation);
    
    void UpdateProject(string projectName, string projectDesc, ProjectStatus projectStatus, int projectId);
    
    void DeleteFlow(int flowId);
    
    Flow GetFlowWithQuestionAndAnswerPossibilities(int flowId);
    
    void DeleteQuestion(int questionId);
    
    void DeleteAnswerPossibility(int answerPossibilityId);
    
    public Flow AddFlowWithQuestionsAndAnswers(string flowDescription, string flowName, string flowImage,
        FlowType flowType,
        Language language, int subthemeId,
        List<(string QuestionText, QuestionType questionType, string QuestionImage, List<string> AnswerDescriptions)>
            questions, int backOfficeId);
    
    void UpdateFlowWithQuestionsAndAnswers(int flowId, string flowName, string flowImage, string flowDescription, FlowType flowType,
        Language language, List<Question> questions);
}