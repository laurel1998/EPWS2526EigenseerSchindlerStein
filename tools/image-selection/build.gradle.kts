plugins {
    kotlin("jvm") version "1.9.22"
    application
}

repositories {
    mavenCentral()
}

dependencies {
    implementation("com.drewnoakes:metadata-extractor:2.18.0")
}

application {
    mainClass.set("ImageSelectionMainKt")
}

kotlin {
    jvmToolchain(17)
}
