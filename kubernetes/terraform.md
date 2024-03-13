# terraform

[官网语法文档](https://developer.hashicorp.com/terraform/language)
The Terraform language syntax is built around two key syntax constructs: arguments and blocks.

> Note: Terraform's configuration language is based on a more general language called HCL

## provider

[查询 provider](https://registry.terraform.io/)
本质上各个 Provider 插件都是独立的进程，与 Terraform 进程之间通过 rpc 进行调用。Terraform 引擎首先读取并分析用户编写的 Terraform 代码，形成一个由 data 与 resource 组成的图(Graph)，再通过 rpc 调用这些 data 与 resource 所对应的 Provider 插件；Provider 插件的编写者根据 Terraform 所制定的插件框架来定义各种 data 和 resource，并实现相应的 CRUD 方法。

Terraform 将每次执行基础设施变更操作时的状态信息保存在一个状态文件中，默认情况下会保存在当前工作目录下的 terraform.tfstate 文件里。这个文件如果丢失了 Terraform 就不知道已经创建了哪些资源，导致资源泄漏。Terraform 引入了远程状态存储机制，也就是 Backend。当针对一个 tfstate 进行变更操作时，可以针对该状态文件添加一把全局锁，确保同一时间只能有一个变更被执行。

## resource blocks

Each resource block describes one or more infrastructure objects, such as virtual networks, compute instances, or higher-level components such as DNS records.
In the following example, the `aws_instance` **resource type** is **named** `web`. Both `ami` and `instance_type` are special arguments for the `aws_instance` [resource type](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/instance).

```tf
resource "aws_instance" "web" {
  ami           = "ami-a1b2c3d4"
  instance_type = "t2.micro"
}
```

### Meta-Arguments

- depends_on 声明依赖关系
- count 副本数量
- for_each creates an instance for each item in that map or set. 比 count 灵活。

  ```tf
  resource "azurerm_resource_group" "rg" {
  for_each = {
    a_group = "eastus"
    another_group = "westus2"
  }
  name     = each.key
  location = each.value
  }
  ```

- provider 在有多个 provider 的情况下指定一个
- lifecycle 可选项为 create_before_destroy, prevent_destroy, ignore_changes, replace_triggered_by.

## Data Sources

Data sources allow Terraform to use information defined outside of Terraform, defined by another separate Terraform configuration, or modified by functions.

## Variables and Outputs

- Input variables are like function arguments.
- Output values are like function return values.
- Local values are like a function's temporary local variables.

### Input Variables

```tf
variable "availability_zone_names" {
  type    = list(string)
  default = ["us-west-1a"]
}
```

#### Arguments

- default - A default value which then makes the variable optional.
- type - This argument specifies what value types are accepted for the variable.
- description - This specifies the input variable's documentation.
- validation - A block to define validation rules, usually in addition to type constraints.
- sensitive - Limits Terraform UI output when the variable is used in configuration.
- nullable - Specify if the variable can be null within the module.

### Output Values

```tf
output "instance_ip_addr" {
  value = aws_instance.server.private_ip
}

```

#### Arguments

- description
- sensitive - Terraform will hide values marked as sensitive in the messages from terraform plan and terraform apply.
- depends_on

### Local Values

```tf
locals {
  service_name = "forum"
  owner        = "Community Team"
}
```

## Modules

A Terraform module is a set of Terraform configuration files in a single directory. Modules are containers for multiple resources that are used together.

```
.
├── main.tf
├── variables.tf
├── outputs.tf
```

Modules are called from within other modules using module blocks:

```tf
module "servers" {
  source = "./app-cluster"

  servers = 5
}
```

The label immediately after the `module` keyword is a local name, which the calling module can use to refer to this instance of the module.
All modules **require** a `source` argument, which is a meta-argument defined by Terraform. Its value is either the path to a local directory containing the module's configuration files, or a remote module source that Terraform should download and use.
