buildscript {
    repositories {
        mavenCentral()
    }
    dependencies {
        // AGP 9.5 compiles Kotlin with Kotlin 2.2.10. maplibre-compose 0.20 is built
        // with Kotlin 2.4, so the build uses a newer Kotlin Gradle plugin.
        classpath(libs.kotlin.gradle.plugin)
    }
}

plugins {
    alias(libs.plugins.android.application) apply false
    alias(libs.plugins.kotlin.compose) apply false
}
