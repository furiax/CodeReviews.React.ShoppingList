using Microsoft.EntityFrameworkCore;
using ShoppingList.Furiax.Server.Models;

namespace ShoppingList.Furiax.Server.Data;

public class ShoppingListDbContext : DbContext
{
    public ShoppingListDbContext(DbContextOptions options) : base(options) 
    { 
    }
    public DbSet<ShopList> ShopLists { get; set; }
}
