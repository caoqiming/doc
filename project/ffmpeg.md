# ffmpeg

```bash
docker run --rm \
-e PUID=501 \
-e PGID=20 \
-v "/Users/glimmer/Desktop/test:/data" \
linuxserver/ffmpeg \
-i "/data/a.mov" -c:v libx264 -preset medium -crf 23 -c:a aac -b:a 128k -movflags +faststart "/data/a.mp4"
```

```bash
docker run --rm -v "/Users/glimmer/Desktop/test:/data" jrottenberg/ffmpeg -i "/data/a.mov" -c:v libx264 -preset medium -crf 23 -c:a aac -b:a 128k -movflags +faststart "/data/a.mp4"
```
