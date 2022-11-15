# snipiety
proste snipiety, nic specjalnego


## find after type module
    moduł stworzony na przyszłe potrzeby aby szybciej tworzyć moduł
    opis:
    w szablonie html zostały umieszczone w tagu nadrzędnym atrybuty dzięki którym moduł działa (data-findaftertype oraz data-url)
    data-url wskazuje miejsce do którego ma pukać fetch w celu zdobycia informacji do wyświetlenia
    moduł został napisany w typescripcie ale nic nie stoi na przeszkodzie aby zmienić go na js
    docelowo minimalna ilość aby zostało wysłane zapytanie wynosi 3 a czas między wpisaniem a wysłaniem zapytania (chyba że user wpisze kolejną literkę wtedy timeout jest czyszczony) wynosi 1s.

    Gdyby zaszła taka potrzeba to funkcja inicjująca posiada 1 argument który może przjąć value dla inputa które ma być na starcie zainicjowane jako wysłane