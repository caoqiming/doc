# airflow

```bash
pip install apache-airflow
brew install mysql-client pkg-config
export PKG_CONFIG_PATH="/opt/homebrew/opt/mysql-client/lib/pkgconfig"
pip install mysqlclient
pip install aiomysql
```

需要指定一个 home 目录，可通过环境变量指定，默认就是 `~/airflow`

```bash
export AIRFLOW_HOME=~/airflow
```

启动

```bash
airflow standalone
```

自动创建的用户以及密码在 `$AIRFLOW_HOME/simple_auth_manager_passwords.json.generated`
