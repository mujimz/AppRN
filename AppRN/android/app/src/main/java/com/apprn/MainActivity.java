package com.apprn;

import android.annotation.SuppressLint;
import android.app.AlertDialog;
import android.content.DialogInterface;
import android.graphics.Color;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.util.Log;
import android.widget.Toast;

import com.facebook.react.ReactActivity;

import com.apprn.entity.UpdateInfo;
import com.apprn.service.Update;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.bridge.ReactContext;

import java.net.MalformedURLException;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "AppRN";
    }

    private UpdateInfo updateInfo;
    private Update update;

    @Override
    protected void onCreate(Bundle savedInstanceState) {

//        SplashScreen.show(this);

        getReactNativeHost().getReactInstanceManager().addReactInstanceEventListener(new ReactInstanceManager.ReactInstanceEventListener() {
            @Override
            public void onReactContextInitialized(ReactContext context) {
                // Hide the native splash screen
                getWindow().getDecorView().setBackgroundColor(Color.WHITE);
            }
        });


        update = new Update(MainActivity.this);
        new Thread() {
            public void run() {
                try {
                    updateInfo = update.getUpdateInfo();
                    handler.sendEmptyMessage(0);
                } catch (Exception e) {
                    e.printStackTrace();
                    Log.e("updateErr", "升级失败：" + e.getMessage());
                }
            }
        }.start();


        super.onCreate(savedInstanceState);
        if (!isTaskRoot()) {
            finish();
            return;
        }
    }
    @SuppressLint("HandlerLeak")
    private Handler handler = new Handler() {

        @Override
        public void handleMessage(Message msg) {
            if (update.isUpdate(updateInfo)) {
                Log.i("apprn-update", "开始更新");
                showUpdateDialog();
            } else {
                Log.i("apprn-update", "暂无更新");
            }
        }
    };
    //弹出提示更新框
    private void showUpdateDialog() {
        AlertDialog.Builder builder = new AlertDialog.Builder(this);
        builder.setTitle("有更新啦:" + updateInfo.getVersion());
        builder.setMessage(updateInfo.getDes());
        builder.setCancelable(false);
        builder.setPositiveButton("确定", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                try {
                    update.downFile(updateInfo, handler);
                } catch (MalformedURLException e) {
                    Log.e("updateErr", "APK下载失败：" + e.getMessage());
                    Toast.makeText(MainActivity.this, "下载失败",Toast.LENGTH_SHORT).show();
                    // android.os.Process.killProcess(android.os.Process.myPid());
                }
            }
        });
        if (!updateInfo.getIsForce()) {
            builder.setNegativeButton("取消", new DialogInterface.OnClickListener() {
                @Override
                public void onClick(DialogInterface dialog, int which) {
                }
            });
        }
        builder.create().show();
    }
}
