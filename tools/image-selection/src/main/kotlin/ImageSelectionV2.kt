import java.io.File
import java.nio.file.Files
import java.nio.file.Path
import java.nio.file.StandardCopyOption
import java.time.LocalDate

fun main() {
    // Quelle
    val sourceRoot = Path.of("F:\\source")

    // Zielordner
    val targetRoot = Path.of("F:\\TimeMapping")

    // Jahre
    val allowedYears = setOf(2010, 2012, 2014, 2018, 2020, 2024)

    // Tag des Monats
    val targetDay = 1

    // Zeit-Slots
    val timeSlots = listOf(8, 12, 16, 20, 23)

    println("Starte Bildselektion (neue Zeitlogik)...")
    println("Quelle: $sourceRoot")
    println("Ziel:   $targetRoot")

    Files.createDirectories(targetRoot)

    // Durch alle Tagesordner iterieren
    Files.list(sourceRoot).use { dayFolders ->
        dayFolders
            .filter { Files.isDirectory(it) }
            .forEach { dayPath ->
                val dayName = dayPath.fileName.toString() // "2010-01-01"

                val date = try {
                    LocalDate.parse(dayName)
                } catch (e: Exception) {
                    // Nicht im Format YYYY-MM-DD
                    return@forEach
                }

                val year = date.year
                val month = date.monthValue
                val day = date.dayOfMonth

                // Nur gewünschte Jahre
                if (year !in allowedYears) return@forEach

                // Nur der 1. Tag des Monats
                if (day != targetDay) return@forEach

                println("➜ Verarbeite $dayName")

                // Für jede Slot-Uhrzeit ein Bild suchen + kopieren
                for (hourSlot in timeSlots) {
                    selectImageClosestToTime(
                        dayPath = dayPath,
                        year = year,
                        month = month,
                        hourSlot = hourSlot,
                        targetRoot = targetRoot
                    )
                }
            }
    }

    println("Fertig.")
}

/**
 * Wählt aus einem Tagesordner das Bild, das am nächsten an der gewünschten Uhrzeit liegt
 */
fun selectImageClosestToTime(
    dayPath: Path,
    year: Int,
    month: Int,
    hourSlot: Int,
    targetRoot: Path
) {
    val images = Files.list(dayPath)
        .filter { Files.isRegularFile(it) && isImageFile(it.toFile()) }
        .toList()

    if (images.isEmpty()) return

    data class Candidate(val file: Path, val scoreMinutes: Int)

    val candidates = images.mapNotNull { path ->
        val (hour, minute) = readTimeFromFilename(path.toFile()) ?: return@mapNotNull null

        val diffMinutes = kotlin.math.abs((hour - hourSlot) * 60 + (minute - 0))
        Candidate(path, diffMinutes)
    }

    if (candidates.isEmpty()) return

    val best = candidates.minByOrNull { it.scoreMinutes } ?: return

    val monthPadded = month.toString().padStart(2, '0')
    val hourPadded = hourSlot.toString().padStart(2, '0')

    // Zielordner: /YYYY/MM/
    val targetDir = targetRoot
        .resolve(year.toString())
        .resolve(monthPadded)

    Files.createDirectories(targetDir)

    // Ziel-Dateiname: ...HH.jpg
    val targetFile = targetDir.resolve("${hourPadded}.jpg")

    Files.copy(best.file, targetFile, StandardCopyOption.REPLACE_EXISTING)

    println("  -> $year-$monthPadded Slot $hourPadded:00 => ${best.file.fileName}  (Δ${best.scoreMinutes}min)")
}

/**
 * Extrahiert Uhrzeit aus Dateinamen
 */

fun readTimeFromFilename(file: File): Pair<Int, Int>? {
    val name = file.nameWithoutExtension

    val underlineIndex = name.lastIndexOf("_")
    if (underlineIndex == -1) return null

    val timePart = name.substring(underlineIndex + 1) // "08-00-20-96"
    val parts = timePart.split("-")
    if (parts.size < 2) return null

    val hour = parts[0].toIntOrNull() ?: return null
    val minute = parts[1].toIntOrNull() ?: return null

    return hour to minute
}

/** Prüft, ob Datei Bildformat ist */
fun isImageFile(file: File): Boolean {
    val name = file.name.lowercase()
    return name.endsWith(".jpg") || name.endsWith(".jpeg") || name.endsWith(".png")
}

/** Stream in Liste umwandeln */
fun <T> java.util.stream.Stream<T>.toList(): List<T> =
    this.collect(java.util.stream.Collectors.toList())
