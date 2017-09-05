package com.apprn;

import android.app.Application;
import android.content.Intent;
import android.telephony.TelephonyManager;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Nullable;

/**
 * Created by uxin on 2017/9/5.
 */

public class RCTCommonTools extends ReactContextBaseJavaModule {
    private Application _app;
    public RCTCommonTools(ReactApplicationContext reactContext, Application app) {
        super(reactContext);
        this._app = app;
    }
    @Override
    public String getName() {
        return "RCTCommonTools";
    }
    @ReactMethod
    public void onBackPressed() {
        Intent intent = new Intent(Intent.ACTION_MAIN);
        intent.addCategory(Intent.CATEGORY_HOME);
        intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TASK);
        getCurrentActivity().startActivity(intent);
    }
    @ReactMethod
    public void goSettings() {
        Intent intent = new Intent(android.provider.Settings.ACTION_WIRELESS_SETTINGS);
        getCurrentActivity().startActivity(intent);
    }
    private String getIMEI() {
        TelephonyManager telephonyManager = (TelephonyManager) _app.getSystemService(_app.TELEPHONY_SERVICE);
        return telephonyManager.getDeviceId();
    }
    @Override
    public
    @Nullable
    Map<String, Object> getConstants() {
        HashMap<String, Object> constants = new HashMap<String, Object>();
        constants.put("imei", this.getIMEI());
        return constants;
    }
}
