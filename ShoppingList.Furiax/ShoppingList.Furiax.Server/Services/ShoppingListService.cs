using ShoppingList.Furiax.Server.Data;
using ShoppingList.Furiax.Server.Models;

namespace ShoppingList.Furiax.Server.Services
{
    public class ShoppingListService : IShoppingListService
    {
        private readonly ShoppingListDbContext Context;

        public ShoppingListService(ShoppingListDbContext context)
        {
            Context = context;
        }
        public Item AddItem(Item item)
        {
            var newItem = Context.Items.Add(item);
            Context.SaveChanges();
            return newItem.Entity;
        }

        public string? DeleteItem(int id)
        {
            Item itemToDelete = Context.Items.Find(id);
            if (itemToDelete == null)
            {
                return null;
            }
            Context.Items.Remove(itemToDelete);
            Context.SaveChanges();
            return $"Item with id {id} successfully removed";
        }

        public List<Item> GetAllItems()
        {
            return Context.Items.ToList();
        }

        public Item? GetItemById(int id)
        {
            Item itemToGet = Context.Items.Find(id);
            return itemToGet == null ? null : itemToGet;
        }

        public Item UpdateItem(Item item)
        {
            Item itemToEdit = Context.Items.Find(item.Id);
            if (itemToEdit == null)
            {
                return null;
            }
            Context.Entry(itemToEdit).CurrentValues.SetValues(item);
            Context.SaveChanges();
            return itemToEdit;
        }
    }
}
