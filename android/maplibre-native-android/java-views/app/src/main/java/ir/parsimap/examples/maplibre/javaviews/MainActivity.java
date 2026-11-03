package ir.parsimap.examples.maplibre.javaviews;

import android.net.Uri;
import android.os.Bundle;
import android.view.View;
import android.widget.TextView;
import androidx.activity.ComponentActivity;
import androidx.activity.EdgeToEdge;
import androidx.annotation.NonNull;
import androidx.annotation.StringRes;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;
import org.maplibre.android.MapLibre;
import org.maplibre.android.camera.CameraPosition;
import org.maplibre.android.geometry.LatLng;
import org.maplibre.android.maps.MapView;

public class MainActivity extends ComponentActivity {
    private static final String STYLE_ID = "parsimap-streets-v11";

    private MapView mapView;
    private TextView errorView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        MapLibre.getInstance(this);
        setContentView(R.layout.activity_map);

        // Keep the map and its attribution clear of the system bars.
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.root), (view, insets) -> {
            Insets bars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            view.setPadding(bars.left, bars.top, bars.right, bars.bottom);
            return WindowInsetsCompat.CONSUMED;
        });

        errorView = findViewById(R.id.map_error);
        mapView = findViewById(R.id.map_view);
        mapView.onCreate(savedInstanceState);

        String token = BuildConfig.PARSIMAP_MAP_TOKEN;
        if (token.trim().isEmpty() || token.equals("YOUR_TOKEN_HERE")) {
            showError(R.string.error_missing_token);
            return;
        }

        mapView.addOnDidFailLoadingMapListener(errorMessage -> showError(R.string.error_map_load));
        mapView.getMapAsync(map -> {
            // After a configuration change, MapView restores the previous camera.
            if (savedInstanceState == null) {
                map.setCameraPosition(new CameraPosition.Builder()
                        .target(new LatLng(35.6892, 51.389))
                        .zoom(11.0)
                        .build());
            }
            map.setStyle("https://api.parsimap.ir/styles/" + STYLE_ID + "?key=" + Uri.encode(token));
        });
    }

    private void showError(@StringRes int message) {
        errorView.setText(message);
        errorView.setVisibility(View.VISIBLE);
    }

    @Override
    protected void onStart() {
        super.onStart();
        mapView.onStart();
    }

    @Override
    protected void onResume() {
        super.onResume();
        mapView.onResume();
    }

    @Override
    protected void onPause() {
        super.onPause();
        mapView.onPause();
    }

    @Override
    protected void onStop() {
        super.onStop();
        mapView.onStop();
    }

    @Override
    public void onLowMemory() {
        super.onLowMemory();
        mapView.onLowMemory();
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        mapView.onDestroy();
    }

    @Override
    protected void onSaveInstanceState(@NonNull Bundle outState) {
        super.onSaveInstanceState(outState);
        mapView.onSaveInstanceState(outState);
    }
}
