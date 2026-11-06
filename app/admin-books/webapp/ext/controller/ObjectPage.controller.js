sap.ui.define([
  "sap/ui/core/mvc/ControllerExtension"
], function (ControllerExtension) {
  "use strict";

  return ControllerExtension.extend("capwf.adminbooks.ext.controller.ObjectPage", {
    override: {
      onInit: function () {
        this._oView = this.base.getView();
        this._attachModelListener();
        this._oDelegate = {
          onBeforeRendering: () => {
            this._attachModelListener();

          }
        };
        this._oView.addEventDelegate(this._oDelegate, this);

      },

      onExit: function () {
        if (this._oView && this._oDelegate) {
          this._oView.removeEventDelegate(this._oDelegate, this);
        }
        if (this._oModel && this._fnPropertyChange) {
          this._oModel.detachPropertyChange(this._fnPropertyChange);
        }
      }
    },

    _attachModelListener: function () {
      const oModel = this._oView?.getModel();
      if (!oModel || (this._oModel === oModel && this._fnPropertyChange)) {
        return;
      }

      if (this._oModel && this._fnPropertyChange) {
        this._oModel.detachPropertyChange(this._fnPropertyChange);
      }

      this._oModel = oModel;
      this._fnPropertyChange = this._onPropertyChange.bind(this);
      this._oModel.attachPropertyChange(this._fnPropertyChange);
    },

    _onPropertyChange: function (oEvent) {
      
      if (oEvent.getParameters().path === "author_ID") {
        const value = oEvent.getParameters()?.value;
        this._updatePrintVisible(value === 107);
      }
      
    },

    _updatePrintVisible: function (printVisible) {
      const oContext = this._oView?.getBindingContext();
      if (!oContext) {
        return;
      }
      
      oContext.setProperty("printVisible", printVisible);
    }
  });
});
