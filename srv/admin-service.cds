using {sap.capire.bookshop as my} from '../db/schema';
service AdminService {
  entity Authors as projection on my.Authors;
  @bpm.process.start           : {
    id    : 'us10.bd31c2a7trial.wfcap1.wfcap1',
    on    : 'submit',
    inputs: [
      { path: $self.idStr,        as: 'id'       },
      { path: $self.authorName,   as: 'author'   },
      $self.title,
      $self.descr,
      { path: $self.genreName,    as: 'genre'    },
      $self.stock,
      $self.price,
      { path: $self.currencyCode, as: 'currency' }
    ]
  }
  @bpm.process.cancel #one     : {on: 'DELETE'}
  @bpm.process.businessKey #one: (title)
  @bpm.process.businessKey     : (ID)
  entity Books   as projection on my.Books {
    *,
    cast(ID as String)    as idStr       : String,
    author.name           as authorName  : String,
    genre.name            as genreName   : String,
    currency.code         as currencyCode: String
  }
  actions {
    action submit();
  };
  entity Genres  as projection on my.Genres;
}