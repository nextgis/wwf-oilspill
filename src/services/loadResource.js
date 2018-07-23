import NgwConnector from '../NgwConnector/NgwConnector';

var _connector;

export var getConnector = function (options) {
  _connector = new NgwConnector(options);
  return _connector;
};

// Fake connector for test only

// var DELAY = 100;
// export var getConnector = function () {
//   var connector = function () {

//   }

//   connector.prototype.connect = function (id, callback) {
//     return setTimeout(function () {
//       callback({
//         'resource': {
//           'id': 176,
//           'cls': 'vector_layer',
//           'parent': {
//             'id': 170,
//             'parent': {
//               'id': 0
//             }
//           },
//           'owner_user': {
//             'id': 8
//           },
//           'permissions': [],
//           'keyname': null,
//           'display_name': '\u0427\u0421-2',
//           'description': null,
//           'children': true,
//           'interfaces': ['IFeatureLayer', 'IWritableFeatureLayer', 'IBboxLayer'],
//           'scopes': ['resource', 'datastruct', 'data', 'metadata']
//         },
//         'feature_layer': {
//           'fields': [{
//             'id': 370,
//             'keyname': 'lat',
//             'datatype': 'REAL',
//             'typemod': null,
//             'display_name': '\u0428\u0438\u0440\u043e\u0442\u0430',
//             'label_field': false,
//             'grid_visibility': true
//           }, {
//             'id': 371,
//             'keyname': 'lon',
//             'datatype': 'REAL',
//             'typemod': null,
//             'display_name': '\u0414\u043e\u043b\u0433\u043e\u0442\u0430',
//             'label_field': false,
//             'grid_visibility': true
//           }, {
//             'id': 372,
//             'keyname': 'date',
//             'datatype': 'STRING',
//             'typemod': null,
//             'display_name': '\u0414\u0430\u0442\u0430',
//             'label_field': false,
//             'grid_visibility': true
//           }, {
//             'id': 373,
//             'keyname': 'name',
//             'datatype': 'STRING',
//             'typemod': null,
//             'display_name': '\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435',
//             'label_field': false,
//             'grid_visibility': true
//           }, {
//             'id': 374,
//             'keyname': 'geo',
//             'datatype': 'STRING',
//             'typemod': null,
//             'display_name': '\u0413\u0435\u043e\u0433\u0440\u0430\u0444\u0438\u0447\u0435\u0441\u043a\u0430\u044f \u043f\u0440\u0438\u0432\u044f\u0437\u043a\u0430',
//             'label_field': false,
//             'grid_visibility': true
//           }, {
//             'id': 375,
//             'keyname': 'descript',
//             'datatype': 'STRING',
//             'typemod': null,
//             'display_name': '\u041e\u043f\u0438\u0441\u0430\u043d\u0438\u0435',
//             'label_field': false,
//             'grid_visibility': true
//           }, {
//             'id': 376,
//             'keyname': 'num',
//             'datatype': 'STRING',
//             'typemod': null,
//             'display_name': '\u041d\u043e\u043c\u0435\u0440',
//             'label_field': false,
//             'grid_visibility': true
//           }, {
//             'id': 377,
//             'keyname': 'region',
//             'datatype': 'STRING',
//             'typemod': null,
//             'display_name': '\u0420\u0435\u0433\u0438\u043e\u043d',
//             'label_field': false,
//             'grid_visibility': true
//           }, {
//             'id': 378,
//             'keyname': 'type',
//             'datatype': 'STRING',
//             'typemod': null,
//             'display_name': '\u0422\u0438\u043f \u0441\u043e\u0431\u044b\u0442\u0438\u044f',
//             'label_field': false,
//             'grid_visibility': true
//           }]
//         },
//         'resmeta': {
//           'items': {}
//         },
//         'vector_layer': {
//           'srs': {
//             'id': 3857
//           },
//           'geometry_type': 'POINT'
//         }
//       });
//     }, DELAY);
//   }

