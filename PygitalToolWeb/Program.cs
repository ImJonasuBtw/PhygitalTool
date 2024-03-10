using BL;
using DAL;
using DAL.EF;
using Microsoft.EntityFrameworkCore;

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
builder.Services.AddControllersWithViews();


var app = builder.Build();


using (var scope = app.Services.CreateScope())
{
    PhygitalToolDbContext ctx = scope.ServiceProvider.GetRequiredService<PhygitalToolDbContext>();
    bool isDatabaseCreated = ctx.CreateDataBase(true);

    if (isDatabaseCreated)
    {
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

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();