using System.Diagnostics;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using PhygitalTool.Domain.FlowPackage;
using PhygitalTool.Domain.Platform;
using PhygitalTool.Domain.Projects;

namespace PhygitalTool.DAL.EF;

public class PhygitalToolDbContext : IdentityDbContext<IdentityUser>
{
    public DbSet<Question> Questions { get; set; }
    public DbSet<AnswerPossibility> AnswerPossibilities { get; set; }
    public DbSet<UserInput> UserInputs { get; set; }
    public DbSet<Answer> Answers { get; set; }
    public DbSet<Flow> Flows { get; set; }
    public DbSet<SubTheme> SubThemes { get; set; }
    public DbSet<ContactInformation> ContactInformations { get; set; }
    public DbSet<Project> Projects { get; set; }
    public DbSet<BackOffice> BackOffices { get; set; }
    public DbSet<Manager> Managers { get; set; }
    public DbSet<MainTheme> MainThemes { get; set; }

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
        modelBuilder.Entity<Flow>().Property(f => f.FlowId).ValueGeneratedOnAdd();
        modelBuilder.Entity<Project>().Property(p => p.ProjectId).ValueGeneratedOnAdd();
        modelBuilder.Entity<SubTheme>().Property(s => s.SubThemeId).ValueGeneratedOnAdd();
        modelBuilder.Entity<Question>().Property(q => q.QuestionId).ValueGeneratedOnAdd();

        modelBuilder.Entity<ContactInformation>()
            .HasKey(ci => ci.ContactInformationId);

        // modelBuilder.Entity<Question>().ToTable("Questions");
              
        modelBuilder.Entity<BackOffice>()
            .HasMany(b => b.Projects)
            .WithOne(p => p.BackOffice)
            .HasForeignKey(p => p.BackOfficeId);
        
        modelBuilder.Entity<Manager>()
            .HasOne(m => m.BackOffice) // Each manager has one BackOffice
            .WithMany(b => b.Managers) // Each BackOffice has many managers
            .HasForeignKey(m => m.BackOfficeId); // Foreign key in Manager table pointing to BackOffice
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