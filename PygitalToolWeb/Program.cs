using Microsoft.EntityFrameworkCore;
using PhygitalTool.BL;
using PhygitalTool.DAL;
using PhygitalTool.DAL.EF;

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

builder.Services.AddDistributedMemoryCache(); // Adds a default in-memory implementation of IDistributedCache
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(20); // Set session timeout duration
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true; // Make the session cookie essential
});

builder.Services.AddControllersWithViews();


var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

using (var scope = app.Services.CreateScope())
{
    PhygitalToolDbContext ctx = scope.ServiceProvider.GetRequiredService<PhygitalToolDbContext>();
    bool isDatabaseCreated = ctx.CreateDataBase(true);

    if (isDatabaseCreated)
    {
        DataSeeder.Seed(ctx);
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

app.UseAuthorization();

app.UseSession();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();