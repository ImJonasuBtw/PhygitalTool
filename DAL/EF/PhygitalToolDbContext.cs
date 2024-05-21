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
    public DbSet<Admin> Admins { get; set; }
    public DbSet<AdminPlatform> AdminPlatforms { get; set; }
    public DbSet<MainTheme> MainThemes { get; set; }
    public DbSet<Supervisor> Supervisors { get; set; }
    public DbSet<Idea> Ideas { get; set; }
    public DbSet<Comment> Comments { get; set; }

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

        modelBuilder.Entity<AdminPlatform>().Property(a => a.AdminPlatformId).ValueGeneratedOnAdd();
        modelBuilder.Entity<BackOffice>().Property(b => b.BackOfficeId).ValueGeneratedOnAdd();
        modelBuilder.Entity<Flow>().Property(f => f.FlowId).ValueGeneratedOnAdd();
        modelBuilder.Entity<Project>().Property(p => p.ProjectId).ValueGeneratedOnAdd();
        modelBuilder.Entity<SubTheme>().Property(s => s.SubThemeId).ValueGeneratedOnAdd();
        modelBuilder.Entity<MainTheme>().Property(m => m.ThemeId).ValueGeneratedOnAdd();
        modelBuilder.Entity<Question>().Property(q => q.QuestionId).ValueGeneratedOnAdd();
        modelBuilder.Entity<AnswerPossibility>().Property(a=>a.AnswerPossibilityId).ValueGeneratedOnAdd();

        modelBuilder.Entity<ContactInformation>()
            .HasKey(ci => ci.ContactInformationId);

        modelBuilder.Entity<AdminPlatform>()
            .HasMany(a => a.BackOffices)
            .WithOne(b => b.AdminPlatform)
            .HasForeignKey(b => b.AdminPlatformId);

        modelBuilder.Entity<Admin>()
            .HasOne(a => a.AdminPlatform)
            .WithMany(a => a.Admins)
            .HasForeignKey(a => a.AdminPlatformId);
        
        modelBuilder.Entity<BackOffice>()
            .HasMany(b => b.Projects)
            .WithOne(p => p.BackOffice)
            .HasForeignKey(p => p.BackOfficeId);

        modelBuilder.Entity<Manager>()
            .HasOne(m => m.BackOffice)
            .WithMany(b => b.Managers)
            .HasForeignKey(m => m.BackOfficeId);

        modelBuilder.Entity<Supervisor>()
            .HasOne(s => s.BackOffice)
            .WithMany(b => b.Supervisors)
            .HasForeignKey(s => s.BackOfficeId);
            
        modelBuilder.Entity<Project>()
            .HasMany(p => p.MainThemes)
            .WithOne(mt => mt.Project)
            .HasForeignKey(mt => mt.ProjectId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<MainTheme>()
            .HasMany(mt => mt.SubThemes)
            .WithOne(st => st.MainTheme)
            .HasForeignKey(st => st.MainThemeId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<SubTheme>()
            .HasMany(st => st.Flows)
            .WithOne(f => f.SubTheme)
            .HasForeignKey(f => f.SubThemeId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Flow>()
            .HasMany(f => f.Questions)
            .WithOne(q => q.Flow)
            .HasForeignKey(q => q.FlowId)
            .OnDelete(DeleteBehavior.Cascade);
        
        modelBuilder.Entity<Question>()
            .HasMany(q => q.AnswerPossibilities)
            .WithOne() 
            .HasForeignKey(ap => ap.QuestionId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Question>()
            .HasMany(q => q.Answers)
            .WithOne() 
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Answer>()
            .HasOne(a => a.Question) 
            .WithMany(q => q.Answers) 
            .HasForeignKey(a => a.QuestionId); 
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