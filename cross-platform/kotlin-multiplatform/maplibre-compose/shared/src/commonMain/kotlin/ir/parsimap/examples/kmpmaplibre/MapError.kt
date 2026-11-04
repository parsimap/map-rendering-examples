package ir.parsimap.examples.kmpmaplibre

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.safeDrawingPadding
import androidx.compose.foundation.text.BasicText
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.semantics.LiveRegionMode
import androidx.compose.ui.semantics.liveRegion
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.unit.dp

/** Shows [message] above the map, clear of the system bars. */
@Composable
fun MapError(message: String) {
    BasicText(
        text = message,
        style = TextStyle(color = Color(0xFFB00020)),
        modifier = Modifier
            .safeDrawingPadding()
            .padding(16.dp)
            .fillMaxWidth()
            .background(Color.White)
            .padding(12.dp)
            .semantics { liveRegion = LiveRegionMode.Assertive },
    )
}
