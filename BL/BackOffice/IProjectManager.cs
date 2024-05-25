using PhygitalTool.Domain.FlowPackage;
using PhygitalTool.Domain.Projects;
using PhygitalTool.Domain.Util;

namespace PhygitalTool.BL.BackOffice;

public interface IProjectManager
{
    void AddProject(string description, string projectName, DateTime creationDate, ProjectStatus status,
        int backOfficeId);

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

    void AddNote(int questionId, string noteDesc);
    IEnumerable<Note> GetNotes();

    void AddAnswerPossibility(AnswerPossibility answerPossibility);
    void AddMainTheme(MainTheme mainTheme);
    void UpdateSubTheme(SubTheme subTheme);
    void UpdateMainTheme(MainTheme mainTheme);
    void UpdateProject(string projectName,string projectDesc, ProjectStatus projectStatus, int projectId);
    void DeleteFlow(int flowId);
    Flow GetFlowWithQuestionAndAnswerPossibilities(int flowId);
    void UpdateFlow(Flow flow);
    void DeleteQuestion(int questionId);
    void UpdateQuestion(Question question);
    Question GetQuestion(int questionId);
    void UpdateAnswerPossibility(AnswerPossibility answerPossibility);
    void DeleteAnswerPossibility(int answerPossibilityId);

    public Flow AddFlowWithQuestionsAndAnswers(string flowDescription, string flowName, FlowType flowType,
        Language language, int subthemeId,
        List<(string QuestionText, QuestionType questionType, string QuestionImage, List<string> AnswerDescriptions)>
            questions);

    void UpdateFlowWithQuestionsAndAnswers(int flowId, string flowName, string flowDescription, FlowType flowType,
        Language language, List<Question> questions);
}