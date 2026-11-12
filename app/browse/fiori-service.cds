using CatalogService from '../../srv/cat-service';

////////////////////////////////////////////////////////////////////////////
//
//	Books Object Page
//
annotate CatalogService.Books with @(UI : {
  HeaderInfo        : {
    TypeName        : '{i18n>Book}',
    TypeNamePlural  : '{i18n>Books}',
    Title           : {Value : headerTitle},
    Description     : {Value : author}
  },
  Identification    : [
    {Value: title},
    {
      $Type: 'UI.DataFieldForAction',
      Action: 'CatalogService.testWeekDay',
      Label: '{i18n>TestWeekDay}'
    }
  ],
  HeaderFacets      : [{
    $Type  : 'UI.ReferenceFacet',
    Label  : '{i18n>Description}',
    Target : '@UI.FieldGroup#Descr'
  }, ],
  Facets            : [{
    $Type  : 'UI.ReferenceFacet',
    Label  : '{i18n>Details}',
    Target : '@UI.FieldGroup#Price'
  }, ],
  FieldGroup #Descr : {Data : [{Value : descr}, ]},
  FieldGroup #Price : {Data : [
    {Value : price},
    {
      Value : currency.symbol,
      Label : '{i18n>Currency}'
    },
  ]},
});

annotate CatalogService.Books actions {
  testWeekDay(
    weekDay @(
      title: 'Week Day',
      Common.ValueListWithFixedValues: true,
      Common.ValueList: {
        CollectionPath: 'WeekDays',
        PresentationVariantQualifier: 'WeekDayOrder',
        Parameters: [{
          $Type: 'Common.ValueListParameterInOut',
          LocalDataProperty: weekDay,
          ValueListProperty: 'code'
        }]
      }
    )
  );
};

annotate CatalogService.WeekDays with @UI.PresentationVariant #WeekDayOrder: {
  SortOrder: [{Property: order, Descending: false}]
};


////////////////////////////////////////////////////////////////////////////
//
//	Books List Page
//
annotate CatalogService.Books with @(UI : {
  SelectionFields : [
    ID,
    price,
    currency_code
  ],
  LineItem        : [
    {
      Value : ID,
      Label : '{i18n>Title}'
    },
    {
      Value : author,
      Label : '{i18n>Author}'
    },
    {Value : genre.name},
    {Value : price},
    {Value : currency.symbol},
  ]
});
