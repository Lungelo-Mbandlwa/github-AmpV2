using Microsoft.Identity.Client;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace Amp_V2.BusinessLogic
{
    public class TokenBL
    {
        private static string clientId = "bb69a56e-8607-403a-8291-43dc553df511";
        private static string aadInstance = "https://login.microsoftonline.com/{0}/v2.0";
        private static string tenantId = ConfigurationManager.AppSettings["ida:TenantId"];
        private static string resource = "https://graph.microsoft.com/.default";
        private static string appKey = "IC_8Q~8tC-xMcF9JABPhWF6a7TPHfzWmURUXGbgW";
        private static string authority = String.Format(CultureInfo.InvariantCulture, aadInstance, "ccisa.onmicrosoft.com");
        public async Task<string> GetAccessToken()
        {
            try
            {
                var _client = ConfidentialClientApplicationBuilder.Create(clientId).WithAuthority(authority).WithClientSecret(appKey).WithRedirectUri("https://localhost:44318/Home/Dashboard").Build();

                var authResult = _client.AcquireTokenForClient(new string[] { resource });
                var accessToken = authResult.ExecuteAsync().Result.AccessToken;
                return accessToken;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}