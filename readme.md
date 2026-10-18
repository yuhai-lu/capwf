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


