using ShoppingList.Furiax.Server.Models;

namespace ShoppingList.Furiax.Server.Services;

public interface IShoppingListService
{
    public List<Item> GetAllItems();
    public Item? GetItemById(int id);
    public Item AddItem(Item item);
    public Item UpdateItem(Item item);
    public string? DeleteItem(int id);
    public bool DeleteAllItems();
}
