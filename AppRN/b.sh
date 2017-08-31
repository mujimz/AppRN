curl -k "http://localhost:8081/index.android.bundle" > android/app/src/main/assets/index.android.bundle
cd android/
./gradlew assembleRelease
