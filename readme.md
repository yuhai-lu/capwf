# Purpose
CAP -> BPA Workflow
BPA Workflow -> CAP
cds

Excel to be done later

# Steps
1. Check HANA status [link](https://bd31c2a7trial.hana-tooling.ingress.orchestration.prod-us10.hanacloud.ondemand.com/)
2. Trigger WF in WF: Click [link](https://bd31c2a7trial-dev-capwf.cfapps.us10-001.hana.ondemand.com/fiori-apps.html#Books-manage)
   Click one book into object page
3. Click button **Trigger Workflow via Annotation**
4. Check the Workflow created [link](https://bd31c2a7trial.us10.build.cloud.sap/monitoring/workflow-instances?~status=ERRONEOUS,RUNNING,SUSPENDED&~type=process)
5. Inter [Inbox](https://bd31c2a7trial.us10.process-automation.build.cloud.sap/comsapspaprocessautomation.comsapspainbox/inbox.html) to check approvement
6. Approve or Reject.
7. Check [UI](https://bd31c2a7trial-dev-capwf.cfapps.us10-001.hana.ondemand.com/fiori-apps.html#Books-manage), the status is updated.

## Authentication and authorization

The deployed approuter uses the SAP BTP XSUAA login flow and redirects unauthenticated users to the login page of the subaccount's configured identity provider. It does not collect BTP passwords in the application.

`AdminService` requires the `bookshop_administrator` role. The XSUAA descriptor defines the `Bookshop Administrator` role collection and includes the `bookshop_administrator` role template. After deployment, assign this role collection to the users who should access the administration UI in the BTP cockpit. Users without the role can sign in but cannot access `AdminService`.

The XSUAA descriptor allows the approuter OAuth callback at `https://bd31c2a7trial-dev-capwf.cfapps.us10-001.hana.ondemand.com/login/callback`. If the deployed approuter uses a different host, update `oauth2-configuration.redirect-uris` in `xs-security.json` to the exact `redirect_uri` sent by the approuter before deploying.

The approuter's `srv-api` destination forwards the authenticated user's XSUAA token to CAP so `AdminService` can enforce its role. The current `fiori-apps.html` uses the SAPUI5 sandbox bootstrap, whose shell user is a mock (`Default User`) and does not display the authenticated BTP identity.
