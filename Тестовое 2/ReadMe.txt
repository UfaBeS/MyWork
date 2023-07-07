Описание файлов.
В моём случае через record запись начинает записывать слишком много всего, 
включая все картинки и тд(Включены режимы Proxy recording settings 1)Use the LoadRunner Proxy......2)Use streaming mode......) без них записи вообще нет
и в default настройках работать вообще отказывается, не записывает шаги в принципе.
Прикрепляю 2 файла, первый файл это отрывки из записи по шагам.
Второй файл это почти то же самое, но с моими доработками.

Ниже код, который я изначально себе представлял, но, к сожалению, он не рабочий )
Для меня странно, что в ссылке "Электроника" скрипт не может найти "Text=Электроника" и выдает ошибку.
Интересно узнать ваши комментарии и советы.
Action()
{
    // Открытие браузера Chrome на весь экран
    web_set_max_html_param_len("4096");
    web_browser("Chrome", "launch");

    // Переход на https://market.yandex.ru/
    web_url("Yandex Market",
        "URL=https://market.yandex.ru/",
        "Resource=0",
        "RecContentType=text/html",
        "Snapshot=t1.inf",
        LAST);

    // Переход в раздел "Электроника"
    web_link("Электроника",
        "Text=Электроника",
        "Snapshot=t2.inf",
        LAST);

    // Ввод поискового запроса "ноутбук xiaomi redmibook"
    web_submit_data("Поиск",
        "Action=https://market.yandex.ru/search",
        "Method=POST",
        "RecContentType=text/html",
        "Snapshot=t3.inf",
        ITEMDATA,
        "Name=text", "Value=ноутбук xiaomi redmibook", ENDITEM,
        LAST);

    // Производим поиск
    web_submit_data("Найти",
        "Action=https://market.yandex.ru/search",
        "Method=POST",
        "RecContentType=text/html",
        "Snapshot=t4.inf",
        ITEMDATA,
        "Name=op", "Value=Поиск", ENDITEM,
        LAST);

    // Поставить галочку "Срок доставки До 5 дней"
    web_submit_data("Выбрать срок доставки",
        "Action=https://market.yandex.ru/search",
        "Method=POST",
        "RecContentType=text/html",
        "Snapshot=t5.inf",
        ITEMDATA,
        "Name=deliveryParam", "Value=5days", ENDITEM,
        LAST);

    // Отсортировать по цене (от самой малой)
    web_link("Цена",
        "Text=Цена",
        "Snapshot=t6.inf",
        LAST);

    // Добавить в корзину самый дешевый лот
    web_link("Добавить в корзину",
        "Text=Добавить в корзину",
        "Snapshot=t7.inf",
        LAST);

    return 0;
}