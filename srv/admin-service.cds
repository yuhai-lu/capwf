using {sap.capire.bookshop as my} from '../db/schema';
@requires: 'bookshop_administrator'
service AdminService {
  entity Authors as projection on my.Authors;
  @bpm.process.start: {
    id: 'us10.bd31c2a7trial.capwf3.capwf3',
    on: 'annotation_trigger_wf',
    inputs: [
      { path: ID, as: 'id' },
      { path: $self.authorName, as: 'author' },
      $self.title,
      { path: $self.descr, as: 'desc' },
      { path: $self.currencyCode, as: 'currency' }
    ]
  }
  @bpm.process.businessKey: (ID)
  entity Books   as projection on my.Books {
    *,
    author.name           as authorName  : String,
    genre.name            as genreName   : String,
    currency.code         as currencyCode: String,
  } actions {
    action request_trigger_wf(ID: String);
    action annotation_trigger_wf();
  };
  entity Genres  as projection on my.Genres;
}