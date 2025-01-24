using System.ComponentModel.DataAnnotations;

namespace ShoppingList.Furiax.Server.Models;

public class Item
{
    [Key]
    public int Id { get; set; }
    [Required]
    public string? ItemName { get; set; } = string.Empty;
    [Required]
    public int Quantity { get; set; } = 1;
    public bool IsPicked { get; set; } = false;
}
