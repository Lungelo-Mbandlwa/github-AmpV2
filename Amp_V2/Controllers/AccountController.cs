using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.OpenIdConnect;
using Microsoft.Owin.Security;

namespace Amp_V2.Controllers
{
    public class AccountController : Controller
    {
        public void SignIn()
        {
            //crearing all the cookies
            ExpireAllCookies();
            Session.Abandon();
            Request.Cookies.Clear();
            // Send an OpenID Connect sign-in request.
            if (!Request.IsAuthenticated)
            {
                HttpContext.GetOwinContext().Authentication.Challenge(new AuthenticationProperties { RedirectUri = "/" },
                    OpenIdConnectAuthenticationDefaults.AuthenticationType);
            }
        }

        public void SignOut()
        {
            string callbackUrl = Url.Action("LandingPage", "Account", routeValues: null, protocol: Request.Url.Scheme);

            HttpContext.GetOwinContext().Authentication.SignOut(
                new AuthenticationProperties { RedirectUri = callbackUrl },
                OpenIdConnectAuthenticationDefaults.AuthenticationType, CookieAuthenticationDefaults.AuthenticationType);

            //crearing all the cookies
            ExpireAllCookies();
            Session.Abandon();
            Request.Cookies.Clear();
        }

        public ActionResult SignOutCallback()
        {
            if (Request.IsAuthenticated)
            {
                // Redirect to home page if the user is authenticated.
                return RedirectToAction("Index", "Home");
            }

            return View();
        }

        public string GetProfilePicture(string Loginuser)
        {
            string img = "";
            string Alphabet = "";
            if (Loginuser != null && Loginuser != "")
            {
                Alphabet = Loginuser.Substring(0, 1);

                img = Alphabet.ToUpper() + ".png";
            }

            return img;
        }
        public ActionResult LandingPage()
        {
            return View();
        }
        private void ExpireAllCookies()
        {
            if (HttpContext != null)
            {
                int cookieCount = HttpContext.Request.Cookies.Count;
                for (var i = 0; i < cookieCount; i++)
                {
                    var cookie = HttpContext.Request.Cookies[i];
                    if (cookie != null)
                    {
                        var expiredCookie = new HttpCookie(cookie.Name)
                        {
                            Expires = DateTime.Now.AddDays(-1),
                            Domain = cookie.Domain
                        };
                        HttpContext.Response.Cookies.Add(expiredCookie); // overwrite it
                    }
                }

                // clear cookies server side
                HttpContext.Request.Cookies.Clear();
            }

        }
        public ActionResult ActivateUser(string Id)
        {
            return View();
        }
    }
}
