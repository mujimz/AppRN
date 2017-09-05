package com.apprn.service;

import android.app.ProgressDialog;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Environment;
import android.os.Handler;
import android.util.Log;
import android.widget.Toast;

import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Random;

import com.apprn.entity.UpdateInfo;
import com.apprn.R;
/**
 * Created by uxin on 2017/9/5.
 */

public class Update {
    private Context context;

    private ProgressDialog pdl;

    public Update(Context context) {
        this.context = context;
    }

    public UpdateInfo getUpdateInfo() throws Exception {
        Random random = new Random();
        String path = context.getString(R.string.path);
        String update_url = context.getString(R.string.update_url).replaceAll("#path#", path) + "?v=" + random.nextInt();
        Log.i("apprn-update", update_url);
        BufferedReader reader = null;
        PackageInfo packageInfo = null;
        StringBuffer sb = new StringBuffer();
        String line = null;
        PackageManager packageManager = context.getPackageManager();
        String packageName = context.getPackageName();
        try {
            packageInfo = packageManager.getPackageInfo(packageName, 0);
            URL url = new URL(update_url);
            HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
            reader = new BufferedReader(new InputStreamReader(urlConnection.getInputStream()));
            while ((line = reader.readLine()) != null) {
                sb.append(line);
            }
        } catch (Exception e) {
            e.printStackTrace();
            Log.i("updateErr", "获取远程数据失败：" + e.getMessage());
        } finally {
            try {
                if (reader != null) {
                    reader.close();
                }
            } catch (Exception e) {
                e.printStackTrace();
                Log.i("updateErr", "失败：" + e.getMessage());
            }
        }
        String info = sb.toString();
        Log.i("apprn-update", info);
        UpdateInfo updateInfo = new UpdateInfo();
        JSONObject json = new JSONObject(info);
        updateInfo.setVersion(json.getString("version"));
        updateInfo.setDes(json.getString("des"));
        updateInfo.setIsForce(json.getBoolean("isForce"));
        updateInfo.setUpdateTime(json.getString("updateTime"));
        updateInfo.setVersionCode(json.getInt("versionCode"));
        updateInfo.setDateTime(json.getString("dateTime"));
        String oldAppUrl = json.getString("appUrl");
        String newAppUrl = oldAppUrl.replaceAll("#path#", path + "/" + updateInfo.getDateTime());
        Log.i("apprn-update", newAppUrl);
        updateInfo.setAppUrl(newAppUrl);
        if (packageInfo != null) {
            updateInfo.setCurrentVersionCode(packageInfo.versionCode);
            updateInfo.setCurrentVersionName(packageInfo.versionName);
        }
        // Log.i("uxzhengba-update", "当前版本号：" + updateInfo.getCurrentVersionCode() + "服务器版本号：" + updateInfo.getVersionCode());
        Log.i("apprn-update", "当前版本号：" + packageInfo.versionCode + "服务器版本号：" + updateInfo.getVersionCode());
        return updateInfo;
    }
    public boolean isUpdate(UpdateInfo info) {
        if (info.getCurrentVersionCode() < info.getVersionCode()) {
            return true;
        }
        return false;
    }
    public void downFile(final UpdateInfo info, final Handler handler) throws MalformedURLException {
        pdl = new ProgressDialog(context);
        pdl.setProgressStyle(ProgressDialog.STYLE_HORIZONTAL);
        pdl.setTitle("正在下载");
        pdl.setMessage("请稍后...");
        pdl.setProgress(0);
        pdl.setCancelable(false);
        pdl.show();
        final URL url = new URL(info.getAppUrl());
        new Thread() {
            public void run() {
                try {
                    HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
                    urlConnection.connect();
                    int fielLength = urlConnection.getContentLength();
                    pdl.setMax(fielLength);
                    InputStream inputStream = urlConnection.getInputStream();
                    FileOutputStream fileOutputStream = null;
                    if (inputStream != null) {
                        File file = new File(
                                Environment.getExternalStorageDirectory(),
                                "uxinzhengba.apk");
                        fileOutputStream = new FileOutputStream(file);
                        byte[] buff = new byte[2048];
                        int ch = -1;
                        int process = 0;
                        while ((ch = inputStream.read(buff)) != -1) {
                            fileOutputStream.write(buff, 0, ch);
                            process += ch;
                            pdl.setProgress(process);
                        }
                    }
                    fileOutputStream.flush();
                    if (fileOutputStream != null) {
                        fileOutputStream.close();
                    }
                    handler.post(new Runnable() {

                        @Override
                        public void run() {
                            pdl.cancel();
                            appUpdate();
                        }
                    });
                } catch (Exception e) {
                    e.printStackTrace();
                    Log.e("updateErr", "APK下载失败：" + e.getMessage());
                    handler.post(new Runnable() {
                        @Override
                        public void run() {
                            Toast.makeText(context, "下载失败,请关闭后台重新打开！！！", Toast.LENGTH_LONG).show();
                        }
                    });


                }
            }
        }.start();
    }
    private void appUpdate() {
        Intent intent = new Intent(Intent.ACTION_VIEW);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        intent.setDataAndType(Uri.fromFile(new File(Environment
                        .getExternalStorageDirectory(), "uxinzhengba.apk")),
                "application/vnd.android.package-archive");
        context.startActivity(intent);
        android.os.Process.killProcess(android.os.Process.myPid());
    }
}
