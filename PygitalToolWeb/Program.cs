using System.Globalization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using PhygitalTool.BL;
using PhygitalTool.BL.AdminPlatform;
using PhygitalTool.BL.BackOffice;
using PhygitalTool.BL.Flows;
using PhygitalTool.BL.Users;
using PhygitalTool.DAL.EF;
using PhygitalTool.DAL.EF.Repositorys;
using PhygitalTool.DAL.IRepositorys;
using PhygitalTool.Domain.FlowPackage;
using PhygitalTool.Domain.Platform;
using PhygitalTool.Web.Services;
using Microsoft.Extensions.Localization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var connectionString = builder.Configuration.GetConnectionString("PhygitalDbContextConnection") ??
                       throw new InvalidOperationException(
                           "Connection string 'PhygitalDbContextConnection' not found.");

//var connectionString = "Host=34.171.252.227;Port=5432;Database=test;Username=postgres;Password=Student_1234;";

builder.Services.AddDbContext<PhygitalToolDbContext>(optionsBuilder =>
    optionsBuilder.UseNpgsql(connectionString));
builder.Services.AddScoped<IRepositoryAnswer, AnswerRepository>();
builder.Services.AddScoped<IRepositoryAnswerPossibility, AnswerPossibilityRepository>();
builder.Services.AddScoped<IRepositoryBackOffice, BackOfficeRepository>();
builder.Services.AddScoped<IRepositoryContactInformation, ContactInformationRepository>();
builder.Services.AddScoped<IRepositoryFlow, FlowRepository>();
builder.Services.AddScoped<IRepositoryProject, ProjectRepository>();
builder.Services.AddScoped<IRepositoryQuestion, QuestionRepository>();
builder.Services.AddScoped<IRepositoryUserInput, UserInputRepository>();
builder.Services.AddScoped<IRepositoryIdea, IdeaRepository>();
builder.Services.AddScoped<IFlowManager, FlowManger>();
builder.Services.AddScoped<IBackOfficeManager, BackOfficeManager>();
builder.Services.AddScoped<IProjectManager, ProjectManager>();
builder.Services.AddScoped<IUserManager, UserManager>();
builder.Services.AddScoped<IAdminPlatformManager, AdminPlatformManager>();
builder.Services.AddScoped<CloudStorageService>();
builder.Services.AddScoped<IAdminPlatformManager, AdminPlatformManager>();
builder.Services.AddScoped<IRepositoryNote, NoteRepository>();
builder.Services.AddLocalization(options => options.ResourcesPath = "Resources");

builder.Services.AddScoped<UnitOfWork>();

builder.Services.AddSignalR();

builder.Services.AddDistributedMemoryCache(); // Adds a default in-memory implementation of IDistributedCache
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(20); // Set session timeout duration
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true; // Make the session cookie essential
});

builder.Services.AddControllersWithViews();

builder.Services.AddDefaultIdentity<IdentityUser>(options => options.SignIn.RequireConfirmedAccount = true)
    .AddRoles<IdentityRole>()
    .AddEntityFrameworkStores<PhygitalToolDbContext>();



var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    PhygitalToolDbContext ctx = scope.ServiceProvider.GetRequiredService<PhygitalToolDbContext>();
    var userManager = services.GetRequiredService<UserManager<IdentityUser>>();
    var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();
    bool isDatabaseCreated = ctx.CreateDataBase(true);

    if (isDatabaseCreated)
    {
        DataSeeder.RoleCreation(roleManager);
        DataSeeder.Seed(ctx, userManager);
        Console.Write("Data Seeded");

        IRepositoryFlow flowRepository = new FlowRepository(ctx);
        IRepositoryUserInput userInputRepository = new UserInputRepository(ctx);
        IRepositoryAnswer answerRepository = new AnswerRepository(ctx);


        var userInputFactory = new UserInputFactory(answerRepository, userInputRepository, flowRepository);
        var amountOfFlows = ctx.Flows.Count();

        userInputFactory.GenerateRandomUserInputForAllFlows(amountOfFlows, 50);
        Console.WriteLine("UserInputs Generated");
    }
}

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}
var supportedCultures = new[]
{
    new CultureInfo("nl"),
    new CultureInfo("en")
   
};
app.UseRequestLocalization(new RequestLocalizationOptions
{
    DefaultRequestCulture = new Microsoft.AspNetCore.Localization.RequestCulture("en"),
    SupportedCultures = supportedCultures,
    SupportedUICultures = supportedCultures
});

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

//first auth then auth
app.UseAuthentication();
app.UseAuthorization();

app.UseSession();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");
app.UseEndpoints(endpoints =>
{
    endpoints.MapHub<QuestionHub>("/questionHub");
});

app.MapRazorPages();
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();