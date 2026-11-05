// SPDX-FileCopyrightText: 2026 Progmasoft <support@progmasoft.com>
// SPDX-License-Identifier: AGPL-3.0-or-later WITH AdditionRef-Progmasoft-Patent-Grant-1.1

import type { Locale } from "./locales";
import type { HomeText } from "./types";

export const projectSample = `project {
  name = "Example"
  version = "0.1.0"
}

compiler {
  buildMode = BuildMode.RELEASE
  warnings = Warnings.ALL
}

sources {
  executable {
    entry = "Example.Program"
  }
}`;

export const terminalSample = `$ tazel build
   Compiling Example (Example, 12 sources)
    Finished build in 4.21s
$ tazel build
       Fresh Example (Example, 12 sources)
    Finished build in 0.31s
$ tazel run -- --port 8080`;

export const home: Record<Locale, HomeText> = {
  "en-US": {
    title: "Tazel — The build system of Tala",
    description:
      "Tazel builds, runs, tests, formats and lints Tala projects from one Kotlin project file, and keeps their dependencies in a lockfile.",
    eyebrow: "The build system of Tala",
    headline: "One project file. One command for each job.",
    lead: "Tazel reads a Kotlin project file, starts Talac, talafmt and talalint for you, and records every dependency in a lockfile. The name joins Tala and Bazel.",
    start: "Get started",
    commands: "Commands",
    release: "Tazel {version}",
    featuresHeading: "What Tazel does",
    featuresLead:
      "One program for the whole life of a Tala project, from the first build to the published package.",
    features: [
      {
        title: "A project file in Kotlin",
        text: "BUILD.kts is a Kotlin script with a typed DSL, so an editor completes and checks it. Tazel runs it with its own scripting host: a JRE 25 is all a machine needs.",
      },
      {
        title: "Only what changed",
        text: "A target compiles again only when its sources, its settings or the compiler changed. Everything else is reported as fresh and left alone.",
      },
      {
        title: "The whole machine",
        text: "Plugin steps, compilations and test suites are units of one graph and run side by side. --jobs, --cpus and --memory set the limits, and --profile writes a trace.",
      },
      {
        title: "Cache and remote builds",
        text: "Build results go into a cache that a team can share. --remote-executor compiles on a trusted machine that runs tazel remote serve.",
      },
      {
        title: "A lockfile you can read",
        text: "LOCK.sqlite3 records what a project depends on, LOCK.dump writes it as text for review, and tazel lock graph shows who uses what.",
      },
      {
        title: "Plugins in Kotlin",
        text: "A plugin is a JAR, local or from ViGet, that extends the project file. Tazel checks its descriptor and its SHA-256 before it loads it.",
      },
    ],
    stepsHeading: "From project file to program",
    steps: [
      {
        title: "Describe",
        text: "Name the project and its targets in BUILD.kts. Sources are the .tala files below Sources/.",
      },
      {
        title: "Build",
        text: "tazel build starts Talac with the options of the project and writes the program to build/debug or build/release.",
      },
      {
        title: "Run and test",
        text: "tazel run builds one executable and starts it; tazel test builds and runs the test suites.",
      },
    ],
    sampleHeading: "Every project starts the same way",
    sampleLead:
      "A few lines name the project and its program; the second build finds nothing to do.",
    closingHeading: "Free software, built in the open",
    closingText:
      "The source of Tazel, its issues and its releases are on GitHub. Talac, talafmt and talalint are separate programs with their own releases.",
    closingAction: "Tazel on GitHub",
  },
  "de-DE": {
    title: "Tazel — Das Build-System von Tala",
    description:
      "Tazel baut, startet, testet, formatiert und prüft Tala-Projekte aus einer Kotlin-Projektdatei und hält ihre Abhängigkeiten in einer Lockdatei fest.",
    eyebrow: "Das Build-System von Tala",
    headline: "Eine Projektdatei. Ein Befehl für jede Aufgabe.",
    lead: "Tazel liest eine Projektdatei in Kotlin, startet Talac, talafmt und talalint für Sie und hält jede Abhängigkeit in einer Lockdatei fest. Der Name verbindet Tala und Bazel.",
    start: "Loslegen",
    commands: "Befehle",
    release: "Tazel {version}",
    featuresHeading: "Was Tazel tut",
    featuresLead:
      "Ein Programm für das ganze Leben eines Tala-Projekts, vom ersten Build bis zum veröffentlichten Paket.",
    features: [
      {
        title: "Eine Projektdatei in Kotlin",
        text: "BUILD.kts ist ein Kotlin-Skript mit typisierter DSL, also ergänzt und prüft es ein Editor. Tazel führt es mit seinem eigenen Skript-Host aus: Eine JRE 25 ist alles, was ein Rechner braucht.",
      },
      {
        title: "Nur, was sich geändert hat",
        text: "Ein Ziel wird nur neu kompiliert, wenn sich seine Quellen, seine Einstellungen oder der Compiler geändert haben. Alles andere gilt als aktuell und bleibt unberührt.",
      },
      {
        title: "Der ganze Rechner",
        text: "Plugin-Schritte, Kompilierungen und Testsuiten sind Einheiten eines Graphen und laufen nebeneinander. --jobs, --cpus und --memory setzen die Grenzen, --profile schreibt einen Trace.",
      },
      {
        title: "Cache und entfernte Builds",
        text: "Build-Ergebnisse landen in einem Cache, den ein Team teilen kann. --remote-executor kompiliert auf einem vertrauenswürdigen Rechner, der tazel remote serve ausführt.",
      },
      {
        title: "Eine lesbare Lockdatei",
        text: "LOCK.sqlite3 hält fest, wovon ein Projekt abhängt, LOCK.dump schreibt es als Text zur Durchsicht, und tazel lock graph zeigt, wer was verwendet.",
      },
      {
        title: "Plugins in Kotlin",
        text: "Ein Plugin ist ein JAR, lokal oder aus ViGet, das die Projektdatei erweitert. Tazel prüft seinen Deskriptor und seine SHA-256, bevor es geladen wird.",
      },
    ],
    stepsHeading: "Von der Projektdatei zum Programm",
    steps: [
      {
        title: "Beschreiben",
        text: "Nennen Sie das Projekt und seine Ziele in BUILD.kts. Quellen sind die .tala-Dateien unter Sources/.",
      },
      {
        title: "Bauen",
        text: "tazel build startet Talac mit den Optionen des Projekts und schreibt das Programm nach build/debug oder build/release.",
      },
      {
        title: "Starten und testen",
        text: "tazel run baut eine ausführbare Datei und startet sie; tazel test baut die Testsuiten und führt sie aus.",
      },
    ],
    sampleHeading: "Jedes Projekt beginnt gleich",
    sampleLead:
      "Ein paar Zeilen nennen das Projekt und sein Programm; der zweite Build findet nichts zu tun.",
    closingHeading: "Freie Software, offen entwickelt",
    closingText:
      "Der Quellcode von Tazel, seine Issues und seine Releases liegen auf GitHub. Talac, talafmt und talalint sind eigene Programme mit eigenen Releases.",
    closingAction: "Tazel auf GitHub",
  },
  "ru-RU": {
    title: "Tazel — Система сборки Tala",
    description:
      "Tazel собирает, запускает, тестирует, форматирует и проверяет проекты Tala по одному файлу проекта на Kotlin и хранит их зависимости в lock-файле.",
    eyebrow: "Система сборки Tala",
    headline: "Один файл проекта. Одна команда на каждую задачу.",
    lead: "Tazel читает файл проекта на Kotlin, сам запускает Talac, talafmt и talalint и записывает каждую зависимость в lock-файл. Название соединяет Tala и Bazel.",
    start: "Начать",
    commands: "Команды",
    release: "Tazel {version}",
    featuresHeading: "Что делает Tazel",
    featuresLead:
      "Одна программа на всю жизнь проекта Tala — от первой сборки до опубликованного пакета.",
    features: [
      {
        title: "Файл проекта на Kotlin",
        text: "BUILD.kts — скрипт Kotlin с типизированным DSL, поэтому редактор дополняет и проверяет его. Tazel выполняет его своим скриптовым хостом: машине нужна только JRE 25.",
      },
      {
        title: "Только то, что изменилось",
        text: "Цель компилируется заново, только если изменились её исходники, настройки или компилятор. Всё остальное считается актуальным и не трогается.",
      },
      {
        title: "Вся машина",
        text: "Шаги плагинов, компиляции и наборы тестов — единицы одного графа и выполняются параллельно. --jobs, --cpus и --memory задают пределы, а --profile записывает трассировку.",
      },
      {
        title: "Кэш и удалённая сборка",
        text: "Результаты сборки попадают в кэш, который может делить команда. --remote-executor компилирует на доверенной машине, где запущен tazel remote serve.",
      },
      {
        title: "Читаемый lock-файл",
        text: "LOCK.sqlite3 записывает, от чего зависит проект, LOCK.dump выводит это текстом для ревью, а tazel lock graph показывает, кто что использует.",
      },
      {
        title: "Плагины на Kotlin",
        text: "Плагин — это JAR, локальный или из ViGet, который расширяет файл проекта. Tazel проверяет его дескриптор и SHA-256, прежде чем загрузить.",
      },
    ],
    stepsHeading: "От файла проекта к программе",
    steps: [
      {
        title: "Описать",
        text: "Назовите проект и его цели в BUILD.kts. Исходники — это файлы .tala в Sources/.",
      },
      {
        title: "Собрать",
        text: "tazel build запускает Talac с параметрами проекта и записывает программу в build/debug или build/release.",
      },
      {
        title: "Запустить и проверить",
        text: "tazel run собирает один исполняемый файл и запускает его; tazel test собирает и запускает наборы тестов.",
      },
    ],
    sampleHeading: "Каждый проект начинается одинаково",
    sampleLead: "Несколько строк называют проект и его программу; вторая сборка не находит работы.",
    closingHeading: "Свободное ПО, разработка в открытую",
    closingText:
      "Исходный код Tazel, задачи и выпуски находятся на GitHub. Talac, talafmt и talalint — отдельные программы со своими выпусками.",
    closingAction: "Tazel на GitHub",
  },
  "he-IL": {
    title: "Tazel — מערכת הבנייה של Tala",
    description:
      "‏Tazel בונה, מריצה, בודקת, מעצבת ומנתחת פרויקטים של Tala מקובץ פרויקט אחד ב-Kotlin, ושומר את התלויות שלהם בקובץ נעילה.",
    eyebrow: "מערכת הבנייה של Tala",
    headline: "קובץ פרויקט אחד. פקודה אחת לכל משימה.",
    lead: "‏Tazel קוראת קובץ פרויקט ב-Kotlin, מפעילה בשבילכם את Talac, ‏talafmt ו-talalint, ורושמת כל תלות בקובץ נעילה. השם מחבר את Tala ואת Bazel.",
    start: "מתחילים",
    commands: "פקודות",
    release: "Tazel {version}",
    featuresHeading: "מה Tazel עושה",
    featuresLead: "תוכנית אחת לכל חיי פרויקט של Tala, מהבנייה הראשונה ועד החבילה שפורסמה.",
    features: [
      {
        title: "קובץ פרויקט ב-Kotlin",
        text: "‏BUILD.kts הוא סקריפט Kotlin עם DSL בעל טיפוסים, כך שעורך משלים ובודק אותו. ‏Tazel מריצה אותו במארח הסקריפטים שלה: כל מה שמחשב צריך הוא JRE 25.",
      },
      {
        title: "רק מה שהשתנה",
        text: "יעד מהודר מחדש רק כשהמקורות, ההגדרות או המהדר שלו השתנו. כל השאר מדווח כעדכני ונשאר כמו שהוא.",
      },
      {
        title: "המחשב כולו",
        text: "צעדי תוספים, הידורים וחבילות בדיקה הם יחידות בגרף אחד ורצים זה לצד זה. ‎--jobs, ‏‎--cpus ו-‎--memory קובעים את הגבולות, ו-‎--profile כותב עקבה.",
      },
      {
        title: "מטמון ובנייה מרחוק",
        text: "תוצאות הבנייה נשמרות במטמון שצוות יכול לשתף. ‎--remote-executor מהדר במחשב מהימן שמריץ את tazel remote serve.",
      },
      {
        title: "קובץ נעילה קריא",
        text: "‏LOCK.sqlite3 רושם במה הפרויקט תלוי, ‏LOCK.dump כותב זאת כטקסט לסקירה, ו-tazel lock graph מראה מי משתמש במה.",
      },
      {
        title: "תוספים ב-Kotlin",
        text: "תוסף הוא JAR, מקומי או מ-ViGet, שמרחיב את קובץ הפרויקט. ‏Tazel בודקת את המתאר שלו ואת ה-SHA-256 שלו לפני שהיא טוענת אותו.",
      },
    ],
    stepsHeading: "מקובץ פרויקט לתוכנית",
    steps: [
      {
        title: "לתאר",
        text: "כתבו ב-BUILD.kts את שם הפרויקט ואת היעדים שלו. המקורות הם קובצי ‎.tala שמתחת ל-Sources/.",
      },
      {
        title: "לבנות",
        text: "‏tazel build מפעילה את Talac עם האפשרויות של הפרויקט וכותבת את התוכנית ל-build/debug או ל-build/release.",
      },
      {
        title: "להריץ ולבדוק",
        text: "‏tazel run בונה קובץ הרצה אחד ומפעילה אותו; ‏tazel test בונה ומריצה את חבילות הבדיקה.",
      },
    ],
    sampleHeading: "כל פרויקט מתחיל באותה דרך",
    sampleLead: "כמה שורות נותנות שם לפרויקט ולתוכנית שלו; הבנייה השנייה לא מוצאת מה לעשות.",
    closingHeading: "תוכנה חופשית, שמפותחת בגלוי",
    closingText:
      "קוד המקור של Tazel, הבעיות והגרסאות שלו נמצאים ב-GitHub. ‏Talac, ‏talafmt ו-talalint הן תוכניות נפרדות עם גרסאות משלהן.",
    closingAction: "Tazel ב-GitHub",
  },
};
