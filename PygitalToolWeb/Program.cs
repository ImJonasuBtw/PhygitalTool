using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using PhygitalTool.BL;
using PhygitalTool.BL.Users;
using PhygitalTool.DAL;
using PhygitalTool.DAL.EF;
using PhygitalTool.Domain.Platform;

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
        RoleCreation(roleManager);
        DataSeeder.Seed(ctx, userManager);
        Console.Write("Data Seeded");
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

void RoleCreation(RoleManager<IdentityRole> roleManager)
{
    const string manager = "Manager";
    roleManager.CreateAsync(new IdentityRole(manager)).Wait();
    
    const string Supervisor = "Supervisor";
    roleManager.CreateAsync(new IdentityRole(Supervisor)).Wait();
}