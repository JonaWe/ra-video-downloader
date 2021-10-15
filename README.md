# Video Downloader für Rechnerarchitektur Vorlesung

Dies ist ein Programm zum herunterladen der Videos und Folien für die Vorlesung Rechnerarchitektur.


## Lokal Ausführen

Zum Ausführen des Projektes ist eine Installertion von [git](https://git-scm.com/downloads) und [node](https://nodejs.org/en/download/) notwendig.

### Klonen des Projektes

```bash
git clone https://github.com/JonaWe/ra-video-downloader.git
```

### Zum Projekt Ordner wechseln

```bash
cd ra-video-downloader
```

### Die Datei `.env.example` zu `.env` umbenennen

Unix Systeme:
```bash
mv .env.example .env
```

Windows Systeme:
```bash
move .env.example .env
```

### Dependencies Installieren

```bash
npm install
```

### Starten des Downloads
Dieser Schritt wird je nach Internetverbindung eine weile dauern, 

```bash
npm run start
```

  
## License

[MIT](https://choosealicense.com/licenses/mit/)

  