# Amazon Resource Names (ARNs)

Amazon Resource Names (ARNs) uniquely identify AWS resources. We require an ARN when you need to specify a resource unambiguously across all of AWS, such as in IAM policies, Amazon Relational Database Service (Amazon RDS) tags, and API calls.

```
arn:partition:service:region:account-id:resource-id
arn:partition:service:region:account-id:resource-type/resource-id
arn:partition:service:region:account-id:resource-type:resource-id
```

- partition
  The partition in which the resource is located. A partition is a group of AWS Regions. Each AWS account is scoped to one partition.
- service
  The service namespace that identifies the AWS product.
- region
  The Region code.
- account-id
  The ID of the AWS account that owns the resource, without the hyphens.
- resource-type
  The resource type. For example, vpc for a virtual private cloud
- resource-id
  The resource identifier. This is the name of the resource, the ID of the resource, or a resource path. Some resource identifiers include a parent resource (sub-resource-type/parent-resource/sub-resource) or a qualifier such as a version (resource-type:resource-name:qualifier).

## Paths in ARNs

Resource ARNs can include a path.
you can specify all IAM users that have the path product_1234 using a wildcard as follows:

```
arn:aws:iam::123456789012:user/Development/product_1234/*
```

Similarly, you can specify `user/*` to mean all users or `group/*` to mean all groups, as in the following examples:

```
"Resource":"arn:aws:iam::123456789012:user/*"
"Resource":"arn:aws:iam::123456789012:group/*"
```

The following example shows ARNs for an Amazon S3 bucket in which the resource name includes a path:

```
arn:aws:s3:::my_corporate_bucket/*
arn:aws:s3:::my_corporate_bucket/Development/*
```
