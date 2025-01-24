﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using ShoppingList.Furiax.Server.Data;

#nullable disable

namespace ShoppingList.Furiax.Server.Migrations
{
    [DbContext(typeof(ShoppingListDbContext))]
    partial class ShoppingListDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "9.0.1");

            modelBuilder.Entity("ShoppingList.Furiax.Server.Models.ShopList", b =>
                {
                    b.Property<int>("ListId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<bool>("IsPicked")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Item")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("Quantity")
                        .HasColumnType("INTEGER");

                    b.HasKey("ListId");

                    b.ToTable("ShopLists");
                });
#pragma warning restore 612, 618
        }
    }
}
