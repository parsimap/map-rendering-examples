package ir.parsimap.examples.kmpmaplibre

// MAP_TOKEN is generated from local.properties by shared/build.gradle.kts.
internal val hasMapToken = MAP_TOKEN.isNotBlank() && MAP_TOKEN != "YOUR_TOKEN_HERE"

/** The token, percent-encoded for use in a URL query. */
internal val encodedMapToken = MAP_TOKEN.encodeToByteArray().joinToString("") { byte ->
    val char = byte.toInt().toChar()
    if (char in 'A'..'Z' || char in 'a'..'z' || char in '0'..'9' || char in "-._~") {
        char.toString()
    } else {
        "%" + (byte.toInt() and 0xFF).toString(16).uppercase().padStart(2, '0')
    }
}
