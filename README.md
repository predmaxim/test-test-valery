# Test task for Valery

## Dependencies

`Docker Desktop` or `Docker engine` required.

First, you must install it for run App.

## Quick Start

1. Open terminal in project directory
2. Run services: `docker compose --env-file .env.dev up -d`
3. Open App in your browser on url: `http://localhost:3000`

## Task Overview

Цель: реализовать клиентскую часть блога.
Функциональность: создание/удаление/редактирование постов. Просмотр списка постов. Маршрутизация: страница списка постов
и отдельная страница поста.

Обязательные требования: React. Для работы с серверной частью можно написать свой сервер, либо использовать
json-server https://github.com/typicode/json-server/. Обязательно использовать TypeScript!!!. Кнопки, модальные окно,
элементы формы и т.д. должны быть собраны в небольшую UI библиотеку, пользоваться готовыми UI Библиотеками нельзя!!!
Также нельзя использовать библиотеки для работы с формами. Использовать только базовые возможности фреймворка!!!
Можно, но не обязательно (т.к проверяется умение писать код, а не верстать), использовать Bootstrap 5, TailwindCSS,
Препроцессоры.

Описание:
Приложение блог. Вам нужно создать его клиентскую часть.

1. При попадании на главную страницу, должен загрузиться список постов
2. При клике на отдельный пост должна выводиться отдельная страница с названием поста и его описанием. При клике на
   ”Посты“ должен снова отобразиться список постов.
3. Над списком постов необходимо создать кнопку, при клике на которую, будет появляться модальное окно с формой. Поля
   должны быть валидированы: название поста ограниченно длинной в 12 символов, описание поста ограниченно в 25
   символов (если вместо input-а textarea, то кол-во символов можно увеличить до 50)
   При нажатии на кнопку создать пост, новый пост должен появиться в списке (БЕЗ ПЕРЕЗАГРУЗКИ СТРАНИЦЫ) и создаться на
   сервере.
4. Каждый пост, который является элементом списка, имеет две кнопки: “Удалить” и “Редактировать”.
5. При нажатии на кнопку “Удалить”, пост должен удалиться из списка и на сервере.
6. При нажатии на кнопку “Редактировать”, должно появиться модальное окно с формой.
7. При нажатии на кнопку “Редактировать пост”, пост должен применить изменения. Также при нажатии на кнопку должен
   отправиться запрос на сервер, запрос на изменения.
