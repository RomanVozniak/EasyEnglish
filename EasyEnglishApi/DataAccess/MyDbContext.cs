using EasyEnglishApi.Models;
using Microsoft.EntityFrameworkCore;

namespace EasyEnglishApi.DataAccess
{
    public class MyDbContext : DbContext
    {
        public DbSet<Word> Words { get; set; } = null!;
        public DbSet<Card> Cards { get; set; } = null!;
        public DbSet<WordLearnResults> WordLearnResults { get; set; } = null!;

        public MyDbContext(DbContextOptions<MyDbContext> options) : base(options) 
        {
            Database.EnsureCreated();
        }

        public MyDbContext() { }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(@"Server=DESKTOP-917GPRV;Database=EasyEnglish;Trusted_Connection=True;");
            }
        }
    }
}
