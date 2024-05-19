using Microsoft.EntityFrameworkCore;
using PhygitalTool.DAL.IRepositorys;
using PhygitalTool.Domain.FlowPackage;

namespace PhygitalTool.DAL.EF;

public class QuestionRepository : IRepositoryQuestion
{
    private readonly PhygitalToolDbContext _context;

    public QuestionRepository(PhygitalToolDbContext context)
    {
        _context = context;
    }

    public Question ReadQuestion(int id)
    {
        return _context.Questions.SingleOrDefault(q => q.QuestionId == id);
    }

    public Question ReadQuestionWithAnswerPossibilities(int id)
    {
        return _context.Questions.Include(q => q.AnswerPossibilities).SingleOrDefault(q => q.QuestionId == id);
    }

    public Question CreateQuestion(Question question)
    {
        _context.Questions.Add(question);
        _context.SaveChanges();
        return _context.Questions.FirstOrDefault(q =>
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
        _context.SaveChanges();
    }

    public Question ReadFirstFlowQuestion(int flowId)
    {
        var flow = _context.Flows.Include(f => f.Questions).ThenInclude(q => q.AnswerPossibilities)
            .FirstOrDefault(f => f.FlowId == flowId);
        return flow?.Questions.OrderBy(q => q.QuestionId).FirstOrDefault();
    }

    public Question ReadNextQuestionInFlow(int flowId, int currentQuestionId, string answer)
    {
        var questionsInFlow = ReadFlowQuestions(flowId);
        var currentQuestion = ReadQuestion(currentQuestionId);

        if (currentQuestion.IsConditional)
        {
            foreach (var answerPossibility in
                     ReadQuestionWithAnswerPossibilities(currentQuestionId).AnswerPossibilities)
            {
                if (answer == answerPossibility.Description)
                {
                    if (answerPossibility.NextQuestionId != 0)
                    {
                        return questionsInFlow.FirstOrDefault(q => q.QuestionId == answerPossibility.NextQuestionId);
                    }

                    var currentQuestionIndex =
                        questionsInFlow.ToList().FindIndex(q => q.QuestionId == currentQuestionId);
                    if (currentQuestionIndex >= 0 && currentQuestionIndex < questionsInFlow.Count - 1)
                    {
                        return questionsInFlow.ElementAt(currentQuestionIndex + 1);
                    }
                }
            }
        }
        else
        {
            var currentQuestionIndex = questionsInFlow.ToList().FindIndex(q => q.QuestionId == currentQuestionId);
            if (currentQuestionIndex >= 0 && currentQuestionIndex < questionsInFlow.Count - 1)
            {
                return questionsInFlow.ElementAt(currentQuestionIndex + 1);
            }
        }

        return null;
    }

    public Question ReadNextQuestionInFlow(int flowId, int currentQuestionId)
    {
        var questionsInFlow = ReadFlowQuestions(flowId);
        var currentQuestionIndex = questionsInFlow.ToList().FindIndex(q => q.QuestionId == currentQuestionId);
        if (currentQuestionIndex >= 0 && currentQuestionIndex < questionsInFlow.Count - 1)
        {
            return questionsInFlow.ElementAt(currentQuestionIndex + 1);
        }

        return null;
    }

    public ICollection<Question> ReadFlowQuestions(int flowId)
    {
        var flow = _context.Flows.Include(f => f.Questions).ThenInclude(q => q.AnswerPossibilities)
            .FirstOrDefault(f => f.FlowId == flowId);
        return flow?.Questions.OrderBy(q => q.QuestionId).ToList();
    }
}