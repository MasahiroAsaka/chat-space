# README

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_name|string|null: false, unique: true|
|email|string|null: false, unique: true|
|password|string|null: false|

### Association
- has_many :messages
- has_many :comments
- has_many :members
- has_many :groups through: :members


## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|message|text|null: false|
|img_url|text||
|user_id|string|null: false, foreign_key: true|

### Association
- belongs_to :user
- has_many :comments


## commentsテーブル

|Column|Type|Options|
|------|----|-------|
|comment|text|null: false|
|user_id|string|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :message


## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|group_name|text|null: false, unique: true|
|user_id|string|null: false, foreign_key: true|

### Association
- has_many :members
- has_many :users through: :members


## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|reference|null: false, foreign_key: true|
|group_id|reference|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user


This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
