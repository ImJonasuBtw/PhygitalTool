using PhygitalTool.Domain.Util;

namespace PhygitalTool.Web.Models;

public class QuestionModel
{
    public string QuestionText { get; set; }
    public QuestionType QuestionType { get; set; } 
    public ICollection<AnswerPossibilityModel> AnswerPossibilities { get; set; }
    public int FlowId { get; set; }
}