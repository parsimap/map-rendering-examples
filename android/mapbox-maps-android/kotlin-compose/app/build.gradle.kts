import java.util.Properties

plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.compose)
}

// The tokens are read from local.properties, which Git ignores. The build also
// succeeds without them; the app then shows a message instead of the map.
val localProperties = Properties().apply {
    val file = rootProject.file("local.properties")
    if (file.isFile) file.inputStream().use(::load)
}

android {
    namespace = "ir.parsimap.examples.mapbox.kotlincompose"
    // Compose 1.12 requires compileSdk 37.
    compileSdk = 37

    defaultConfig {
        applicationId = "ir.parsimap.examples.mapbox.kotlincompose"
        minSdk = 23
        targetSdk = 36
        versionCode = 1
        versionName = "1.0"

        buildConfigField(
            "String",
            "PARSIMAP_MAP_TOKEN",
            "\"${localProperties.getProperty("PARSIMAP_MAP_TOKEN", "")}\"",
        )
        buildConfigField(
            "String",
            "MAPBOX_ACCESS_TOKEN",
            "\"${localProperties.getProperty("MAPBOX_ACCESS_TOKEN", "")}\"",
        )
    }

    buildFeatures {
        buildConfig = true
        compose = true
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
}

dependencies {
    implementation(platform(libs.androidx.compose.bom))
    implementation(libs.androidx.compose.foundation)
    implementation(libs.androidx.activity.compose)
    implementation(libs.mapbox.maps)
    implementation(libs.mapbox.maps.compose)
}
