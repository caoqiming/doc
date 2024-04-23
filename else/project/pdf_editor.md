# Stirling-PDF

[github](https://github.com/Stirling-Tools/Stirling-PDF)
This locally hosted web application started as a 100% ChatGPT-made application and has evolved to include a wide range of features to handle all your PDF needs.

配置文件

```bash
mkdir -p ~/.pdf/tessdata
mkdir -p ~/.pdf/configs
vim ~/.pdf/configs/settings.yml
```

```yaml
security:
  enableLogin: true
  csrfDisabled: true

system:
  defaultLocale: "en-US" # Set the default language (e.g. 'de-DE', 'fr-FR', etc)
  googlevisibility: false # 'true' to allow Google visibility (via robots.txt), 'false' to disallow
  customStaticFilePath: "/customFiles/static/" # Directory path for custom static files

ui:
  appName: "pdf editor" # Application's visible name
  homeDescription: "this is for the little genius" # Short description or tagline shown on homepage.

endpoints:
  toRemove: [] # List endpoints to disable (e.g. ['img-to-pdf', 'remove-pages'])
  groupsToRemove: [] # List groups to disable (e.g. ['LibreOffice'])

metrics:
  enabled: false # 'true' to enable Info APIs endpoints (view http://localhost:8080/swagger-ui/index.html#/API to learn more), 'false' to disable
```

```bash
docker run -d \
  -p 8080:8080 \
  -v ~/.pdf/configs:/configs \
  -e INSTALL_BOOK_AND_ADVANCED_HTML_OPS=false \
  -e APP_LOCALE=zh_CN \
  -e DOCKER_ENABLE_SECURITY=true \
  frooodle/s-pdf:latest
```

初始用户名和密码为`admin`和`stirling`。但看起来对鉴权支持的并不好，容器启动会自动下载

```
https://github.com/Stirling-Tools/Stirling-PDF/releases/download/v$VERSION_TAG/Stirling-PDF-with-login.jar
```

到`/app-security.jar`，但是实在下的太慢了，这里手动下载之后复制进去。

```bash
docker tag 632bb151b7fe frooodle/s-pdf:v0.22.2
```

```dockerfile
#使用frooodle/s-pdf:v0.22.2作为基础镜像
FROM frooodle/s-pdf:v0.22.2

#将本地的 /root/Stirling-PDF-with-login.jar 文件复制到镜像的 /app-security.jar
COPY ./Stirling-PDF-with-login.jar /app-security.jar
```

```bash
docker build -t frooodle/s-pdf-s:v0.22.2 .
```

再执行

```bash
docker run -d \
  -p 8080:8080 \
  -v ~/.pdf/tessdata:/usr/share/tessdata \
  -v ~/.pdf/configs:/configs \
  -e INSTALL_BOOK_AND_ADVANCED_HTML_OPS=false \
  -e APP_LOCALE=zh_CN \
  -e DOCKER_ENABLE_SECURITY=true \
  -e SECURITY_ENABLE_LOGIN=true \
  frooodle/s-pdf-s:v0.22.2
```

就结果而言还是没登录页面，先不挣扎了，怀疑就是这个项目有问题

啪啪打脸了，再仔细看了眼启动脚本，在下载完之后会删除 app.jar 并将 app-security.jar 软链接到 app.jar，执行以下命令之后就好了

```bash
rm -f app.jar
ln -s app-security.jar app.jar
chown stirlingpdfuser:stirlingpdfgroup app.jar
chmod 755 app.jar
```
