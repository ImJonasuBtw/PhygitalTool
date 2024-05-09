using Google.Apis.Auth.OAuth2;
using Newtonsoft.Json;

namespace PhygitalTool.Web.Services;
using Google.Cloud.Storage.V1;

public class CloudStorageService
{
    private readonly StorageClient _storageClient;
    private readonly string _bucketName;


    public CloudStorageService(IConfiguration configuration)
    {
        _bucketName = configuration["GCloud:Storage:BucketName"];
        
        var credentialsConfig = configuration.GetSection("GCloud:Credentials");
        if (!credentialsConfig.Exists())
        {
            throw new InvalidOperationException("Credentials section missing in configuration.");
        }
        
        var credentialsJson = credentialsConfig.Get<Dictionary<string, string>>();

        if (credentialsJson == null || !credentialsJson.Any())
        {
            throw new ArgumentException("Credentials JSON is empty or not correctly formatted.");
        }

        var credentialJsonString = JsonConvert.SerializeObject(credentialsJson);
        var credential = GoogleCredential.FromJson(credentialJsonString);
        
        _storageClient = StorageClient.Create(credential);
    }

    public string UploadFileToBucket(MemoryStream memoryStream, string contentType)
    {
        var objectName = Guid.NewGuid().ToString();
        
        var storageObject = _storageClient.UploadObject(_bucketName, objectName, contentType, memoryStream);
        
        return storageObject.MediaLink;
    }
    
}
