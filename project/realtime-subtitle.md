# realtime subtitle

## pypi

```bash
cd /Users/glimmer/Documents/code/playground/glimmer-whisper
# update version in glimmer-whisper/pyproject.toml
python -m build
# upload to pypi
python3 -m twine upload dist/*
```

## py2app

```bash
cd /Users/glimmer/Documents/code/playground/glimmer-whisper
# 生成一个 setup.py
py2applet --make-setup ./src/realtime_subtitle/ui.py


rm -rf build dist
python setup.py py2app
```

加了这个也还不 work

```python
import sys
sys.setrecursionlimit(1000000)
```
