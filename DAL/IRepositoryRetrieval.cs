using Domain.Flow;

namespace DAL;

public interface IRepositoryRetrieval
{
    Question readQuestion(int id);
}