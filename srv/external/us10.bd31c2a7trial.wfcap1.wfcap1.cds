/* checksum : b0d6870d1e7718e81ed3d926d571e31f */
namespace us10.bd31c2a7trial.wfcap1;

/** DO NOT EDIT. THIS IS A GENERATED SERVICE THAT WILL BE OVERRIDDEN ON NEXT IMPORT. */
@protocol : 'none'
@bpm.process : 'us10.bd31c2a7trial.wfcap1.wfcap1'
service Wfcap1Service {
  type ProcessInputs {
    author : String;
    currency : String;
    desc : String;
    id : String not null;
    price : DecimalFloat;
    stock : DecimalFloat;
    title : String;
  };

  type ProcessOutputs { };

  type ProcessAttribute {
    id : String not null;
    label : String not null;
    value : String;
    type : String not null;
  };

  type ProcessAttributes : many ProcessAttribute;

  type ProcessInstance {
    definitionId : String;
    definitionVersion : String;
    id : String;
    status : String;
    startedAt : String;
    startedBy : String;
  };

  type ProcessInstances : many ProcessInstance;

  action start(
    inputs : ProcessInputs not null
  );

  function getAttributes(
    processInstanceId : String not null
  ) returns ProcessAttributes;

  function getOutputs(
    processInstanceId : String not null
  ) returns ProcessOutputs;

  function getInstancesByBusinessKey(
    businessKey : String not null,
    status : many String
  ) returns ProcessInstances;

  action suspend(
    businessKey : String not null,
    cascade : Boolean
  );

  action resume(
    businessKey : String not null,
    cascade : Boolean
  );

  action cancel(
    businessKey : String not null,
    cascade : Boolean
  );
};

