# airflow

安装参考[官方文档](https://airflow.apache.org/docs/apache-airflow/stable/installation/installing-from-pypi.html)

需要指定一个 home 目录，可通过环境变量指定，默认就是 `~/airflow`

```bash
export AIRFLOW_HOME=~/airflow
```

启动
```bash
airflow standalone
```


自动创建的用户以及密码在 `$AIRFLOW_HOME/simple_auth_manager_passwords.json.generated`