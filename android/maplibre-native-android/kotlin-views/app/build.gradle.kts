import java.util.Properties

plugins {
    alias(libs.plugins.android.application)
}

// The token is read from local.properties, which Git ignores. The build also
// succeeds without it; the app then shows a message instead of the map.
val localProperties = Properties().apply {
    val file = rootProject.file("local.properties")
    if (file.isFile) file.inputStream().use(::load)
}

android {
    namespace = "ir.parsimap.examples.maplibre.kotlinviews"
    compileSdk = 36

    defaultConfig {
        applicationId = "ir.parsimap.examples.maplibre.kotlinviews"
        minSdk = 23
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
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
}

dependencies {
    implementation(libs.androidx.activity)
    implementation(libs.androidx.core.ktx)
    implementation(libs.maplibre.android.sdk)
}
