using PhygitalTool.Domain.FlowPackage;

namespace PhygitalTool.Web.Models;

public class ProjectDataResponseModel
{
    public IEnumerable<UserInput> UserInputs { get; set; }
}