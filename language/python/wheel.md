# wheel

Python wheels are a pre-built binary package format for Python modules and libraries. They are designed to make it easier to install and manage Python packages, by providing a convenient, single-file format that can be downloaded and installed without the need to compile the package from source code.

## Different types of Python Wheels

### Pure-python Wheels

These are built from source code that only depends on the Python Standard Library. They are platform-independent, meaning they can be installed on any system that has a compatible version of Python installed.
The following command is used for building a pure-python wheel from the setup.py of a package:

```bash
python setup.py bdist_wheel
```

This will create a .whl file in the dist directory that can be installed on any platform with a compatible version of Python.

### Universal Wheels

These are built from source code that depends on the Python Standard Library and additional, non-platform-specific dependencies. They are also platform-independent but may have additional dependencies that need to be installed alongside the wheel.
The following command is used for building a pure-python wheel from the setup.py of a package:

```bash
python setup.py bdist_wheel  --universal
```

This will create a .whl file in the dist directory that can be installed on any platform with a compatible version of Python and the required dependencies.

### Platform Wheels

These are built from source code that depends on the Python Standard Library and additional, platform-specific dependencies. They are not platform-independent, and can only be installed on systems that have the same platform as the one used to build the wheel.
The following command is used for building a pure-python wheel from the setup.py of a package:

```bash
python setup.py bdist_wheel --plat-name=macosx_10_6_intel
```

This will create a .whl file in the dist directory that can only be installed on macOS systems with an Intel processor running version 10.6 or later.

## Filename structure of Wheel

A sample structure of a wheel filename can be seen below:
In this format, the {distribution} field specifies the name of the Python package, the {version} field specifies the version of the package, the {build} field specifies the build number of the package, the {python} field specifies the version and implementation of Python used to build the package, the {abi} field specifies the Python ABI (Application Binary Interface) used, and the {platform} field specifies the platform-specific details of the package.

```
{distribution}-{version}-{build}-{python}-{abi}-{platform}.whl
```
