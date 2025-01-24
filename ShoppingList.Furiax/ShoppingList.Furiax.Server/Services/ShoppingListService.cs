using ShoppingList.Furiax.Server.Data;
using ShoppingList.Furiax.Server.Models;

namespace ShoppingList.Furiax.Server.Services
{
    public class ShoppingListService : IShoppingListService
    {
        private readonly ShoppingListDbContext _context;

        public ShoppingListService(ShoppingListDbContext context)
        {
            _context = context;
        }
        public Item AddItem(Item item)
        {
            throw new NotImplementedException();
        }

        public Item? DeleteItem(int id)
        {
            throw new NotImplementedException();
        }

        public List<Item> GetAllItems()
        {
            throw new NotImplementedException();
        }

        public Item? GetItemById(int id)
        {
            throw new NotImplementedException();
        }

        public Item UpdateItem(Item item)
        {
            throw new NotImplementedException();
        }
    }
}
