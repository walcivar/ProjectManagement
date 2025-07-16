namespace ProjectManagement.Core.Models;

public class AuditLog
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public string EntityType { get; set; } = string.Empty;
    public int EntityId { get; set; }
    public string Action { get; set; } = string.Empty;
    public string OldValues { get; set; } = string.Empty;
    public string NewValues { get; set; } = string.Empty;
    public DateTime Timestamp { get; set; }
    public string IpAddress { get; set; } = string.Empty;
    
    // Navigation properties
    public User User { get; set; } = null!;
}
