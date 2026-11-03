package ir.parsimap.examples.maplibre.kotlinviews

import android.net.Uri
import android.os.Bundle
import android.view.View
import android.widget.TextView
import androidx.activity.ComponentActivity
import androidx.activity.enableEdgeToEdge
import androidx.annotation.StringRes
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import androidx.core.view.updatePadding
import org.maplibre.android.MapLibre
import org.maplibre.android.camera.CameraPosition
import org.maplibre.android.geometry.LatLng
import org.maplibre.android.maps.MapView

private const val STYLE_ID = "parsimap-streets-v11"

class MainActivity : ComponentActivity() {
    private lateinit var mapView: MapView
    private lateinit var errorView: TextView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        MapLibre.getInstance(this)
        setContentView(R.layout.activity_map)

        // Keep the map and its attribution clear of the system bars.
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.root)) { view, insets ->
            val bars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            view.updatePadding(bars.left, bars.top, bars.right, bars.bottom)
            WindowInsetsCompat.CONSUMED
        }

        errorView = findViewById(R.id.map_error)
        mapView = findViewById(R.id.map_view)
        mapView.onCreate(savedInstanceState)

        val token = BuildConfig.PARSIMAP_MAP_TOKEN
        if (token.isBlank() || token == "YOUR_TOKEN_HERE") {
            showError(R.string.error_missing_token)
            return
        }

        mapView.addOnDidFailLoadingMapListener { showError(R.string.error_map_load) }
        mapView.getMapAsync { map ->
            // After a configuration change, MapView restores the previous camera.
            if (savedInstanceState == null) {
                map.cameraPosition = CameraPosition.Builder()
                    .target(LatLng(35.6892, 51.389))
                    .zoom(11.0)
                    .build()
            }
            map.setStyle("https://api.parsimap.ir/styles/$STYLE_ID?key=${Uri.encode(token)}")
        }
    }

    private fun showError(@StringRes message: Int) {
        errorView.setText(message)
        errorView.visibility = View.VISIBLE
    }

    override fun onStart() {
        super.onStart()
        mapView.onStart()
    }

    override fun onResume() {
        super.onResume()
        mapView.onResume()
    }

    override fun onPause() {
        super.onPause()
        mapView.onPause()
    }

    override fun onStop() {
        super.onStop()
        mapView.onStop()
    }

    override fun onLowMemory() {
        super.onLowMemory()
        mapView.onLowMemory()
    }

    override fun onDestroy() {
        super.onDestroy()
        mapView.onDestroy()
    }

    override fun onSaveInstanceState(outState: Bundle) {
        super.onSaveInstanceState(outState)
        mapView.onSaveInstanceState(outState)
    }
}
