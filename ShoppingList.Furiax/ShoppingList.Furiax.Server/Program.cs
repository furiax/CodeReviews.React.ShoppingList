using Microsoft.EntityFrameworkCore;
using ShoppingList.Furiax.Server.Data;
using ShoppingList.Furiax.Server.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers();
builder.Services.AddDbContext<ShoppingListDbContext>(opt =>
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddScoped<IShoppingListService, ShoppingListService>();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapFallbackToFile("/index.html");
app.MapControllers();

app.Run();

