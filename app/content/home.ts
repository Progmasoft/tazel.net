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
    title: "Tazel — Build system and package manager",
    description:
      "Tazel builds, runs and tests projects from one Kotlin project file and keeps their dependencies in a lockfile. It builds Tala with Talac, and other languages, such as C and C++, through plugins.",
    eyebrow: "Build system and package manager",
    headline: "One project file. One command for each job.",
    lead: "Tazel reads a Kotlin project file, runs every step of the build as one graph and records each dependency in a lockfile. Tala targets compile with Talac; plugins build other languages, such as C and C++ with Progmasoft.CC or a CMake project with Progmasoft.CMake.",
    start: "A first project",
    commands: "Commands",
    featuresHeading: "What Tazel does",
    featuresLead:
      "One program for the whole life of a project, from the first build to the published package.",
    features: [
      {
        title: "A project file in Kotlin",
        text: "The project file is a Kotlin script with a typed DSL, so an editor completes and checks it. It is named BUILD.kts, BUILD.tzl, BUILD.tazel, BUILD or Tazel.build; Tazel runs it with its own scripting host, and a JRE 25 is all a machine needs.",
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
        text: "A plugin is a JAR, local or from ViGet, that adds blocks to the project file and steps to the build, such as cc { } for C and C++. Tazel checks its descriptor and its SHA-256 before it loads it.",
      },
    ],
    stepsHeading: "From project file to program",
    steps: [
      {
        title: "Describe",
        text: "Name the project and its targets in the project file: Tala sources below Sources/, or the blocks of a plugin.",
      },
      {
        title: "Build",
        text: "tazel build runs the steps of the plugins, compiles the Tala targets with Talac and writes the program to build/debug or build/release.",
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
      "The source of Tazel, its issues and its releases are on GitHub. Talac, talafmt and talalint are separate programs with their own releases; a project needs them only for Tala targets.",
    closingAction: "Tazel on GitHub",
  },
  "de-DE": {
    title: "Tazel — Build-System und Paketmanager",
    description:
      "Tazel baut, startet und testet Projekte aus einer Kotlin-Projektdatei und hält ihre Abhängigkeiten in einer Lockdatei fest. Tala baut es mit Talac, andere Sprachen wie C und C++ über Plugins.",
    eyebrow: "Build-System und Paketmanager",
    headline: "Eine Projektdatei. Ein Befehl für jede Aufgabe.",
    lead: "Tazel liest eine Projektdatei in Kotlin, führt jeden Schritt des Builds als einen Graphen aus und hält jede Abhängigkeit in einer Lockdatei fest. Tala-Ziele kompiliert Talac; Plugins bauen andere Sprachen, etwa C und C++ mit Progmasoft.CC oder ein CMake-Projekt mit Progmasoft.CMake.",
    start: "Ein erstes Projekt",
    commands: "Befehle",
    featuresHeading: "Was Tazel tut",
    featuresLead:
      "Ein Programm für das ganze Leben eines Projekts, vom ersten Build bis zum veröffentlichten Paket.",
    features: [
      {
        title: "Eine Projektdatei in Kotlin",
        text: "Die Projektdatei ist ein Kotlin-Skript mit typisierter DSL, also ergänzt und prüft sie ein Editor. Sie heißt BUILD.kts, BUILD.tzl, BUILD.tazel, BUILD oder Tazel.build; Tazel führt sie mit seinem eigenen Skript-Host aus, und eine JRE 25 ist alles, was ein Rechner braucht.",
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
        text: "Ein Plugin ist ein JAR, lokal oder aus ViGet, das der Projektdatei Blöcke und dem Build Schritte hinzufügt, etwa cc { } für C und C++. Tazel prüft seinen Deskriptor und seine SHA-256, bevor es geladen wird.",
      },
    ],
    stepsHeading: "Von der Projektdatei zum Programm",
    steps: [
      {
        title: "Beschreiben",
        text: "Nennen Sie das Projekt und seine Ziele in der Projektdatei: Tala-Quellen unter Sources/ oder die Blöcke eines Plugins.",
      },
      {
        title: "Bauen",
        text: "tazel build führt die Schritte der Plugins aus, kompiliert die Tala-Ziele mit Talac und schreibt das Programm nach build/debug oder build/release.",
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
      "Der Quellcode von Tazel, seine Issues und seine Releases liegen auf GitHub. Talac, talafmt und talalint sind eigene Programme mit eigenen Releases; ein Projekt braucht sie nur für Tala-Ziele.",
    closingAction: "Tazel auf GitHub",
  },
  "ru-RU": {
    title: "Tazel — система сборки и менеджер пакетов",
    description:
      "Tazel собирает, запускает и тестирует проекты по одному файлу проекта на Kotlin и хранит их зависимости в lock-файле. Tala он собирает с помощью Talac, другие языки, например C и C++, — через плагины.",
    eyebrow: "Система сборки и менеджер пакетов",
    headline: "Один файл проекта. Одна команда на каждую задачу.",
    lead: "Tazel читает файл проекта на Kotlin, выполняет все шаги сборки как один граф и записывает каждую зависимость в lock-файл. Цели Tala компилирует Talac; плагины собирают другие языки, например C и C++ с Progmasoft.CC или проект CMake с Progmasoft.CMake.",
    start: "Первый проект",
    commands: "Команды",
    featuresHeading: "Что делает Tazel",
    featuresLead:
      "Одна программа на всю жизнь проекта — от первой сборки до опубликованного пакета.",
    features: [
      {
        title: "Файл проекта на Kotlin",
        text: "Файл проекта — скрипт Kotlin с типизированным DSL, поэтому редактор дополняет и проверяет его. Он называется BUILD.kts, BUILD.tzl, BUILD.tazel, BUILD или Tazel.build; Tazel выполняет его своим скриптовым хостом, и машине нужна только JRE 25.",
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
        text: "Плагин — это JAR, локальный или из ViGet, который добавляет блоки в файл проекта и шаги в сборку, например cc { } для C и C++. Tazel проверяет его дескриптор и SHA-256, прежде чем загрузить.",
      },
    ],
    stepsHeading: "От файла проекта к программе",
    steps: [
      {
        title: "Описать",
        text: "Назовите проект и его цели в файле проекта: исходники Tala в Sources/ или блоки плагина.",
      },
      {
        title: "Собрать",
        text: "tazel build выполняет шаги плагинов, компилирует цели Tala с помощью Talac и записывает программу в build/debug или build/release.",
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
      "Исходный код Tazel, задачи и выпуски находятся на GitHub. Talac, talafmt и talalint — отдельные программы со своими выпусками; проекту они нужны только для целей Tala.",
    closingAction: "Tazel на GitHub",
  },
  "he-IL": {
    title: "Tazel — מערכת בנייה ומנהל חבילות",
    description:
      "‏Tazel בונה, מריצה ובודקת פרויקטים מקובץ פרויקט אחד ב-Kotlin, ושומרת את התלויות שלהם בקובץ נעילה. את Tala היא בונה עם Talac, ושפות אחרות, כמו C ו-C++, דרך תוספים.",
    eyebrow: "מערכת בנייה ומנהל חבילות",
    headline: "קובץ פרויקט אחד. פקודה אחת לכל משימה.",
    lead: "‏Tazel קוראת קובץ פרויקט ב-Kotlin, מריצה כל צעד של הבנייה כגרף אחד ורושמת כל תלות בקובץ נעילה. יעדי Tala מהודרים עם Talac; תוספים בונים שפות אחרות, כמו C ו-C++ עם Progmasoft.CC או פרויקט CMake עם Progmasoft.CMake.",
    start: "פרויקט ראשון",
    commands: "פקודות",
    featuresHeading: "מה Tazel עושה",
    featuresLead: "תוכנית אחת לכל חיי הפרויקט, מהבנייה הראשונה ועד החבילה שפורסמה.",
    features: [
      {
        title: "קובץ פרויקט ב-Kotlin",
        text: "קובץ הפרויקט הוא סקריפט Kotlin עם DSL בעל טיפוסים, כך שעורך משלים ובודק אותו. שמו BUILD.kts, ‏BUILD.tzl, ‏BUILD.tazel, ‏BUILD או Tazel.build; ‏Tazel מריצה אותו במארח הסקריפטים שלה, וכל מה שמחשב צריך הוא JRE 25.",
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
        text: "תוסף הוא JAR, מקומי או מ-ViGet, שמוסיף בלוקים לקובץ הפרויקט וצעדים לבנייה, כמו cc { } עבור C ו-C++. ‏Tazel בודקת את המתאר שלו ואת ה-SHA-256 שלו לפני שהיא טוענת אותו.",
      },
    ],
    stepsHeading: "מקובץ פרויקט לתוכנית",
    steps: [
      {
        title: "לתאר",
        text: "כתבו בקובץ הפרויקט את שם הפרויקט ואת היעדים שלו: מקורות Tala שמתחת ל-Sources/, או הבלוקים של תוסף.",
      },
      {
        title: "לבנות",
        text: "‏tazel build מריצה את הצעדים של התוספים, מהדרת את יעדי Tala עם Talac וכותבת את התוכנית ל-build/debug או ל-build/release.",
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
      "קוד המקור של Tazel, הבעיות והגרסאות שלו נמצאים ב-GitHub. ‏Talac, ‏talafmt ו-talalint הן תוכניות נפרדות עם גרסאות משלהן; פרויקט צריך אותן רק ליעדי Tala.",
    closingAction: "Tazel ב-GitHub",
  },
};
