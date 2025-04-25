# configparser

configparser 可以处理 INI 格式的配置文件，示例代码如下

```python
import configparser
from dataclasses import dataclass
import os

@dataclass
class AppConfig:
    ModelName: str
    Latency: float
    Translate: bool

def load_config(file_path: str) -> AppConfig:
    # 扩展文件路径中的 ~ 符号
    file_path = os.path.expanduser(file_path)
    config = configparser.ConfigParser()
    config.read(file_path)
    appConfig = AppConfig(
      ModelName = config.get('AppConfig', 'ModelName'),
      Latency = config.getfloat('AppConfig', 'Latency'),
      Translate = config.getboolean('AppConfig', 'Translate')
      )
    return appConfig


def save_config(file_path: str, config: AppConfig):
    # 扩展文件路径中的 ~ 符号
    file_path = os.path.expanduser(file_path)
    config_parser = configparser.ConfigParser()
    # 添加配置节
    config_parser['AppConfig'] = {
        'ModelName': config.ModelName,
        'Latency': str(config.Latency),
        'Translate': str(config.Translate)
    }
    # 确保目录存在
    directory = os.path.dirname(file_path)
    if directory and not os.path.exists(directory):
        os.makedirs(directory)
    # 将配置写入文件
    with open(file_path, 'w') as configfile:
        config_parser.write(configfile)

if __name__ == "__main__":
    cfg= AppConfig(
      ModelName = 'test',
      Latency = 0.1,
      Translate = True
    )
    # save_config('~/.config/glimmer/realtime-subtitle.config', cfg)
    app_config = load_config('~/.config/glimmer/realtime-subtitle.config')
    print(app_config)

```
