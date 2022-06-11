using EasyEnglishApi.Models;

namespace EasyEnglishApi.Services.Interfaces
{
    public interface ICardService
    {
        Task<IEnumerable<Card>> GetCardsAsync();
        Card? GetFull(int id);
        void Add(Card card);
        void Update(int id, Card card);
        void Remove(int id);
    }
}
