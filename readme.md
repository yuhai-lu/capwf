# Purpose:
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


# Getting Started

Welcome to your new CAP project.

It contains these folders and files, following our recommended project layout:

| File or Folder | Purpose                              |
| -------------- | ------------------------------------ |
| `app/`       | content for UI frontends goes here   |
| `db/`        | your domain models and data go here  |
| `srv/`       | your service models and code go here |
| `readme.md`  | this getting started guide           |

## Next Steps

- Deployment is intentionally unauthenticated: the Launchpad, admin UI, and OData APIs are publicly accessible.
- cds login -a   ***btp endpoint*** -u ***User***
- cds bind ProcessService -2 <service-instance></service>***Service Instance***
- Open a new terminal and run cds watch --profile hybrid
- Open Page http://localhost:4004/fiori-apps.html#Books-manage
- Enter Object Page, click **Request Trigger Workflow** or **Trigger Workflow via Annotation**
- (in VS Code simply choose _**Terminal** > Run Task > cds watch_)
- Start with your domain model, in a CDS file in `db/`

## Learn More

Learn more at [https://cap.cloud.sap](https://cap.cloud.sap).

**Resources**

[community.sap.com/t5/technology-blog-posts-by-sap/trigger-an-sap-build-process-automation-workflow-from-cap-using-the-cap-js/ba-p/14431324](https://community.sap.com/t5/technology-blog-posts-by-sap/trigger-an-sap-build-process-automation-workflow-from-cap-using-the-cap-js/ba-p/14431324)
