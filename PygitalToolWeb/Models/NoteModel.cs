using System.ComponentModel.DataAnnotations;
using PhygitalTool.Domain.Util;

namespace PhygitalTool.Web.Models;

public class NoteModel
{
    public int QuestionId { get; set; }
    [Required(ErrorMessage = "Description is required")]
    public string Description { get; set; }

}