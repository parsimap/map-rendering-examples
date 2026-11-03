import java.util.Properties

plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.compose)
}

// The token is read from local.properties, which Git ignores. The build also
// succeeds without it; the app then shows a message instead of the map.
val localProperties = Properties().apply {
    val file = rootProject.file("local.properties")
    if (file.isFile) file.inputStream().use(::load)
}

android {
    namespace = "ir.parsimap.examples.maplibre.kotlincompose"
    // maplibre-compose 0.20 requires compileSdk 37.
    compileSdk = 37

    defaultConfig {
        applicationId = "ir.parsimap.examples.maplibre.kotlincompose"
        minSdk = 24
        targetSdk = 36
        versionCode = 1
        versionName = "1.0"

        buildConfigField(
            "String",
            "PARSIMAP_MAP_TOKEN",
            "\"${localProperties.getProperty("PARSIMAP_MAP_TOKEN", "")}\"",
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
    implementation(libs.maplibre.compose)
    runtimeOnly(libs.maplibre.compose.runtime.opengl)
}
