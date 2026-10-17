Purpose:

Test Request trigger workflow

Demo Steps

```
git clone https://github.com/yuhai-lyu/capwf
git checkout request_trigger_wf
cds login -a https://api.cf.us10-001.hana.ondemand.com -u yuhai_lyu@foxmail.com
cds bind ProcessService -2 cap-wf-spa
cds watch --profile hybrid
```

* 检查URL [Workflow Log Palge Link](https://bd31c2a7trial.us10.build.cloud.sap/monitoring/workflow-instances) record how many workflow instances there.
* Back to Page [Link](http://localhost:4004/fiori-apps.html#Books-manage&/Books(207))
* click button **Submit**
* Check [Workflow Log Palge Link](https://bd31c2a7trial.us10.build.cloud.sap/monitoring/workflow-instances) there should be one more Workflow Instance.
* Click the new instance, the check steps
* Enter Inbox, Approve
* Check email in [QQ Mail Box](https://wx.mail.qq.com/) for notice mail
* Check source code



```
     const { executeHttpRequest } = require('@sap-cloud-sdk/http-client');
      console.log('executeHttpRequest is successfult got')
      const { ID } = req.data
      const book = await SELECT.one.from(Books).where({ ID })
        .columns('authorName', 'currencyCode', 'descr', 'idStr', 'price', 'stock', 'title')
      if (!book) return req.error(404, `Book #${ID} does not exist`)
      console.log('Submitting book to workflow engine:', book)
      const res = await executeHttpRequest(
        { destinationName: 'process_automation_cap2bpa' },
        {
          method: 'POST',
          url: '/v1/workflow-instances',
          data: {
            definitionId: 'us10.bd31c2a7trial.wfcap1.wfcap1',
            context: {
              author: book.authorName,
              currency: book.currencyCode,
              desc: book.descr,
              id: book.idStr,
              price: book.price,
              stock: book.stock,
              title: book.title
            }
        }
      },
      { fetchCsrfToken: false }
      );
      console.log('Workflow engine response:', res)
      return res;
```

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
