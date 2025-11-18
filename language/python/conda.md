# conda

Conda is a powerful command line tool for package and environment management. [getting-started](https://docs.conda.io/projects/conda/en/latest/user-guide/getting-started.html)

## install

```bash
mkdir -p ~/miniconda3
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh -O ~/miniconda3/miniconda.sh
bash ~/miniconda3/miniconda.sh -b -u -p ~/miniconda3
rm ~/miniconda3/miniconda.sh
```

重启 terminal，或

```bash
source ~/miniconda3/bin/activate
```

## usage

```bash
# create a new environment
conda create -n <env-name> python=3.9

# list all environments
conda info --envs

conda env remove --name <env-name>
```

## Installing packages

```bash
# via environment activation
conda activate myenvironment
conda install matplotlib

# via command line option
conda install --name myenvironment matplotlib
```

```bash
# from requirements
conda install --yes --file requirements.txt
```

## Specifying channels

Channels are locations (on your own computer or elsewhere on the Internet) where packages are stored. By default, conda searches for packages in its default channels.

If a package you want is located in another channel, such as conda-forge, you can manually specify the channel when installing the package:

```bash
conda install conda-forge::numpy
```

> You can also override the default channels in your .condarc file.

## export environment

```bash
# export
conda env export > environment.yml
# create
conda env create -f environment.yml
```
