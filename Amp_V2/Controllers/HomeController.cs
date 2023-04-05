using Amp_V2.BusinessLogic;
using Azure.Core;
using Microsoft.Graph;
using Microsoft.Kiota.Abstractions;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using static Amp_V2.ViewModel.GetUserGroups;

namespace Amp_V2.Controllers
{
    [Authorize]
    public class HomeController : Controller
    {
        TokenBL tokenBL = new TokenBL();

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }


        public ActionResult Dashboard()
        {
            if (Request.IsAuthenticated)
            {
                try
                {
                    Session["Loginuser"] = ClaimsPrincipal.Current.FindFirst("name").Value;
                    var GroupIdObjects = ClaimsPrincipal.Current.FindAll("groups");
                    Session["Email"] = ClaimsPrincipal.Current.Identity.Name;
                    Session["Token"] = tokenBL.GetAccessToken().Result;
                    if(Session["Token"].ToString() != "")
                    {
                        List<string> resultList = GetGroupsNames(Session["Token"].ToString());
                        Session["EmployeeCode"] = GetOnPremisesAccountName(Session["Token"].ToString());
                        List<string> MyGroupNames = GetGroupNameByGroupId(Session["Token"].ToString(), GroupIdObjects);
                    }                 
                }
                catch (Exception ex)
                {
                    ex.Message.ToString();
                }
            }
            return View();
        }

        public ActionResult ErrorPage()
        {
            return View();
        }
        public List<string> GetGroupsNames(string Token)
        {
            List<string> resultList = new List<string>();
            if (HttpContext.User.Identity.IsAuthenticated)
            {
                ClaimsPrincipal userClaims = ClaimsPrincipal.Current;
                if (userClaims != null && userClaims.Claims != null && userClaims.Claims.Count() > 0)
                {
                    string userObjectId = ClaimsPrincipal.Current.FindFirst("http://schemas.microsoft.com/identity/claims/objectidentifier").Value;
                    HttpClient httpClient = new HttpClient();
                    httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Token);
                    HttpResponseMessage response = httpClient.GetAsync($"https://graph.microsoft.com/v1.0/users/{userObjectId}?$expand=memberOf").Result;
                   
                    if (response.IsSuccessStatusCode)
                    {
                        string userJson = response.Content.ReadAsStringAsync().Result;
                        JObject jsonObject = JObject.Parse(userJson);

                        JArray usersArray = (JArray)jsonObject["memberOf"];
                        JArray jsonObjectArray = new JArray();
                        foreach (JObject item in usersArray)
                            jsonObjectArray.Add(item);
                        foreach (JObject item in jsonObjectArray)
                        {
                            resultList.Add((string)item["displayName"].ToString());
                        }
                    }
                }
            }

            return resultList;
        }

        public List<string> GetGroupNameByGroupId(string Token, IEnumerable<Claim> GroupIds)
        {
            List<string> resultList = new List<string>();
            if (HttpContext.User.Identity.IsAuthenticated)
            {
                ClaimsPrincipal userClaims = ClaimsPrincipal.Current;
                if (userClaims != null && userClaims.Claims != null && userClaims.Claims.Count() > 0)
                {
                   
                    HttpClient httpClient = new HttpClient();
                    httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Token);
                    foreach(var groupObject in GroupIds)
                    {                        
                        HttpResponseMessage response = httpClient.GetAsync($"https://graph.microsoft.com/v1.0/groups/{groupObject.Value}?$expand=memberOf").Result;
                        if (response.IsSuccessStatusCode)
                        {
                            string userJson = response.Content.ReadAsStringAsync().Result;
                            JObject jsonObject = JObject.Parse(userJson);

                            string GroupName = (string)jsonObject["displayName"];
                            resultList.Add(GroupName);
                        }
                    }
                                   
                }
            }

            return resultList;
        }
    


        public string GetOnPremisesAccountName(string Token)
        {
           string Name =  "";
            if (HttpContext.User.Identity.IsAuthenticated)
            {
                ClaimsPrincipal userClaims = ClaimsPrincipal.Current;
                if (userClaims != null && userClaims.Claims != null && userClaims.Claims.Count() > 0)
                {
                    string userObjectId = ClaimsPrincipal.Current.FindFirst("http://schemas.microsoft.com/identity/claims/objectidentifier").Value;
                    HttpClient httpClient = new HttpClient();
                    httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Token);
                    HttpResponseMessage response = httpClient.GetAsync($"https://graph.microsoft.com/v1.0/users/{userObjectId}?$select=onPremisesSamAccountName").Result;

                    if (response.IsSuccessStatusCode)
                    {
                        string userJson = response.Content.ReadAsStringAsync().Result;
                        JObject jsonObject = JObject.Parse(userJson);
                        Name = (string)jsonObject["onPremisesSamAccountName"];
                    }
                }
            }

            return Name;
        }


        public bool CheckIfUserBelongsToGroup(List<string> groupsUserHasAccessTo, string groupName)
        {
            bool result = false;
            try
            {
                foreach (var userGroups in groupsUserHasAccessTo)
                {
                    if(userGroups.Trim() == groupName.Trim())
                    {
                        result = true;
                    }
                }
            }
            catch(Exception ex)
            {
                string msg = ex.Message;
            }
            return result;
          
        }


    }
}