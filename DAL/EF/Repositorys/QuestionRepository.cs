using Microsoft.EntityFrameworkCore;
using PhygitalTool.DAL.IRepositorys;
using PhygitalTool.Domain.FlowPackage;
using PhygitalTool.Domain.Util;

namespace PhygitalTool.DAL.EF.Repositorys;

public class QuestionRepository : IRepositoryQuestion
{
    private readonly PhygitalToolDbContext _context;

    public QuestionRepository(PhygitalToolDbContext context)
    {
        _context = context;
    }

    public Question ReadQuestion(int id)
    {
        return _context.Questions.AsNoTracking().SingleOrDefault(q => q.QuestionId == id);
    }

    public Question ReadQuestionWithAnswerPossibilities(int id)
    {
        return _context.Questions.AsNoTracking().Include(q => q.AnswerPossibilities)
            .SingleOrDefault(q => q.QuestionId == id);
    }

    public Question CreateQuestion(Question question)
    {
        _context.Questions.Add(question);
        _context.SaveChanges();
        return _context.Questions.SingleOrDefault(q =>
            q.QuestionText == question.QuestionText && q.QuestionType == question.QuestionType);
    }

    public void RemoveQuestion(int questionId)
    {
        var question = _context.Questions.Find(questionId);
        if (question == null) throw new ArgumentException("Question not found");
        _context.Questions.Remove(question);
        _context.SaveChanges();
    }

    public void UpdateQuestion(Question question)
    {
        var existingQ = _context.Questions.Find(question.QuestionId);
        if (existingQ == null) throw new ArgumentException("Question not found");
        existingQ.QuestionText = question.QuestionText;
        existingQ.QuestionType = question.QuestionType;
        existingQ.QuestionImage = question.QuestionImage;
        _context.SaveChanges();
    }

    public Question ReadFirstFlowQuestion(int flowId)
    {
        var flow = _context.Flows
            .Where(f => f.FlowId == flowId)
            .Include(f => f.Questions)
            .ThenInclude(q => q.AnswerPossibilities)
            .AsNoTracking()
            .SingleOrDefault();

        return flow?.Questions.OrderBy(q => q.QuestionId).FirstOrDefault();
    }

    public Question ReadNextQuestionInFlow(int flowId, int currentQuestionId, string answer)
    {
        var currentQuestion = ReadQuestion(currentQuestionId);

        if (currentQuestion == null)
        {
            return null;
        }

        if (currentQuestion.IsConditional)
        {
            var answerPossibilities = ReadQuestionWithAnswerPossibilities(currentQuestionId).AnswerPossibilities;

            foreach (var answerPossibility in answerPossibilities)
            {
                if (answer == answerPossibility.Description)
                {
                    if (answerPossibility.NextQuestionId != 0)
                    {
                        return ReadQuestion(answerPossibility.NextQuestionId);
                    }
                    else
                    {
                        return ReadNextSequentialQuestion(flowId, currentQuestionId);
                    }
                }
            }
        }
        else
        {
            return ReadNextSequentialQuestion(flowId, currentQuestionId);
        }

        return null;
    }

    public Question ReadNextQuestionInFlow(int flowId, int currentQuestionId)
    {
        return ReadNextSequentialQuestion(flowId, currentQuestionId);
    }
    
    
    private Question ReadNextSequentialQuestion(int flowId, int currentQuestionId)
    {
        var flow = _context.Flows
            .AsNoTracking()
            .SingleOrDefault(f => f.FlowId == flowId);

        if (flow == null)
        {
            return null;
        }

        int subThemeId = flow.SubThemeId;
        
        var nextQuestion = _context.Questions
            .Include(q => q.AnswerPossibilities)
            .Include(question => question.Flow)
            .Where(q => q.FlowId == flowId && q.Flow.SubThemeId == subThemeId && q.QuestionId > currentQuestionId && q.QuestionType != QuestionType.Open )
            .OrderBy(q => q.QuestionId)
            .AsNoTracking()
            .FirstOrDefault(); 

        return nextQuestion;
    }
    

    public ICollection<Question> ReadFlowQuestions(int flowId)
    {
        var flow = _context.Flows.Include(f => f.Questions).ThenInclude(q => q.AnswerPossibilities)
            .SingleOrDefault(f => f.FlowId == flowId);
        return flow?.Questions.OrderBy(q => q.QuestionId).ToList();
    }
}