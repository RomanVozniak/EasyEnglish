using EasyEnglishApi.DataAccess.Repositories;

namespace EasyEnglishApi.DataAccess
{
    public class UnitOfWork : IUnitOfWork
    {
        private MyDbContext _context = null!;
        private WordRepository _wordRepository = null!;
        private CardRepository _cardRepository = null!;

        public UnitOfWork(MyDbContext context)
        {
            _context = context;
        }

        public WordRepository WordRepository
        {
            get {
                if (_wordRepository == null)
                {
                    _wordRepository = new WordRepository(_context);
                }
                return _wordRepository;
            }
        }

        public CardRepository CardRepository
        {
            get {
                if (_cardRepository == null)
                {
                    _cardRepository = new CardRepository(_context);
                }
                return _cardRepository;
            }
        }

        public int SaveChanges()
        {
            return _context.SaveChanges();
        }
    }
}
