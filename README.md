# Video Downloader für Rechnerarchitektur Vorlesung

Dies ist ein Programm zum herunterladen der Videos und Folien für die Vorlesung Rechnerarchitektur. Es werden automatisch Ordner für die jeweilige Vorlesungswoche erstellt und die Dateinamen entsprechen den Namen der jeweiligen Einheit.


## Lokal Ausführen

Zum Ausführen des Projektes ist eine Installation von [git](https://git-scm.com/downloads) und [node](https://nodejs.org/en/download/) notwendig.

Um zu überprüfen ob git und node installiert ist können die folgenden Befehle genutzt werden:
```bash
git --version
```
und
```bash
node --version
```

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

### Benutzername und Passwort in die `.env` eintragen

Die `.env` Datei mit einem beliebigem Editor öffnen und den Benutzername und das Passwort eintragen.
Den Benutzername und das Passwort findet ihr in der Mail zu der Veranstaltung.

**Ohne die Zugangsdaten ist der Download der Dateien nicht möglich.**

### Dependencies Installieren

```bash
npm install
```

### Starten des Downloads
Dieser Schritt wird je nach Internetverbindung eine weile dauern.

Es ist wichtig zu warten, bis das Programm beendet ist (auch wenn schon alle Dateien da sind), da die Dateien sonst unvollständig und fehlerhaft sind. 

```bash
npm run start
```

  
## License

[MIT](https://choosealicense.com/licenses/mit/)

  