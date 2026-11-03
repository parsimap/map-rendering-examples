package ir.parsimap.examples.mapbox.kotlincompose

import android.net.Uri
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.safeDrawingPadding
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.stringResource
import com.mapbox.common.MapboxOptions
import com.mapbox.geojson.Point
import com.mapbox.maps.MapLoadingErrorType
import com.mapbox.maps.extension.compose.DisposableMapEffect
import com.mapbox.maps.extension.compose.MapboxMap
import com.mapbox.maps.extension.compose.animation.viewport.rememberMapViewportState
import com.mapbox.maps.extension.compose.style.MapStyle

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
    val parsimapToken = BuildConfig.PARSIMAP_MAP_TOKEN
    val mapboxToken = BuildConfig.MAPBOX_ACCESS_TOKEN
    if (parsimapToken.isBlank() || parsimapToken == "YOUR_TOKEN_HERE" ||
        mapboxToken.isBlank() || mapboxToken == "YOUR_MAPBOX_TOKEN_HERE"
    ) {
        MapError(stringResource(R.string.error_missing_token))
        return
    }

    // The Mapbox SDK needs a Mapbox access token before the map is created.
    MapboxOptions.accessToken = mapboxToken

    // The viewport state, including the camera, survives configuration changes.
    val viewport = rememberMapViewportState {
        setCameraOptions {
            center(Point.fromLngLat(51.389, 35.6892))
            zoom(11.0)
        }
    }

    var failed by rememberSaveable { mutableStateOf(false) }

    Box(Modifier.fillMaxSize()) {
        // Keep the map, its logo, and its attribution clear of the system bars.
        MapboxMap(
            modifier = Modifier.fillMaxSize().safeDrawingPadding(),
            mapViewportState = viewport,
            style = {
                MapStyle(style = "https://api.parsimap.ir/styles/$STYLE_ID?key=${Uri.encode(parsimapToken)}")
            },
        ) {
            DisposableMapEffect(Unit) { mapView ->
                val subscription = mapView.mapboxMap.subscribeMapLoadingError { error ->
                    if (error.type == MapLoadingErrorType.STYLE) failed = true
                }
                onDispose { subscription.cancel() }
            }
        }
        if (failed) MapError(stringResource(R.string.error_map_load))
    }
}
