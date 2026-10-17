using {sap.capire.bookshop as my} from '../db/schema';
service AdminService {
  entity Authors as projection on my.Authors;
  @bpm.process.start: {
    id: 'us10.bd31c2a7trial.wfcap1.wfcap1',
    on: 'annotation_trigger_wf',
    inputs: [
      { path: $self.idStr, as: 'id' },
      { path: $self.authorName, as: 'author' },
      $self.title,
      { path: $self.descr, as: 'desc' },
      $self.stock,
      $self.price,
      { path: $self.currencyCode, as: 'currency' }
    ]
  }
  @bpm.process.businessKey: (ID)
  entity Books   as projection on my.Books {
    *,
    cast(ID as String)    as idStr       : String,
    author.name           as authorName  : String,
    genre.name            as genreName   : String,
    currency.code         as currencyCode: String
  } actions {
    action ApproveBooks(ID: Integer);
    action RejectBooks(ID: Integer);
    action request_trigger_wf(ID: Integer);
    action annotation_trigger_wf();
  };
  entity Genres  as projection on my.Genres;
}