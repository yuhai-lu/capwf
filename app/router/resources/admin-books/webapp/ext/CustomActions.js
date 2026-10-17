sap.ui.define([], function () {
  "use strict";

  return {
    request_trigger_wf: function (oContext) {
      const id = oContext.getProperty("ID");
      if (id == null) {
        throw new Error("Cannot request a workflow trigger for a book without an ID");
      }

      const operation = oContext.getModel().bindContext("AdminService.request_trigger_wf(...)", oContext);
      operation.setParameter("ID", id);
      return operation.execute();
    },

    annotation_trigger_wf: function (oContext) {
      const operation = oContext.getModel().bindContext("AdminService.annotation_trigger_wf(...)", oContext);
      return operation.execute();
    }
  };
});
