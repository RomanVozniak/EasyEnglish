using EasyEnglishApi.DataAccess;
using EasyEnglishApi.Models;
using EasyEnglishApi.Services.Dto;
using EasyEnglishApi.Services.Interfaces;

namespace EasyEnglishApi.Services
{
    public class VocabularyService : ServiceBase, IVocabularyService
    {
        public VocabularyService(IUnitOfWork unitOfWork) : base(unitOfWork) { }

        public async Task<IEnumerable<Word>> GetWordsAsync(WordsFilterDto filterDto)
        {
            IEnumerable<Word> words = await _unitOfWork.WordRepository.GetWordsAsync();
            if (filterDto.CardId.HasValue)
            {
                words = words.Where(word => word.CardId == filterDto.CardId);
            }
            return words;
        }

        public void AddWord(Word word)
        {
            _unitOfWork.WordRepository.AddWord(word);
            _unitOfWork.SaveChanges();
        }

        public void UpdateWord(int id, Word word)
        {
            Word? wordToUpdate = _unitOfWork.WordRepository.Find(id);

            if (wordToUpdate != null)
            {
                wordToUpdate.Phrase = word.Phrase;
                wordToUpdate.Translation = word.Translation;
                wordToUpdate.Description = word.Description;
                wordToUpdate.CardId = word.CardId;

                _unitOfWork.WordRepository.Update(wordToUpdate);
                _unitOfWork.SaveChanges();
            }
        }

        public void RemoveWord(int id)
        {
            Word? word = _unitOfWork.WordRepository.Find(id);

            if (word != null)
            {
                _unitOfWork.WordRepository.Remove(word);
                _unitOfWork.SaveChanges();
            }
        }

        public void SaveWordsLearningResults(List<WordLearnResults> results)
        {
            _unitOfWork.WordRepository.AddWordsLearningResult(results);
            _unitOfWork.SaveChanges();
        }
    }
}
