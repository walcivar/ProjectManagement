namespace ProjectManagement.Core.Models;

public class Project
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public int ClientId { get; set; }
    public int ManagerId { get; set; }
    public string Status { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    
    // Navigation properties
    public Client Client { get; set; } = null!;
    public User Manager { get; set; } = null!;
    public ICollection<Task> Tasks { get; set; } = new List<Task>();
}
