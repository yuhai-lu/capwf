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
- Enter Object Page, click button **Submit Approve**
- (in VS Code simply choose _**Terminal** > Run Task > cds watch_)
- Start with your domain model, in a CDS file in `db/`

## Learn More

Learn more at [https://cap.cloud.sap](https://cap.cloud.sap).


**Resources**

[community.sap.com/t5/technology-blog-posts-by-sap/trigger-an-sap-build-process-automation-workflow-from-cap-using-the-cap-js/ba-p/14431324](https://community.sap.com/t5/technology-blog-posts-by-sap/trigger-an-sap-build-process-automation-workflow-from-cap-using-the-cap-js/ba-p/14431324)
