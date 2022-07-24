using EasyEnglishApi.DataAccess;
using EasyEnglishApi.Models;
using EasyEnglishApi.Models.Enums;
using EasyEnglishApi.Services.Dto;
using EasyEnglishApi.Services.Extensions;
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

        public async Task<IEnumerable<CardDto>> GetCardsAsync()
        {

            IEnumerable<Card> cards = await _unitOfWork.CardRepository.GetCardsAsync();

            List<CardDto> cardsDto = new List<CardDto>();

            

            foreach (Card card in cards)
            {
                CardDto cartDto = card.ToDto();
                cartDto.CardStatistic = GetCardStatus(cartDto.Id);
                cardsDto.Add(cartDto);
            }

            GetCardsSize(cardsDto);

            return cardsDto;
        }

        public CardDto? GetFull(int id)
        {
            Card? card = _unitOfWork.CardRepository.GetCardByIdFull(id);

            if (card != null)
            {
                CardDto cartDto = card.ToDto();
                cartDto.CardStatistic = GetCardStatus(id);
                return cartDto;
            }
            return null;
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

        private void GetCardsSize(IEnumerable<CardDto> cards)
        {
            using (MyDbContext db = new MyDbContext())
            {
                var grouppedCards =
                    from card in cards
                    join word in db.Words on card.Id equals word.CardId
                    group new { card, word } by card into grp
                    select new
                    {
                        CardId = grp.Key.Id,
                        WordsCount = grp.Select(tbl => tbl.word).Count()
                    };

                foreach(var card in cards)
                {
                    card.WordsCount = grouppedCards.First(c => c.CardId == card.Id).WordsCount;
                }
            }
        }

        private CardStatisticDto GetCardStatus(int cardId)
        {
            using (MyDbContext db = new MyDbContext())
            {
                var grouppedByTotalLearns = 
                    from card in db.Cards
                    join word in db.Words on card.Id equals word.CardId
                    join wlr in db.WordLearnResults on word.Id equals wlr.WordId
                    where card.Id == cardId
                    group wlr by new {
                      cardId = card.Id,
                      wordId = word.Id 
                    }
                    into grp
                    select new
                    {
                        cardId = grp.Key.cardId,
                        wordId = grp.Key.wordId,
                        learnCount = grp.Count(),
                        lastLearnDate = grp.Max(w => w.DateTime)
                    };

                var grouppedByTypeOfLearns = 
                    from card in db.Cards
                    join word in db.Words on card.Id equals word.CardId
                    join wlr in db.WordLearnResults on word.Id equals wlr.WordId
                    where card.Id == cardId
                    group wlr by new
                    {
                        cardId = card.Id,
                        wordId = word.Id,
                        type = wlr.Type
                    }
                    into grp
                    select new
                    {
                        cardId = grp.Key.cardId,
                        wordId = grp.Key.wordId,
                        type = grp.Key.type,
                        learnCount = grp.Count(),
                        learnCountSuccess = grp.Sum(w => w.IsSuccessful ? 1 : 0)
                    };

                if (grouppedByTotalLearns.Count() != 0)
                {
                    CardStatisticDto cardStatistic = new CardStatisticDto();
                    cardStatistic.totalLearns = grouppedByTotalLearns.Min(g => g.learnCount);
                    cardStatistic.speakingSuccessLearns = grouppedByTypeOfLearns.Where(g => g.type == WordLearningType.Speaking).Min(g => g.learnCountSuccess);
                    cardStatistic.writingSuccessLearns = grouppedByTypeOfLearns
                        .Where(g => g.type == WordLearningType.Writing)
                        .DefaultIfEmpty()
                        .Min(g => (int?)g.learnCountSuccess) ?? 0;
                    cardStatistic.lastLearnDate = grouppedByTotalLearns.Select(w => w.lastLearnDate).FirstOrDefault();
                    cardStatistic.CalculateNumbersLeft();
                    return cardStatistic;
                }
            }
            return null;
        }
    }
}
