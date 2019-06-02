using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace reactchat.Models
{
    public class ChattingContext : DbContext
    {
        public ChattingContext(DbContextOptions<ChattingContext> options)
            : base(options)
        { }

        public DbSet<UserDetails> Users { get; set; }
    }
}
