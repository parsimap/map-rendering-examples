package ir.parsimap.examples.mapbox.javaviews;

import android.net.Uri;
import android.os.Bundle;
import android.view.View;
import android.widget.FrameLayout;
import android.widget.TextView;
import androidx.activity.ComponentActivity;
import androidx.activity.EdgeToEdge;
import androidx.annotation.NonNull;
import androidx.annotation.StringRes;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;
import com.mapbox.common.MapboxOptions;
import com.mapbox.geojson.Point;
import com.mapbox.maps.CameraOptions;
import com.mapbox.maps.CameraState;
import com.mapbox.maps.MapInitOptions;
import com.mapbox.maps.MapLoadingErrorType;
import com.mapbox.maps.MapView;

public class MainActivity extends ComponentActivity {
    private static final String STYLE_ID = "parsimap-streets-v11";
    private static final String KEY_LATITUDE = "latitude";
    private static final String KEY_LONGITUDE = "longitude";
    private static final String KEY_ZOOM = "zoom";

    private MapView mapView;
    private TextView errorView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_map);

        // Keep the map, its logo, and its attribution clear of the system bars.
        FrameLayout root = findViewById(R.id.root);
        ViewCompat.setOnApplyWindowInsetsListener(root, (view, insets) -> {
            Insets bars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            view.setPadding(bars.left, bars.top, bars.right, bars.bottom);
            return WindowInsetsCompat.CONSUMED;
        });
        errorView = findViewById(R.id.map_error);

        String parsimapToken = BuildConfig.PARSIMAP_MAP_TOKEN;
        String mapboxToken = BuildConfig.MAPBOX_ACCESS_TOKEN;
        if (parsimapToken.trim().isEmpty() || parsimapToken.equals("YOUR_TOKEN_HERE")
                || mapboxToken.trim().isEmpty() || mapboxToken.equals("YOUR_MAPBOX_TOKEN_HERE")) {
            showError(R.string.error_missing_token);
            return;
        }

        // The Mapbox SDK needs a Mapbox access token before a MapView is created.
        MapboxOptions.setAccessToken(mapboxToken);

        // Restore the camera after a configuration change.
        Point center = savedInstanceState == null
                ? Point.fromLngLat(51.389, 35.6892)
                : Point.fromLngLat(savedInstanceState.getDouble(KEY_LONGITUDE), savedInstanceState.getDouble(KEY_LATITUDE));
        double zoom = savedInstanceState == null ? 11.0 : savedInstanceState.getDouble(KEY_ZOOM);
        CameraOptions camera = new CameraOptions.Builder().center(center).zoom(zoom).build();

        MapInitOptions options = new MapInitOptions(
                this,
                MapInitOptions.Companion.getDefaultMapOptions(this),
                MapInitOptions.Companion.getDefaultPluginList(),
                camera,
                false,
                "https://api.parsimap.ir/styles/" + STYLE_ID + "?key=" + Uri.encode(parsimapToken));
        mapView = new MapView(this, options);
        mapView.getMapboxMap().subscribeMapLoadingError(error -> {
            if (error.getType() == MapLoadingErrorType.STYLE) {
                showError(R.string.error_map_load);
            }
        });
        root.addView(mapView, 0, new FrameLayout.LayoutParams(
                FrameLayout.LayoutParams.MATCH_PARENT, FrameLayout.LayoutParams.MATCH_PARENT));
    }

    private void showError(@StringRes int message) {
        errorView.setText(message);
        errorView.setVisibility(View.VISIBLE);
    }

    @Override
    protected void onSaveInstanceState(@NonNull Bundle outState) {
        super.onSaveInstanceState(outState);
        if (mapView != null) {
            CameraState camera = mapView.getMapboxMap().getCameraState();
            outState.putDouble(KEY_LATITUDE, camera.getCenter().latitude());
            outState.putDouble(KEY_LONGITUDE, camera.getCenter().longitude());
            outState.putDouble(KEY_ZOOM, camera.getZoom());
        }
    }
}
