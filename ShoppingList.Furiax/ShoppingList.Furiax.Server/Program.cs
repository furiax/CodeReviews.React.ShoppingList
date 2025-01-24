using Microsoft.EntityFrameworkCore;
using ShoppingList.Furiax.Server.Data;
using ShoppingList.Furiax.Server.Services;

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(opt =>
    {
        opt.AddPolicy(name: MyAllowSpecificOrigins, policy =>
        {
            policy.WithOrigins("https://localhost:58045")
            .AllowAnyMethod()
            .AllowAnyHeader();
        });}
);
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers();
builder.Services.AddDbContext<ShoppingListDbContext>(opt =>
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddScoped<IShoppingListService, ShoppingListService>();


var app = builder.Build();

app.UseCors(MyAllowSpecificOrigins);
app.UseDefaultFiles();
app.UseStaticFiles();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.MapFallbackToFile("/index.html");
app.MapControllers();

app.Run();

