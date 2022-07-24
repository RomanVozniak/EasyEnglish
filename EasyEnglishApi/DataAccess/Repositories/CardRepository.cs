using EasyEnglishApi.Models;
using Microsoft.EntityFrameworkCore;

namespace EasyEnglishApi.DataAccess.Repositories
{
    public class CardRepository
    {
        private readonly MyDbContext _context;

        public CardRepository(MyDbContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public async Task<IEnumerable<Card>> GetCardsAsync()
        {
            return await _context.Cards.OrderByDescending(card => card.Id).ToListAsync<Card>();
        }

        public Card? GetCardById(int id)
        {
            Card? card = _context.Cards.Find(id);
            return card;
        }

        public Card? GetCardByIdFull(int id)
        {
            Card? card = _context.Cards
                .Include(card => card.Words)
                    .ThenInclude(word => word!.WordLearnResults)
                .Where(card => card.Id == id)
                .FirstOrDefault();
            return card;
        }

        public void Add(Card card)
        {
            _context.Cards.Add(card);
        }

        public void Update(Card card)
        {
            _context.Update(card);
        }

        public void Remove(Card card)
        {
            _context.Cards.Remove(card);
        }
    }
}
