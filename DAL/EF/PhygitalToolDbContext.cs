using System.Diagnostics;
using Domain.Domain.Flow;
using Domain.FlowPackage;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace DAL.EF;

public class PhygitalToolDbContext : DbContext
{
    public DbSet<Question> Questions { get; set; }
    public DbSet<AnswerPossibility> AnswerPossibilities { get; set; }
    public DbSet<UserInput> UserInputs { get; set; }
    public DbSet<Answer> Answers { get; set; }
    public DbSet<Flow> Flows { get; set; }
    
    public DbSet<ContactInformation> ContactInformations { get; set; }

    public PhygitalToolDbContext(DbContextOptions options) : base(options)
    {
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (!optionsBuilder.IsConfigured)
        {
            optionsBuilder.UseNpgsql(
                "Host=localhost;Port=5432;Database=database_name;Username=postgres;Password=Student_1234;");
        }

        optionsBuilder.LogTo(message => Debug.WriteLine(message), LogLevel.Information);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<Answer>()
            .HasOne(a => a.AnswerPossibility)
            .WithOne(ap => ap.Answer)
            .HasForeignKey<Answer>("AnswerPossibilityID");
        
        modelBuilder.Entity<ContactInformation>()
            .HasKey(ci => ci.ContactInformationId);
        
        // modelBuilder.Entity<Question>().ToTable("Questions");
    }

    public bool CreateDataBase(bool dropDatabase)
    {
        if (dropDatabase)
        {
            Database.EnsureDeleted();
        }

        return Database.EnsureCreated();
    }
}