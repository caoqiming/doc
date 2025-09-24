# Stable Diffusion

Stable Diffusion is a type of **Latent Diffusion Model (LDM)**. The key difference is that LDM is a general architecture or class of AI models, while Stable Diffusion is a specific, popular implementation of that architecture.

### Latent Diffusion Model (LDM)

LDMs are a class of generative AI models designed for tasks like creating high-resolution images. They operate in a compressed "latent space" rather than directly on the high-dimensional "pixel space." This is their core innovation and what makes them computationally efficient.

The process has three main parts:

1.  **Encoder**: An encoder first compresses an input image from its pixel space into a smaller, lower-dimensional representation in the latent space.
2.  **Diffusion**: The diffusion process, which involves adding and then progressively removing noise, occurs in this more compact latent space. This is much faster than doing it on the full-sized image.
3.  **Decoder**: After the denoising is complete, a decoder translates the final latent representation back into a full-resolution image in pixel space.

### Stable Diffusion

**Stable Diffusion** is the most well-known example of an LDM. It was trained on a massive dataset of image-text pairs and is primarily known for its ability to generate high-quality, photorealistic images from text prompts.

It's "stable" because its architecture is designed to be more computationally efficient, allowing it to run on consumer-grade GPUs, unlike many of its predecessors that required extensive computational resources.
