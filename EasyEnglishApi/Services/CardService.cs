using EasyEnglishApi.DataAccess;
using EasyEnglishApi.Models;
using EasyEnglishApi.Services.Interfaces;

namespace EasyEnglishApi.Services
{
    public class CardService : ServiceBase, ICardService
    {
        public CardService(IUnitOfWork unitOfWork) : base(unitOfWork) { }

        public void Add(Card card)
        {
            _unitOfWork.CardRepository.Add(card);
            _unitOfWork.SaveChanges();
        }

        public async Task<IEnumerable<Card>> GetCardsAsync()
        {
            IEnumerable<Card> cards = await _unitOfWork.CardRepository.GetCardsAsync();
            return cards;
        }

        public Card? GetFull(int id)
        {
            Card? card = _unitOfWork.CardRepository.GetCardByIdFull(id);
            return card;
        }

        public void Remove(int id)
        {
            Card? card = _unitOfWork.CardRepository.GetCardById(id);

            if (card != null)
            {
                _unitOfWork.CardRepository.Remove(card);
                _unitOfWork.SaveChanges();
            }
        }

        public void Update(int id, Card card)
        {
            Card? cardToUpdate = _unitOfWork.CardRepository.GetCardById(id);

            if (cardToUpdate != null)
            {
                cardToUpdate.Name = card.Name;
                cardToUpdate.Description = card.Description;

                _unitOfWork.CardRepository.Update(cardToUpdate);
                _unitOfWork.SaveChanges();
            }
        }
    }
}
