using Microsoft.AspNetCore.Mvc;
using ShoppingList.Furiax.Server.Models;
using ShoppingList.Furiax.Server.Services;
using System.Net.WebSockets;

namespace ShoppingList.Furiax.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ShoppingListController(IShoppingListService shoppingService) : Controller
{
    private readonly IShoppingListService _shopService = shoppingService;

    [HttpGet]
    public ActionResult<List<Item>>GetAllItems()
    {
        return Ok(_shopService.GetAllItems());
    }
    [HttpGet("{id}")]
    public ActionResult<Item>GetItemById(int id)
    {
        var result = _shopService.GetItemById(id);
        if (result == null)
        {
            return NotFound();
        }
        return Ok(result);
    }
    [HttpPost]
    public ActionResult<Item> AddItem(Item item)
    {
        return Ok(_shopService.AddItem(item));
    }
    [HttpPut]
    public ActionResult<Item> UpdateItem(Item item)
    {
        var result = _shopService.UpdateItem(item);
        if (result == null)
        {
            return NotFound();
        }
        return Ok(result);
    }
    [HttpDelete("{id}")]
    public ActionResult DeleteItem(int id)
    {
        var result = _shopService.DeleteItem(id);
        if (result == null)
        {
            return NotFound();
        }
        return Ok(result);
    }
}
