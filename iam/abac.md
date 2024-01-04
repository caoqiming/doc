# ABAC

Attribute-based access control (ABAC) is an authorization strategy that defines permissions based on attributes. In AWS, these attributes are called tags. You can attach tags to IAM resources, including IAM entities (users or roles) and to AWS resources. You can create a single ABAC policy or small set of policies for your IAM principals. These ABAC policies can be designed to allow operations when the principal's tag matches the resource tag.

## Comparing ABAC to the traditional RBAC model

The disadvantage to using the traditional RBAC model is that when employees add new resources, you must update policies to allow access to those resources.

ABAC provides the following advantages over the traditional RBAC model:

1. It's no longer necessary for an administrator to update existing policies to allow access to new resources.
2. You can allow actions on all resources, but only if the resource tag matches the principal's tag.
