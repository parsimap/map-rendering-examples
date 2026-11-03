package ir.parsimap.examples.mapbox.kotlinviews

import android.net.Uri
import android.os.Bundle
import android.view.View
import android.view.ViewGroup.LayoutParams.MATCH_PARENT
import android.widget.FrameLayout
import android.widget.TextView
import androidx.activity.ComponentActivity
import androidx.activity.enableEdgeToEdge
import androidx.annotation.StringRes
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import androidx.core.view.updatePadding
import com.mapbox.common.MapboxOptions
import com.mapbox.geojson.Point
import com.mapbox.maps.CameraOptions
import com.mapbox.maps.MapInitOptions
import com.mapbox.maps.MapLoadingErrorType
import com.mapbox.maps.MapView

private const val STYLE_ID = "parsimap-streets-v11"
private const val KEY_LATITUDE = "latitude"
private const val KEY_LONGITUDE = "longitude"
private const val KEY_ZOOM = "zoom"

class MainActivity : ComponentActivity() {
    private var mapView: MapView? = null
    private lateinit var errorView: TextView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_map)

        // Keep the map, its logo, and its attribution clear of the system bars.
        val root = findViewById<FrameLayout>(R.id.root)
        ViewCompat.setOnApplyWindowInsetsListener(root) { view, insets ->
            val bars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            view.updatePadding(bars.left, bars.top, bars.right, bars.bottom)
            WindowInsetsCompat.CONSUMED
        }
        errorView = findViewById(R.id.map_error)

        val parsimapToken = BuildConfig.PARSIMAP_MAP_TOKEN
        val mapboxToken = BuildConfig.MAPBOX_ACCESS_TOKEN
        if (parsimapToken.isBlank() || parsimapToken == "YOUR_TOKEN_HERE" ||
            mapboxToken.isBlank() || mapboxToken == "YOUR_MAPBOX_TOKEN_HERE"
        ) {
            showError(R.string.error_missing_token)
            return
        }

        // The Mapbox SDK needs a Mapbox access token before a MapView is created.
        MapboxOptions.accessToken = mapboxToken

        // Restore the camera after a configuration change.
        val camera = CameraOptions.Builder()
            .center(
                savedInstanceState?.let {
                    Point.fromLngLat(it.getDouble(KEY_LONGITUDE), it.getDouble(KEY_LATITUDE))
                } ?: Point.fromLngLat(51.389, 35.6892),
            )
            .zoom(savedInstanceState?.getDouble(KEY_ZOOM) ?: 11.0)
            .build()

        val map = MapView(
            this,
            MapInitOptions(
                this,
                cameraOptions = camera,
                styleUri = "https://api.parsimap.ir/styles/$STYLE_ID?key=${Uri.encode(parsimapToken)}",
            ),
        )
        map.mapboxMap.subscribeMapLoadingError { error ->
            if (error.type == MapLoadingErrorType.STYLE) showError(R.string.error_map_load)
        }
        root.addView(map, 0, FrameLayout.LayoutParams(MATCH_PARENT, MATCH_PARENT))
        mapView = map
    }

    private fun showError(@StringRes message: Int) {
        errorView.setText(message)
        errorView.visibility = View.VISIBLE
    }

    override fun onSaveInstanceState(outState: Bundle) {
        super.onSaveInstanceState(outState)
        mapView?.mapboxMap?.cameraState?.let { camera ->
            outState.putDouble(KEY_LATITUDE, camera.center.latitude())
            outState.putDouble(KEY_LONGITUDE, camera.center.longitude())
            outState.putDouble(KEY_ZOOM, camera.zoom)
        }
    }
}
