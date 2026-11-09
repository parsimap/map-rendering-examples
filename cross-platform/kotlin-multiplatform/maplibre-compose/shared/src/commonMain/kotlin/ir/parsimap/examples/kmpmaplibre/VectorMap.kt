package ir.parsimap.examples.kmpmaplibre

import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import org.maplibre.compose.camera.CameraPosition
import org.maplibre.compose.map.MapEvent
import org.maplibre.compose.map.MaplibreMap
import org.maplibre.compose.map.rememberMapState
import org.maplibre.compose.style.BaseStyle
import org.maplibre.spatialk.geojson.Position

private const val STYLE_ID = "parsimap-streets-v11"

@Composable
fun VectorMap() {
    if (!hasMapToken) {
        MapError("Set your token in local.properties.")
        return
    }

    // The map state, including the camera, survives configuration changes.
    val state = rememberMapState(
        baseStyle = BaseStyle.Uri("https://api.parsimap.ir/styles/$STYLE_ID?key=$encodedMapToken"),
        initialCameraPosition = CameraPosition(
            center = Position(latitude = 35.6892, longitude = 51.389),
            zoom = 11.0,
        ),
    )

    var failed by rememberSaveable { mutableStateOf(false) }
    LaunchedEffect(state) {
        state.events.collect { event ->
            if (event is MapEvent.StyleLoadFailed) failed = true
        }
    }

    Box(Modifier.fillMaxSize()) {
        MaplibreMap(state = state)
        if (failed) MapError("The map could not load. Check your token and network connection.")
    }
}
