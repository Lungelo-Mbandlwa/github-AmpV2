using System.Web;
using System.Web.Optimization;

namespace Amp_V2
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at https://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css"));
            // Sweetalert2
            bundles.Add(new ScriptBundle("~/bundles/sweetAlert2/js").Include(
                      "~/Scripts/sweetalert2.all.min.js",
                      "~/Scripts/sweetalert2.min.js"
                      ));
            // Sweetalert2 style
            bundles.Add(new StyleBundle("~/bundles/sweetAlert2/css").Include(
                      "~/Content/sweetalert2.min.css"));

            // Datepicker style
            bundles.Add(new StyleBundle("~/bundles/datepicker/css").Include(
                      "~/Content/bootstrap-datepicker3.min.css"));
        }
    }
}
