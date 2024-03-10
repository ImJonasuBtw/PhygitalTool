using Domain.Flow;

namespace Domain.Domain.Flow;

public class AnswerPossibility
{
    //prop
    public int AnswerPossibilityId { get;  set; }
    public string Description { get;  set; }
    
    //Nav
    public Question Question { get; set; }
}