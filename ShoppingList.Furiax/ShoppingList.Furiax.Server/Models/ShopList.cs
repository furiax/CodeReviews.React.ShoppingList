using System.ComponentModel.DataAnnotations;

namespace ShoppingList.Furiax.Server.Models
{
    public class ShopList
    {
        [Key]
        public int ListId { get; set; }
        [Required]
        public string Item { get; set; } = string.Empty;
        [Required]
        public int Quantity { get; set; } = 1;
        public bool IsPicked { get; set; } = false;
    }
}
