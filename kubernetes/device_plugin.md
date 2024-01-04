# Device Plugin

Kubernetes 提供了一个设备插件框架，你可以用它来将系统硬件资源发布到 Kubelet。[官方文档](https://kubernetes.io/docs/concepts/extend-kubernetes/compute-storage-net/device-plugins/)

## registration

The kubelet exports a Registration gRPC service. A device plugin can register itself with the kubelet through this gRPC service. During the registration, the device plugin needs to send:

- The name of its Unix socket.
- The Device Plugin API version against which it was built.
- The ResourceName it wants to advertise.

## implementation

The general workflow of a device plugin includes the following steps:

1. Initialization. During this phase, the device plugin performs vendor-specific initialization and setup to make sure the devices are in a ready state.
2. The plugin starts a gRPC service, with a Unix socket under the host path `/var/lib/kubelet/device-plugins/`, that implements the interfaces.

   ```thrift
   service DevicePlugin {
       rpc GetDevicePluginOptions(Empty) returns (DevicePluginOptions) {}
       rpc ListAndWatch(Empty) returns (stream ListAndWatchResponse) {}
       rpc Allocate(AllocateRequest) returns (AllocateResponse) {}
       rpc GetPreferredAllocation(PreferredAllocationRequest) returns (PreferredAllocationResponse) {}
       rpc PreStartContainer(PreStartContainerRequest) returns (PreStartContainerResponse) {}
   }
   ```

3. The plugin registers itself with the kubelet through the Unix socket at host path `/var/lib/kubelet/device-plugins/kubelet.sock`.
4. After successfully registering itself, the device plugin runs in serving mode, during which it keeps monitoring device health and reports back to the kubelet upon any device state changes. It is also responsible for serving Allocate gRPC requests. During Allocate, the device plugin may do device-specific preparation; for example, GPU cleanup or QRNG initialization. If the operations succeed, the device plugin returns an AllocateResponse that contains container runtime configurations for accessing the allocated devices. The kubelet passes this information to the container runtime.
