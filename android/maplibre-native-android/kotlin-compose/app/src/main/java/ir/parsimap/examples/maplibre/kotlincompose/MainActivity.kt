package ir.parsimap.examples.maplibre.kotlincompose

import android.net.Uri
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.stringResource
import org.maplibre.compose.camera.CameraPosition
import org.maplibre.compose.map.MapEvent
import org.maplibre.compose.map.MaplibreMap
import org.maplibre.compose.map.rememberMapState
import org.maplibre.compose.style.BaseStyle
import org.maplibre.spatialk.geojson.Position

private const val STYLE_ID = "parsimap-streets-v11"

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent { ParsimapMap() }
    }
}

@Composable
fun ParsimapMap() {
    val token = BuildConfig.PARSIMAP_MAP_TOKEN
    if (token.isBlank() || token == "YOUR_TOKEN_HERE") {
        MapError(stringResource(R.string.error_missing_token))
        return
    }

    // The map state, including the camera, survives configuration changes.
    val state = rememberMapState(
        baseStyle = BaseStyle.Uri("https://api.parsimap.ir/styles/$STYLE_ID?key=${Uri.encode(token)}"),
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
        if (failed) MapError(stringResource(R.string.error_map_load))
    }
}
