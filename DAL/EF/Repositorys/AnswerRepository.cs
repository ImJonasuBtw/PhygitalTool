using Microsoft.EntityFrameworkCore;
using PhygitalTool.DAL.IRepositorys;
using PhygitalTool.Domain.FlowPackage;

namespace PhygitalTool.DAL.EF;

public class AnswerRepository : IRepositoryAnswer
{
    private readonly PhygitalToolDbContext _context;

    public AnswerRepository(PhygitalToolDbContext context)
    {
        _context = context;
    }

    public IEnumerable<Answer> ReadAllAnswers()
    {
        return _context.Answers.AsNoTracking();
    }

    public IEnumerable<Answer> ReadAllAnswersWithQuestions()
    {
        return _context.Answers.AsNoTracking().Select(answer => new Answer
        {
            AnswerId = answer.AnswerId,
            AnswerText = answer.AnswerText,
            QuestionId = answer.QuestionId,
            Question = _context.Questions.FirstOrDefault(question => question.QuestionId == answer.QuestionId)
        });
    }

    public void CreateAnswer(Answer answer)
    {
        _context.Answers.Add(answer);
        _context.SaveChanges();
    }
    
    public Answer CreateAndReturnAnswer(Answer answer)
    {
        _context.Answers.Add(answer);
        _context.SaveChanges();
        return answer;
    }
}