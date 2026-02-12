import java.io.File
import java.nio.file.Files
import java.nio.file.Path
import java.nio.file.StandardCopyOption
import java.time.LocalDate
import java.time.ZoneId

fun main() {
    // Wo kommen die Bilder her und wo werden sie gespeichert?
    val sourceRoot = Path.of("F:\\source")    // Ordner mit Tagesordnern (z.B. 2009-12-01)
    val targetRoot = Path.of("F:\\SeasonShift")    // Zielordner für ausgewählte Bilder

    // Welche Jahre und Monate interessieren uns für den PoC?
    val allowedYears = setOf(2021) // Jahr
    val winterMonths = setOf(1) // Januar
    val springMonths = setOf(4) // April
    val summerMonths = setOf(7) // Juli
    val autumnMonths = setOf(10) // Oktober

    // Zeitkonfiguration
    val timezone = ZoneId.of("Europe/Berlin")
    val targetHour = 12           // wir suchen Bilder um 12 Uhr
    val targetMinute = 0          // möglichst genau 12:00

    println("Starte Bildselektion...")
    println("Quelle: $sourceRoot")
    println("Ziel:   $targetRoot")

    Files.createDirectories(targetRoot)

    // Direkt über alle Tagesordner iterieren (z.B. 2009-12-01)
    Files.list(sourceRoot).use { dayFolders ->
        dayFolders
            .filter { Files.isDirectory(it) }
            .forEach { dayPath ->
                val dayName = dayPath.fileName.toString()   // z.B. "2009-12-01"

                // Versuchen, aus dem Ordnernamen ein Datum zu machen
                val date = try {
                    LocalDate.parse(dayName) // erwartet Format YYYY-MM-DD
                } catch (e: Exception) {
                    println("Überspringe Ordner (kein Datum): $dayName")
                    return@forEach
                }

                val year = date.year
                val month = date.monthValue

                if (year !in allowedYears) {
                    // Jahr unwichtig
                    return@forEach
                }

                val season = seasonFromMonth(
                    month = month,
                    winter = winterMonths,
                    spring = springMonths,
                    summer = summerMonths,
                    autumn = autumnMonths
                ) ?: run {
                    // Monat gehört zu keiner der definierten Saisons
                    return@forEach
                }

                println("➜ Verarbeite $dayName ($season)")

                // pro Tag genau EIN Bild auswählen
                selectMiddayImageFromDay(
                    dayPath = dayPath,
                    season = season,
                    year = year,
                    month = month,
                    targetRoot = targetRoot,
                    timezone = timezone,
                    targetHour = targetHour,
                    targetMinute = targetMinute
                )
            }
    }

    println("Fertig")
}


// Ordnet Monate Jahreszeiten zu.
fun seasonFromMonth(
    month: Int,
    winter: Set<Int>,
    spring: Set<Int>,
    summer: Set<Int>,
    autumn: Set<Int>
): String? = when (month) {
    in winter -> "winter"
    in spring -> "spring"
    in summer -> "summer"
    in autumn -> "autumn"
    else -> null
}

// Wählt aus einem Tagesordner das Bild, das am nächsten an 12:00 liegt.
fun selectMiddayImageFromDay(
    dayPath: Path,
    season: String,
    year: Int,
    month: Int,
    targetRoot: Path,
    timezone: ZoneId,
    targetHour: Int,
    targetMinute: Int
) {
    val images = Files.list(dayPath)
        .filter { Files.isRegularFile(it) && isImageFile(it.toFile()) }
        .toList()

    if (images.isEmpty()) return

    data class Candidate(
        val file: Path,
        val score: Int
    )

    val candidates = images.mapNotNull { path ->
        val (hour, minute) = readTimeFromFilename(path.toFile())
            ?: return@mapNotNull null

        val diffMinutes = kotlin.math.abs((hour - targetHour) * 60 + (minute - targetMinute))

        Candidate(path, diffMinutes)
    }

    if (candidates.isEmpty()) return

    val best = candidates.minByOrNull { it.score } ?: return

    val dayName = dayPath.fileName.toString()
    val monthPadded = month.toString().padStart(2, '0')

    val targetDir = targetRoot
        .resolve(season)
        .resolve("${year}_$monthPadded")

    Files.createDirectories(targetDir)

    val targetFile = targetDir.resolve("${year}_${monthPadded}_${dayName}_${best.file.fileName}")

    Files.copy(best.file, targetFile, StandardCopyOption.REPLACE_EXISTING)

    println("$season: Tag $dayName -> ${targetFile.fileName}")
}

// Extrahiert die Uhrzeit aus dem Dateinamen
fun readTimeFromFilename(file: File): Pair<Int, Int>? {
    val name = file.nameWithoutExtension

    val underlineIndex = name.lastIndexOf("_")
    if (underlineIndex == -1) return null

    val timePart = name.substring(underlineIndex + 1)   // z.B. "04-28-13-70"
    val parts = timePart.split("-")
    if (parts.size < 2) return null

    val hour = parts[0].toIntOrNull() ?: return null
    val minute = parts[1].toIntOrNull() ?: return null

    return hour to minute
}

// Prüft, ob die Datei ein Bild ist
fun isImageFile(file: File): Boolean {
    val name = file.name.lowercase()
    return name.endsWith(".jpg") || name.endsWith(".jpeg") || name.endsWith(".png")
}

// Stream in Liste umwandeln (weil .use nur einmal durchläuft)
fun <T> java.util.stream.Stream<T>.toList(): List<T> =
    this.collect(java.util.stream.Collectors.toList())