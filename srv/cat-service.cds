using {sap.capire.bookshop as my} from '../db/schema';

service CatalogService {

  /** For displaying lists of Books */
  @readonly
  entity ListOfBooks as
    projection on Books {
      *,
      genre.name      as genre,
      currency.symbol as currency,
    }
    excluding {
      descr
    };

  /** For display in details pages */
  @readonly
 @restrict: [{
  grant: ['READ'],
  to: 'bookshop_administrator',
  where: (author-ID = 107)
}]
  entity Books       as
    projection on my.Books {
      *,
      author.name as author,
      case
        when weekDay is null then title
        else '您输入的是' || weekDay
      end as headerTitle : String
    }
    excluding {
      createdBy,
      modifiedBy
    }
    where status = 'Approved'
    actions {
      @Common.SideEffects.TargetProperties: ['in/weekDay', 'in/headerTitle']
      action testWeekDay(
        @mandatory
        @assert.range
        weekDay: my.WeekDay
      ) returns Books;
    };

  @readonly
  entity WeekDays as projection on my.WeekDays;

  action submitOrder(book: Books:ID, quantity: Integer) returns {
    stock : Integer
  };
}