//   connector.prototype.geojson = function (id, callback) {
//     setTimeout(function () {
//       callback({
//         'crs': {
//           'type': 'name',
//           'properties': {
//             'name': 'EPSG:3857'
//           }
//         },
//         'type': 'FeatureCollection',
//         'features': [{
//           'geometry': {
//             'type': 'Point',
//             'coordinates': [8122674.9995151665, 9637124.930576239]
//           },
//           'type': 'Feature',
//           'properties': {
//             'name': 'Газпромнефть',
//             'descript': '2017.10.13. По требованию прокуратуры "Газпромнефть - Ноябрьскнефтегаз" оштрафована за ущерб от выявленных ранее разливов нефти ',
//             'region': 'ЯНАО',
//             'lon': 72.967231,
//             'geo': 'ЯНАО, Надымский район, Сугмутское месторождение',
//             'lat': 65.108938,
//             'num': '2.1. ',
//             'date': '2017-Q4',
//             'type': 'аварийная ситуация'
//           },
//           'id': 1
//         }, {
//           'geometry': {
//             'type': 'Point',
//             'coordinates': [8698857.002816286, 8919021.7467057]
//           },
//           'type': 'Feature',
//           'properties': {
//             'name': 'Газпромнефть',
//             'descript': '2017.11.03. Прокуратура сообщила о выполнении "Газпромнефть - Ноябрьскнефтегаз" требования о получении разрешения на эксплуатацию трубопроводов ',
//             'region': 'ХМАО-Югра',
//             'lon': 78.143162,
//             'geo': 'ХМАО-Югра,  Нижневартовский район, Вынгапуровское месторождение',
//             'lat': 62.251485,
//             'num': '2.2.',
//             'date': '2017-Q4',
//             'type': 'аварийная ситуация'
//           },
//           'id': 2
//         }, {
//           'geometry': {
//             'type': 'Point',
//             'coordinates': [5955446.038351271, 6935697.732444896]
//           },
//           'type': 'Feature',
//           'properties': {
//             'name': 'Газпромнефть',
//             'descript': '2017.12.04. Арбитражный суд подтвердил решение Россельхознадзора оштрафовать "Газпромнефть  - Оренбург" за порчу почв вследствие разлива нефти в 2014 г. ',
//             'region': 'Оренбургская область',
//             'lon': 53.498682,
//             'geo': 'Оренбургская область',
//             'lat': 52.743528,
//             'num': '2.3. ',
//             'date': '2017-Q4',
//             'type': 'аварийная ситуация'
//           },
//           'id': 3
//         }, {
//           'geometry': {
//             'type': 'Point',
//             'coordinates': [8254510.004544697, 9244395.567709558]
//           },
//           'type': 'Feature',
//           'properties': {
//             'name': 'Газпромнефть',
//             'descript': '2017.12.13. Прокуратура сообщила о выполнении "Газпромнефть - Ноябрьскнефтегаз" требования о получении разрешения на эксплуатацию трубопроводов ',
//             'region': 'ЯНАО',
//             'lon': 74.151525,
//             'geo': 'ЯНАО, Вынгаяхинское месторождение ',
//             'lat': 63.581971,
//             'num': '2.4.',
//             'date': '2017-Q4',
//             'type': 'аварийная ситуация'
//           },
//           'id': 4
//         }, {
//           'geometry': {
//             'type': 'Point',
//             'coordinates': [7428266.131017052, 10011938.058885153]
//           },
//           'type': 'Feature',
//           'properties': {
//             'name': 'Газпромнефть',
//             'descript': '2017.12.26. "Краноленинскнефтегаз" (подрядчик "Газпромнефть - Ноябрьскнефтегаз" выполнила решение суда о выплате ущерба в обращении с буровыми отходами в 2014 г. ',
//             'region': 'ЯНАО',
//             'lon': 66.72925,
//             'geo': 'ЯНАО, Воргенский лицензионный участок',
//             'lat': 66.488846,
//             'num': '2.5.',
//             'date': '2017-Q4',
//             'type': 'аварийная ситуация'
//           },
//           'id': 5
//         }, {
//           'geometry': {
//             'type': 'Point',
//             'coordinates': [7819884.9826820465, 8643626.754025921]
//           },
//           'type': 'Feature',
//           'properties': {
//             'name': 'Газпромнефть',
//             'descript': '2017.12.27. "Газпромнефть-Хантос" подала иск в суд против Росприроднадзора с  требованием вернуть переплаченные 530 млн.рублей платежей за негативное воздействие на окружающую среду (сжигание ПНГ)',
//             'region': 'ХМАО-Югра',
//             'lon': 70.247222,
//             'geo': 'ХМАО-Югра,  Южно-Приобское месторождение',
//             'lat': 61.077442,
//             'num': '2.6.',
//             'date': '2017-Q4',
//             'type': 'аварийная ситуация'
//           },
//           'id': 6
//         }, {
//           'geometry': {
//             'type': 'Point',
//             'coordinates': [8944685.949405398, 10410042.785033442]
//           },
//           'type': 'Feature',
//           'properties': {
//             'name': 'Лукойл',
//             'descript': '2017.10.02. Стало известно о пожаре на буровой площадке компании "Евразия" (возможный подрядчик "Лукойл", в результате которого два человека получили ожоги.',
//             'region': 'ЯНАО',
//             'lon': 80.351481,
//             'geo': 'ЯНАО, Тазовский район, Пякяхинское месторождение',
//             'lat': 67.875308,
//             'num': '3.1.',
//             'date': '2017-Q4',
//             'type': 'аварийная ситуация'
//           },
//           'id': 7
//         }, {
//           'geometry': {
//             'type': 'Point',
//             'coordinates': [5056430.721260722, 6439099.312028092]
//           },
//           'type': 'Feature',
//           'properties': {
//             'name': 'Лукойл',
//             'descript': '2017.10.03 Третий по счету суд подтвердил законность требования Россельхознадзора к компании "РИТЭК" (дочка "Лукойл") о выплате штрафа и компенсации ущерба за разлив нефти. ',
//             'region': 'Волгоградская область',
//             'lon': 45.42269,
//             'geo': 'Волгоградская область, Николаевский район, с.Солодушино',
//             'lat': 49.958543,
//             'num': '3.2.',
//             'date': '2017-Q4',
//             'type': 'аварийная ситуация'
//           },
//           'id': 8
//         }, {
//           'geometry': {
//             'type': 'Point',
//             'coordinates': [4921073.010945037, 7588468.447312937]
//           },
//           'type': 'Feature',
//           'properties': {
//             'name': 'Лукойл',
//             'descript': '2017.10.05. В результате сильного пожара на Кстовском НПЗ компании "Лукойл" погибли 4 человека',
//             'region': 'Нижегородская область',
//             'lon': 44.206751,
//             'geo': 'Нижегородская облость, г.Кстово',
//             'lat': 56.15067,
//             'num': '3.3.',
//             'date': '2017-Q4',
//             'type': 'аварийная ситуация'
//           },
//           'id': 9
//         }, {
//           'geometry': {
//             'type': 'Point',
//             'coordinates': [8354580.772112801, 8684502.252066651]
//           },
//           'type': 'Feature',
//           'properties': {
//             'name': 'Лукойл',
//             'descript': '2017.10.11. Природнадзор Югры оштрафовал "Лукойл-Лангепаснефтегаз" за разлив, который обнаружила общественная природоохранная организация',
//             'region': 'ХМАО-Югра',
//             'lon': 75.050476,
//             'geo': 'ХМАО-Югра, автодорога Лангепас-Покачи',
//             'lat': 61.254528,
//             'num': '3.4.',
//             'date': '2017-Q4',
//             'type': 'аварийная ситуация'
//           },
//           'id': 10
//         }, {
//           'geometry': {
//             'type': 'Point',
//             'coordinates': [8369080.024469132, 8684310.827074992]
//           },
//           'type': 'Feature',
//           'properties': {
//             'name': 'Лукойл',
//             'descript': '2017.11.19. Из ответа Ростехнадзора следует, что обнаруженный общественниками разлив нефти произошел из бесхозного нефтепровода. "Лукойл-Лангепаснефтегаз" проводит уборку появляющихся из него утечек, но не несет за них ответственности ',
//             'region': 'ХМАО-Югра',
//             'lon': 75.180725,
//             'geo': 'ХМАО-Югра, Урьевское месторождение около г. Лангепас',
//             'lat': 61.253701,
//             'num': '3.5. ',
//             'date': '2017-Q4',
//             'type': 'аварийная ситуация'
//           },
//           'id': 11
//         }, {
//           'geometry': {
//             'type': 'Point',
//             'coordinates': [6669433.222292652, 9930373.014646089]
//           },
//           'type': 'Feature',
//           'properties': {
//             'name': 'Лукойл',
//             'descript': '2017-10-27. Шведские, посетившие Коми сделали фотографии, на которых видны мощные факела сжигания попутного газа, предположительно компании "Лукойл-Коми" ',
//             'region': 'Республика Коми',
//             'lon': 59.912538,
//             'geo': 'Республика Коми, Усинский район, Головные сооружения (предположительно)',
//             'lat': 66.194828,
//             'num': '3.6.',
//             'date': '2017-Q4',
//             'type': 'аварийная ситуация'
//           },
//           'id': 12
//         }, {
//           'geometry': {
//             'type': 'Point',
//             'coordinates': [6099158.053812006, 9381695.871674074]
//           },
//           'type': 'Feature',
//           'properties': {
//             'name': 'Лукойл',
//             'descript': '2017.11.23. Госсовет Республики Коми в очередной раз отказался рассматривать возможность референдума о запрете эксплуатации старых нефтепроводов, которые на территории Республики в основном принадлежат "Лукойл-Коми". .',
//             'region': 'Республика Коми',
//             'lon': 54.789669,
//             'geo': 'Республика Коми',
//             'lat': 64.125463,
//             'num': '3.7.',
//             'date': '2017-Q4',
//             'type': 'аварийная ситуация'
//           },
//           'id': 13
//         }, {
//           'geometry': {
//             'type': 'Point',
//             'coordinates': [6271948.278740819, 7975358.223311134]
//           },
//           'type': 'Feature',
//           'properties': {
//             'name': 'Лукойл',
//             'descript': '2017.10.31. Несмотря на протесты местных жителей, подрядчик "Лукойл-Перьм" перекладывает газопровод',
//             'region': 'Пермский край',
//             'lon': 56.34187,
//             'geo': 'г.Пермь, микрорайон Запруд',
//             'lat': 58.038256,
//             'num': '3.8.',
//             'date': '2017-Q4',
//             'type': 'аварийная ситуация'
//           },
//           'id': 14
//         }, {
//           'geometry': {
//             'type': 'Point',
//             'coordinates': [6117106.985868537, 9273892.701247731]
//           },
//           'type': 'Feature',
//           'properties': {
//             'name': 'Лукойл',
//             'descript': '2017.11.07. "Лукойл-Коми"  не убирает недоделки в области ликвидации скважин, оставленные ее подразделениями.',
//             'region': 'Республика Коми',
//             'lon': 54.950907,
//             'geo': 'Республика Коми, Сосногорский район',
//             'lat': 63.69962,
//             'num': '3.9.',
//             'date': '2017-Q4',
//             'type': 'аварийная ситуация'
//           },
//           'id': 15
//         }, {
//           'geometry': {
//             'type': 'Point',
//             'coordinates': [6105410.98092936, 9258659.3956301]
//           },
//           'type': 'Feature',
//           'properties': {
//             'name': 'Лукойл',
//             'descript': '2017.11.16. Подрядчик "Лукойл-Коми" допустил утечку нефти из трубопровода. ',
//             'region': 'Республика Коми',
//             'lon': 54.84584,
//             'geo': 'Республика Коми, пос.Нижний Одес.',
//             'lat': 63.638923,
//             'num': '3.10.',
//             'date': '2017-Q4',
//             'type': 'аварийная ситуация'
//           },
//           'id': 16
//         }, {
//           'geometry': {
//             'type': 'Point',
//             'coordinates': [8871351.006580098, 8761768.207499018]
//           },
//           'type': 'Feature',
//           'properties': {
//             'name': 'Лукойл',
//             'descript': '2017.11.30. Природнадзор Югры подтвердил выявленное общественниками загрязнение нефтепродуктами в водоохранной зоне р. Урьевский Еган вследствие старого (2014 г.) разлива на территори бывшего лицензионного участка "Лукойл-Лагепаснефтегаз". Кто его должен убирать - непонятно ',
//             'region': 'ХМАО-Югра',
//             'lon': 79.692702,
//             'geo': 'ХМАО-Югра, Нижевартовский район, 119 квартал Лангепасского участкового лесничества. ',
//             'lat': 61.586562,
//             'num': '3.11.',
//             'date': '2017-Q4',
//             'type': 'аварийная ситуация'
//           },
//           'id': 17
//         }, {
//           'geometry': {
//             'type': 'Point',
//             'coordinates': [7121736.113251749, 10294379.50303194]
//           },
//           'type': 'Feature',
//           'properties': {
//             'name': 'Лукойл',
//             'descript': 'Серия минингов протеста, в том числе по вопросу референдума о запрете использваония старых нефтпроводов и новых проектов   "Лукойл-Коми". ',
//             'region': 'Республика Коми',
//             'lon': 63.975644,
//             'geo': 'Республика Коми, Сыктывкар, Воркута, населенные пункты Усинского, Ижемского, Сосногорского и Ухтинского районов. ',
//             'lat': 67.480686,
//             'num': '3.12.',
//             'date': '2017-Q4',
//             'type': 'аварийная ситуация'
//           },
//           'id': 18
//         }, {
//           'geometry': {
//             'type': 'Point',
//             'coordinates': [8518394.861220982, 9459048.510027433]
//           },
//           'type': 'Feature',
//           'properties': {
//             'name': 'Роснефть',
//             'descript': '2017.10.10. Суд второй инстанции поддержал требование прокуратуры обязать "Роснефть-Пурнефтегаз" получить разрешение на эксплуатацию нефтепроводов',
//             'region': 'ЯНАО',
//             'lon': 76.522043,
//             'geo': 'ЯНАО, Губкинское, Северо-Тарасовское и Харампуркское месторождения',
//             'lat': 64.427056,
//             'num': '7.1.',
//             'date': '2017-Q4',
//             'type': 'аварийная ситуация'
//           },
//           'id': 19
//         }, {
//           'geometry': {
//             'type': 'Point',
//             'coordinates': [15934159.145505, 6756646.893945609]
//           },
//           'type': 'Feature',
//           'properties': {
//             'name': 'Роснефть',
//             'descript': '2017.10.15. Утечка газа их магистрального газопровода "Даги-Ноглики-Катангли" компании "Роснефть-Сахалинморнефтегаз" ',
//             'region': 'Сахалинская область',
//             'lon': 143.13899,
//             'geo': 'Сахалинская область, 6-й км газопровода "Даги-Ноглики-Катангли" ',
//             'lat': 51.758892,
//             'num': '7.2.',
//             'date': '2017-Q4',
//             'type': 'аварийная ситуация'
//           },
//           'id': 20
//         }, {
//           'geometry': {
//             'type': 'Point',
//             'coordinates': [5963539.967207359, 7105887.26936824]
//           },
//           'type': 'Feature',
//           'properties': {
//             'name': 'Роснефть',
//             'descript': '2017.10.17. Россельхознадзор сообщил, что в связи с реорганизацией ООО "Бугурусланнефть", ответственной за допущенные этой компанией летом 2017 г. два разлива нефти будет нести ПАО "Оренбургнефть" ',
//             'region': 'Оренбургская область',
//             'lon': 53.571391,
//             'geo': 'Оренбургская область, Абулинский городской округ, 2 км СЗ от с.Ново-Якупово.',
//             'lat': 53.659264,
//             'num': '7.3.',
//             'date': '2017-Q4',
//             'type': 'спорная ситуация'
//           },
//           'id': 21
//         }, {
//           'geometry': {
//             'type': 'Point',
//             'coordinates': [5765853.0268431455, 6886730.256527092]
//           },
//           'type': 'Feature',
//           'properties': {
//             'name': 'Роснефть',
//             'descript': '2017.11.01.  Россельхознадзор оштрафовал ПАО "Оренбургнефть" (дочерняя "Роснефти") за разлив соленых вод',
//             'region': 'Оренбургская область',
//             'lon': 51.795539,
//             'geo': 'Оренбургская область,  Курманаевский район, Ромашкинский сельсовет.',
//             'lat': 52.476416,
//             'num': '7.4.',
//             'date': '2017-Q4',
//             'type': 'спорная ситуация'
//           },
//           'id': 22
//         }, {
//           'geometry': {
//             'type': 'Point',
//             'coordinates': [8494082.461792752, 8708854.505843466]
//           },
//           'type': 'Feature',
//           'properties': {
//             'name': 'Роснефть',
//             'descript': '2017.11.3. На Самотлорском месторждении у компании "Самотлорнефтегаз" (дочерняя "Роснефти") произошло газоводопроявление (открытое  фонтанирование) без возгорания. ',
//             'region': 'ХМАО-Югра',
//             'lon': 76.303641,
//             'geo': 'ХМАО-Югра, Самотлорское месторождение',
//             'lat': 61.359558,
//             'num': '7.5.',
//             'date': '2017-Q4',
//             'type': 'спорная ситуация'
//           },
//           'id': 23
//         }, {
//           'geometry': {
//             'type': 'Point',
//             'coordinates': [5113427.747700257, 6702737.37450445]
//           },
//           'type': 'Feature',
//           'properties': {
//             'name': 'Роснефть',
//             'descript': '2017.11.20. На Саратовском НПЗ компании "Роснефть" произошло возгорание. ',
//             'region': 'Саратовская область',
//             'lon': 45.934703,
//             'geo': 'г.Саратов, Саратовский НПЗ. ',
//             'lat': 51.458142,
//             'num': '7.7..',
//             'date': '2017-Q4',
//             'type': 'спорная ситуация'
//           },
//           'id': 24
//         }, {
//           'geometry': {
//             'type': 'Point',
//             'coordinates': [4424251.89714484, 7279779.070146682]
//           },
//           'type': 'Feature',
//           'properties': {
//             'name': 'Роснефть',
//             'descript': '10.12.2017. На Рязанском НПЗ компании "Роснефть" произошел пожар ',
//             'region': 'Рязанская область',
//             'lon': 39.743731,
//             'geo': 'г.Рязань, Рязанский НПЗ',
//             'lat': 54.574811,
//             'num': '7.8.',
//             'date': '2017-Q4',
//             'type': 'спорная ситуация'
//           },
//           'id': 25
//         }, {
//           'geometry': {
//             'type': 'Point',
//             'coordinates': [5617548.971067695, 7034279.683283141]
//           },
//           'type': 'Feature',
//           'properties': {
//             'name': 'Роснефть',
//             'descript': '2017.12.16. ПАО "Оренбургнефть" (дочерняя "Роснефти") пытается изменить границы памятника природы "Мулин Дол" с целью поиска и добычи нефти',
//             'region': 'Самарская область',
//             'lon': 50.463301,
//             'geo': 'Самарская область, Черниговский район, памятник природы "Мулин Дол" ',
//             'lat': 53.27635,
//             'num': '7.9. ',
//             'date': '2017-Q4',
//             'type': 'спорная ситуация'
//           },
//           'id': 26
//         }, {
//           'geometry': {
//             'type': 'Point',
//             'coordinates': [4236766.942833866, 5552907.812464289]
//           },
//           'type': 'Feature',
//           'properties': {
//             'name': 'Роснефть',
//             'descript': '2017.12.20. Несмотря на протесты общественности и неготовность к ликвидации крупных разливов нефти "Роснефть" и итальнянские компании ENI и Saipem начали разведочное бурение на шельфе Черного моря. ',
//             'region': 'Краснодарский край',
//             'lon': 38.059525,
//             'geo': 'Черное море, Западно-Черноморский лицензионный участок. ',
//             'lat': 44.562505,
//             'num': '7.10.',
//             'date': '2017-Q4',
//             'type': 'спорная ситуация'
//           },
//           'id': 27
//         }, {
//           'geometry': {
//             'type': 'Point',
//             'coordinates': [7951490.001643594, 8160797.265195503]
//           },
//           'type': 'Feature',
//           'properties': {
//             'name': 'Роснефть',
//             'descript': '2017.12.21. Прокуратура сообщила, что после возбужденных ей административных дел "Роснефть-Уватнефтегаз" устранила нарушения  в области обращения с отходами, правли пожарной и санитарной безопасности в лесах, требований промышленной безопасности',
//             'region': 'ХМАО-Югра',
//             'lon': 71.42945,
//             'geo': 'ХМАО-Югра, Уватский район.  ',
//             'lat': 58.909246,
//             'num': '7.11.',
//             'date': '2017-Q4',
//             'type': 'спорная ситуация'
//           },
//           'id': 28
//         }, {
//           'geometry': {
//             'type': 'Point',
//             'coordinates': [5893010.052911066, 7074036.710805917]
//           },
//           'type': 'Feature',
//           'properties': {
//             'name': 'Роснефть',
//             'descript': '2017.12.25. Суд подтвердил обоснованность наложенного Россельхознадзором штрафа на "Оребургнефть" (дочерняя "Роснефти"), за загрязнение почв в результате разливов нефти. ',
//             'region': 'Оренбургская область',
//             'lon': 52.93781,
//             'geo': 'Оренбургская область, Асеекеевский район, Чкаловский сельсовет. ',
//             'lat': 53.489373,
//             'num': '7.12. ',
//             'date': '2017-Q4',
//             'type': 'спорная ситуация'
//           },
//           'id': 29
//         }]
//       })
//     }, DELAY);
//   }

//   _connector = new connector();
//   return _connector;
// }
