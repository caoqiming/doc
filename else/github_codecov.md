# github 单元测试覆盖率

可以在 action 里配置流水线，测试覆盖率并上传到 codecov 里展示。

需要关联github账号，并且在codecov里生成密钥，在github的 settings-security-secrets and variables 在action里的yaml里通过 `${{ secrets.CODECOV_TOKEN }}` 来引用了
