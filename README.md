To start the project, first clone the repository, run the ff on the terminal:
git clone https://github.com/dibanez09/online-shop.git
 
after cloning the repository, do the ff to run the project

1. Navigate on the root directory of the folder and rename ".env.dev" to ".env"
2. Create mysql database on your localhost and name it "online_shop" (you can modify env to use other database)
2. Run the following commands on terminal root directory:

**install dependencies**

npm install
composer install

**Migrate database**
php artisan migrate

**start services**
npm run dev
php artisan serve

after that, you should be able to access the web application on your local host (http://localhost:8000)

Credentials:
Web app logins
email: admin@example.com
password: Admin

PayPal Sandbox Accounts:
email: sb-izwsm25184055@personal.example.com
password: )i&1Si%<

or

email: sb-zghk4325184056@business.example.com
password: jFWh&r9#

Paypal integration is working and with login and registration, form validation is also included.
