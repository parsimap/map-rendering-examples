package ir.parsimap.examples.maplibre.kotlincompose

import android.net.Uri
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.runtime.Composable
import androidx.compose.ui.res.stringResource
import org.maplibre.compose.camera.CameraPosition
import org.maplibre.compose.layers.RasterLayer
import org.maplibre.compose.map.MaplibreMap
import org.maplibre.compose.map.rememberMapState
import org.maplibre.compose.sources.rememberRasterTileSource
import org.maplibre.compose.style.BaseStyle
import org.maplibre.spatialk.geojson.Position

private const val TILESET_ID = "parsimap-streets-v11-raster"
private const val ATTRIBUTION =
    "<a href=\"https://www.mapbox.com/about/maps\">&copy; Mapbox</a> | " +
        "<a href=\"https://www.openstreetmap.org/about/\">&copy; OpenStreetMap</a> | " +
        "<a href=\"https://www.parsimap.ir\">&copy; Parsimap</a>"

class RasterMapActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent { ParsimapRasterMap() }
    }
}

@Composable
fun ParsimapRasterMap() {
    val token = BuildConfig.PARSIMAP_MAP_TOKEN
    if (token.isBlank() || token == "YOUR_TOKEN_HERE") {
        MapError(stringResource(R.string.error_missing_token))
        return
    }

    val tileUrl = "https://api.parsimap.ir/tile/$TILESET_ID/{z}/{x}/{y}?key=${Uri.encode(token)}"
    val state = rememberMapState(
        baseStyle = BaseStyle.Empty,
        initialCameraPosition = CameraPosition(
            center = Position(latitude = 35.6892, longitude = 51.389),
            zoom = 11.0,
        ),
    ) {
        val tiles = rememberRasterTileSource(tiles = listOf(tileUrl), tileSize = 256) {
            minZoom = 1
            maxZoom = 18
            attributionHtml = ATTRIBUTION
        }
        RasterLayer(id = TILESET_ID, source = tiles)
    }

    MaplibreMap(state = state)
}
