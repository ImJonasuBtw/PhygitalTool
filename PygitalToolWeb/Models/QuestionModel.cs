using PhygitalTool.Domain.Util;
using System.ComponentModel.DataAnnotations;
namespace PhygitalTool.Web.Models;

public class QuestionModel
{
    public int QuestionId { get; set; }
    [Required(ErrorMessage = "QuestionText is required")]
    [StringLength(400, ErrorMessage = "Question cannot exceed 400 characters.")]
    
    public string QuestionText { get; set; }
    
    public string QuestionImage { get; set; }
    [Required(ErrorMessage = "QuestionType  is required")]
    public QuestionType QuestionType { get; set; } 
    public ICollection<AnswerPossibilityModel> AnswerPossibilities { get; set; }
    public int FlowId { get; set; }
}