using {sap.capire.bookshop as my} from '../db/schema';
@requires: 'bookshop_administrator'
@cds.server: { csrf: false }
service workflowService {
    entity Books   as projection on my.Books {
    *,
    author.name           as authorName  : String,
    genre.name            as genreName   : String,
    currency.code         as currencyCode: String,
  } actions {
        action ApproveBooks(ID: String);
        action RejectBooks(ID: String);
    }
}