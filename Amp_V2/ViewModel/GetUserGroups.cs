using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Amp_V2.ViewModel
{
    public class GetUserGroups
    {

        public class Rootobject
        {
            public string odatacontext { get; set; }
            public object[] businessPhones { get; set; }
            public string displayName { get; set; }
            public string givenName { get; set; }
            public string jobTitle { get; set; }
            public string mail { get; set; }
            public object mobilePhone { get; set; }
            public string officeLocation { get; set; }
            public object preferredLanguage { get; set; }
            public string surname { get; set; }
            public string userPrincipalName { get; set; }
            public string id { get; set; }
            public Memberof[] memberOf { get; set; }
        }

        public class Memberof
        {
            public string odatatype { get; set; }
            public string id { get; set; }
            public object deletedDateTime { get; set; }
            public object classification { get; set; }
            public DateTime? createdDateTime { get; set; }
            public object[] creationOptions { get; set; }
            public string description { get; set; }
            public string displayName { get; set; }
            public object expirationDateTime { get; set; }
            public string[] groupTypes { get; set; }
            public object isAssignableToRole { get; set; }
            public string mail { get; set; }
            public bool mailEnabled { get; set; }
            public string mailNickname { get; set; }
            public string membershipRule { get; set; }
            public string membershipRuleProcessingState { get; set; }
            public string onPremisesDomainName { get; set; }
            public DateTime? onPremisesLastSyncDateTime { get; set; }
            public string onPremisesNetBiosName { get; set; }
            public string onPremisesSamAccountName { get; set; }
            public string onPremisesSecurityIdentifier { get; set; }
            public bool? onPremisesSyncEnabled { get; set; }
            public object preferredDataLocation { get; set; }
            public object preferredLanguage { get; set; }
            public string[] proxyAddresses { get; set; }
            public DateTime? renewedDateTime { get; set; }
            public object[] resourceBehaviorOptions { get; set; }
            public object[] resourceProvisioningOptions { get; set; }
            public bool securityEnabled { get; set; }
            public string securityIdentifier { get; set; }
            public object theme { get; set; }
            public object visibility { get; set; }
            public object[] onPremisesProvisioningErrors { get; set; }
        }

    }
}