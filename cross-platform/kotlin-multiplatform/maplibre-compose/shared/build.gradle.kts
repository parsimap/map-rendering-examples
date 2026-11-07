import java.util.Properties
import org.jetbrains.kotlin.gradle.dsl.JvmTarget

plugins {
    alias(libs.plugins.kotlinMultiplatform)
    alias(libs.plugins.androidMultiplatformLibrary)
    alias(libs.plugins.composeMultiplatform)
    alias(libs.plugins.composeCompiler)
}

// Turns PARSIMAP_MAP_TOKEN from local.properties into a Kotlin constant that
// the Android and iOS apps share.
val mapToken: String = Properties().run {
    val file = rootProject.file("local.properties")
    if (file.isFile) file.inputStream().use(::load)
    getProperty("PARSIMAP_MAP_TOKEN", "")
}
val generateMapToken by tasks.registering {
    val mapToken = mapToken
    val output = layout.buildDirectory.dir("generated/mapToken")
    inputs.property("token", mapToken)
    outputs.dir(output)
    doLast {
        val escaped = mapToken.replace("\\", "\\\\").replace("\"", "\\\"").replace("$", "\$")
        val file = output.get().file("ir/parsimap/examples/kmpmaplibre/MapToken.kt").asFile
        file.parentFile.mkdirs()
        file.writeText("package ir.parsimap.examples.kmpmaplibre\n\ninternal const val MAP_TOKEN = \"$escaped\"\n")
    }
}

kotlin {
    listOf(iosArm64(), iosSimulatorArm64()).forEach { iosTarget ->
        iosTarget.binaries.framework {
            baseName = "Shared"
            isStatic = true
        }
    }

    androidLibrary {
        namespace = "ir.parsimap.examples.kmpmaplibre.shared"
        compileSdk = libs.versions.android.compileSdk.get().toInt()
        minSdk = libs.versions.android.minSdk.get().toInt()
        compilerOptions {
            jvmTarget = JvmTarget.JVM_11
        }
    }

    sourceSets {
        commonMain {
            kotlin.srcDir(generateMapToken)
            dependencies {
                implementation(libs.compose.runtime)
                implementation(libs.compose.foundation)
                implementation(libs.compose.ui)
                implementation(libs.maplibre.compose)
            }
        }
        androidMain.dependencies {
            runtimeOnly(libs.maplibre.compose.runtime.opengl.android)
        }
    }
}
