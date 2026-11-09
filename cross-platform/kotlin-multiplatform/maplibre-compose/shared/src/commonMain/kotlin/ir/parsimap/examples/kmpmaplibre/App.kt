package ir.parsimap.examples.kmpmaplibre

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.RowScope
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.safeDrawingPadding
import androidx.compose.foundation.selection.selectable
import androidx.compose.foundation.selection.selectableGroup
import androidx.compose.foundation.text.BasicText
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.semantics.Role
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextDecoration
import androidx.compose.ui.unit.dp

/** Shows the vector or the raster map, clear of the system bars, with tabs to switch between them. */
@Composable
fun App() {
    var raster by rememberSaveable { mutableStateOf(false) }

    Column(Modifier.fillMaxSize().background(Color.White).safeDrawingPadding()) {
        Row(Modifier.selectableGroup()) {
            MapTab("Vector", selected = !raster) { raster = false }
            MapTab("Raster", selected = raster) { raster = true }
        }
        Box(Modifier.weight(1f)) {
            if (raster) RasterMap() else VectorMap()
        }
    }
}

@Composable
private fun RowScope.MapTab(label: String, selected: Boolean, onClick: () -> Unit) {
    BasicText(
        text = label,
        style = TextStyle(
            textAlign = TextAlign.Center,
            fontWeight = if (selected) FontWeight.Bold else FontWeight.Normal,
            textDecoration = if (selected) TextDecoration.Underline else TextDecoration.None,
        ),
        modifier = Modifier
            .weight(1f)
            .selectable(selected = selected, role = Role.Tab, onClick = onClick)
            .padding(12.dp),
    )
}
