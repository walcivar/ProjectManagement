namespace ProjectManagement.Core.Models;

public class Attachment
{
    public int Id { get; set; }
    public int TaskId { get; set; }
    public string FileName { get; set; } = string.Empty;
    public string FileType { get; set; } = string.Empty;
    public string FilePath { get; set; } = string.Empty;
    public int FileSize { get; set; }
    public DateTime UploadedAt { get; set; }
    public int UploadedById { get; set; }
    
    // Navigation properties
    public Task Task { get; set; } = null!;
    public User UploadedBy { get; set; } = null!;
}
