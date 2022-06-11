using EasyEnglishApi.Models;

namespace EasyEnglishApi.Services.Interfaces
{
    public interface IVocabularyService
    {
        Task<IEnumerable<Word>> GetWordsAsync();
        void AddWord(Word word);
        void UpdateWord(int id, Word word);
        void RemoveWord(int id);
    }
}
