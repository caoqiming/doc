# ssh-keygen

```bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

ssh-keygen：生成新的 SSH 密钥对的命令。

- -t rsa：指定密钥类型为 RSA（目前推荐使用 -t ed25519，因为它更安全）。
- -b 4096：指定密钥长度为 4096 位（对于 ed25519，不需要指定密钥长度）。
- -C "your_email@example.com"：添加一个注释，通常是你的邮箱地址，以便于识别这个密钥。
  运行命令后，系统会提示你选择保存密钥的位置（默认为 ~/.ssh/id_rsa），以及输入一个密码短语（可以为空）。
  生成的密钥对包括：
  私钥：通常保存在 `~/.ssh/id_rsa` 或者 `~/.ssh/id_ed25519`
  公钥：通常保存在 `~/.ssh/id_rsa.pub` 或者 `~/.ssh/id_ed25519.pub`
  公钥可以添加到你需要访问的服务器或服务的 `~/.ssh/authorized_keys` 文件中，而私钥应该妥善保管，不可泄露。
