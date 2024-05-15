using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using PhygitalTool.BL;
using PhygitalTool.BL.Users;
using PhygitalTool.DAL;
using PhygitalTool.DAL.EF;
using PhygitalTool.Domain.FlowPackage;
using PhygitalTool.Domain.Platform;
using PhygitalTool.Web.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var connectionString = builder.Configuration.GetConnectionString("PhygitalDbContextConnection") ??
                       throw new InvalidOperationException(
                           "Connection string 'PhygitalDbContextConnection' not found.");

builder.Services.AddDbContext<PhygitalToolDbContext>(optionsBuilder =>
    optionsBuilder.UseNpgsql(connectionString));
builder.Services.AddScoped<IRepositoryRetrieval, RetrievalRepository>();
builder.Services.AddScoped<IRepositoryPersistance, PersistanceRepository>();
builder.Services.AddScoped<IFlowManager, FlowManger>();
builder.Services.AddScoped<IBackOfficeManager, BackOfficeManager>();
builder.Services.AddScoped<IProjectManager, ProjectManager>();
builder.Services.AddScoped<IUserManager, UserManager>();
builder.Services.AddScoped<IAdminPlatformManager, AdminPlatformManager>();
builder.Services.AddScoped<CloudStorageService>();
builder.Services.AddScoped<IAdminPlatformManager, AdminPlatformManager>();


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

        // Generating User Input
        IRepositoryRetrieval retrieval = new RetrievalRepository(ctx);
        IRepositoryPersistance persistence = new PersistanceRepository(ctx);

        var userInputFactory = new UserInputFactory(retrieval, persistence);
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

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

//first auth then auth
app.UseAuthentication();
app.UseAuthorization();

app.UseSession();

app.MapRazorPages();
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();