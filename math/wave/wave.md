# wave

The physical wave equation is a second-order linear partial differential equation that describes how a disturbance propagates through a medium in space and time. In one dimension, it's typically written as:

$$\frac{\partial^2u}{\partial x^2} = \frac{1}{v^2}\frac{\partial^2u}{\partial t^2}$$

Where:

- $u$ is the displacement of the wave (e.g., the height of a water wave, the pressure change in a sound wave, or the electric field strength in a light wave).
- $x$ is the position.
- $t$ is time.
- $v$ is the constant speed of the wave propagation.

The three-dimensional version uses the Laplacian operator ($\nabla^2$) to account for all spatial dimensions:

$$\nabla^2u = \frac{1}{v^2}\frac{\partial^2u}{\partial t^2}$$

### Why All Waves Have to Be in This Form

All classical waves—from sound waves to light waves—obey this general equation because they are all fundamentally governed by the same underlying physical principles. The derivation of the wave equation relies on two key ideas: a **restoring force** and **inertia**.

1.  **Restoring Force (Elasticity):** A wave is a disturbance that travels through a medium, and the medium must have a property that allows it to "spring back" to its original position after being disturbed. For example, a stretched string has tension, and air has pressure and density, which act as restoring forces. The strength of this restoring force is directly related to the **spatial curvature** of the wave, which is represented by the second partial derivative with respect to position ($\frac{\partial^2u}{\partial x^2}$ or $\nabla^2u$). The more curved the wave, the stronger the restoring force trying to flatten it out.

2.  **Inertia:** The particles in the medium have mass, and according to **Newton's Second Law ($F=ma$)**, a force causes acceleration. In the context of a wave, the restoring force causes the particles to accelerate. This acceleration is the second partial derivative with respect to time ($\frac{\partial^2u}{\partial t^2}$).

The wave equation simply states that at any given point, the **acceleration of the medium's displacement is proportional to the spatial curvature of the wave at that point**. The constant of proportionality is the wave speed squared ($v^2$), which depends on the specific properties of the medium (e.g., tension and mass density for a string; bulk modulus and mass density for a sound wave).
