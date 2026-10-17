sap.ui.define([], function () {
  "use strict";

  return {
    submit: function (oContext) {
      const id = oContext.getProperty("ID");
      if (id == null) {
        throw new Error("Cannot submit a book without an ID");
      }

      const operation = oContext.getModel().bindContext("AdminService.submit(...)", oContext);
      operation.setParameter("ID", id);
      return operation.execute();
    }
  };
});
