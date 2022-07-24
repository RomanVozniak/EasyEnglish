using EasyEnglishApi.Models;
using EasyEnglishApi.Services.Dto;

namespace EasyEnglishApi.Services.Interfaces
{
    public interface IVocabularyService
    {
        Task<IEnumerable<Word>> GetWordsAsync(WordsFilterDto filterDto);
        void AddWord(Word word);
        void UpdateWord(int id, Word word);
        void RemoveWord(int id);
        void SaveWordsLearningResults(List<WordLearnResults> results);
    }
}
