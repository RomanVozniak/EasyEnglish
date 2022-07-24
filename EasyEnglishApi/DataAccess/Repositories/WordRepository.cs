using EasyEnglishApi.Models;
using Microsoft.EntityFrameworkCore;

namespace EasyEnglishApi.DataAccess.Repositories
{
    public class WordRepository
    {
        private readonly MyDbContext _context;

        public WordRepository(MyDbContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public async Task<IEnumerable<Word>> GetWordsAsync()
        {
            return await _context.Words.ToListAsync<Word>();
        }

        public Word? Find(int id)
        {
            Word? word = _context.Words.Find(id);
            return word;
        }

        public void AddWord(Word word)
        {
            _context.Words.Add(word);
        }

        public void Update(Word word)
        {
            _context.Update(word);
        }

        public void Remove(Word word)
        {
            _context.Words.Remove(word);
        }

        public void AddWordsLearningResult(List<WordLearnResults> results)
        {
            _context.WordLearnResults.AddRange(results);
        }
    }
}
