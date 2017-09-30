package com.apprn;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import android.util.Log;
import com.facebook.react.ReactInstanceManager;
import java.util.Arrays;
import java.util.List;

import com.microsoft.codepush.react.CodePush;

public class MainApplication extends Application implements ReactApplication {
  private CommonPackage commonPackage = new CommonPackage(this);
  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

    @Override
    protected String getJSBundleFile() {
      return CodePush.getJSBundleFile();
    }

    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      boolean isDev=getResources().getBoolean(R.bool.isDev);
      String hotKey="";
      String hotUri="";
      hotKey=isDev? getResources().getString(R.string.hot_key_test):getResources().getString(R.string.hot_key);
      hotUri=isDev? getResources().getString(R.string.hot_update_uri_test):getResources().getString(R.string.hot_update_uri);
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          new RNDeviceInfo(),
//          new CodePush("EsxraNY4LJba3v4VAgX6RDgnsaia4ksvOXqog", MainApplication.this, BuildConfig.DEBUG,"http://10.70.68.47:3000/")
//          new CodePush(BuildConfig.CODEPUSH_KEY, MainApplication.this, BuildConfig.DEBUG)
//            new CodePush(BuildConfig.CODEPUSH_KEY, getApplicationContext(), BuildConfig.DEBUG,BuildConfig.CODEPUSHSERVER_URL)
            new CodePush(BuildConfig.CODEPUSH_KEY, MainApplication.this, BuildConfig.DEBUG,BuildConfig.CODEPUSHSERVER_URL)
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
