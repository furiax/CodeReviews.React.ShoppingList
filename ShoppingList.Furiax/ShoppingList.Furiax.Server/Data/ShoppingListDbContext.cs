using Microsoft.EntityFrameworkCore;

namespace ShoppingList.Furiax.Server.Data
{
    public class ShoppingListDbContext : DbContext
    {
        public ShoppingListDbContext(DbContextOptions options) : base(options) 
        { 
        }
    }
}
