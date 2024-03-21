using System.Drawing;

namespace PhygitalTool.Domain.Projects;

public class Style
{
    // Prop
    public int StyleId { get; set; }
    public string Logo { get; set; }
    public Color BackgroundColor { get; set; }
    public Color PrimaryColor { get; set; }
    public Color SecondaryColor { get; set; }
    public Color accentColor { get; set; }
    public string Font { get; set; }
}