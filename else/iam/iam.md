# iam

IAM provides the infrastructure necessary to control authentication and authorization for your AWS account.

## Terms

- Resource
  IAM resources are stored in IAM. You can add, edit, and remove them from IAM.
- Entity
  IAM resources that AWS uses for authentication. Entities can be specified as a Principal in a resource-based policy.
- Identity
  An IAM resource that can be authorized in policies to perform actions and to access resources. Identities include users, groups, and roles.
- Principals
  A person or application that uses the AWS account root user, an IAM user, or an IAM role to sign in and make requests to AWS. Principals include federated users and assumed roles.
- Role
  An IAM identity that you can create in your account that has specific permissions.
- Role chaining
  Role chaining is when you use a role to assume a second role. For example, RoleA has permission to assume RoleB. You can enable User1 to assume RoleA by using their long-term user credentials. This returns RoleA short-term credentials. With role chaining, you can use RoleA's short-term credentials to enable User1 to assume RoleB.
- Tag
  A tag is a custom attribute label that you can assign to a resource.
