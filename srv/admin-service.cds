using {sap.capire.bookshop as my} from '../db/schema';
service AdminService {
  entity Authors as projection on my.Authors;
  entity Books   as projection on my.Books {
    *,
    cast(ID as String)    as idStr       : String,
    author.name           as authorName  : String,
    genre.name            as genreName   : String,
    currency.code         as currencyCode: String
  } actions {
    action ApproveBooks(ID: Integer);
    action RejectBooks(ID: Integer);
    action submit(ID: Integer);
  };
  entity Genres  as projection on my.Genres;
}