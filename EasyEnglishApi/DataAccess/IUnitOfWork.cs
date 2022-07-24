using EasyEnglishApi.DataAccess.Repositories;

namespace EasyEnglishApi.DataAccess
{
    public interface IUnitOfWork
    {
        public WordRepository WordRepository { get; }
        public CardRepository CardRepository { get; }
        int SaveChanges();
    }
}
