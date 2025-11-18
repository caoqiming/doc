# Argo CD

Argo CD is a declarative, GitOps continuous delivery tool for Kubernetes. Argo CD is implemented as a Kubernetes controller which continuously monitors running applications and compares the current, live state against the desired target state.

You can install Helm charts through the UI, or in the declarative GitOps way.
**Helm is only used to inflate charts with helm template.** The lifecycle of the application is handled by Argo CD instead of Helm.

> Order of precedence is `parameters > valuesObject > values > valueFiles > helm repository values.yaml`

## Application

A group of Kubernetes resources as defined by a manifest. This is a Custom Resource Definition ([CRD](https://argo-cd.readthedocs.io/en/stable/user-guide/application-specification/)).
