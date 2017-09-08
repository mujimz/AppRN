/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"
#import <CodePush/CodePush.h>

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
//#import "RCTSplashScreen.h"
//#import "RCTBaiduMapViewManager.h"

@implementation AppDelegate
{
  NSString   *updateUrl;
  id _data;
  NSString  *_path;
  NSString *_url;
}


- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSURL *jsCodeLocation;
  _path=@"production";
  
#ifdef DEBUG
  
#ifdef DEBUG
    jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];
#else
    jsCodeLocation = [CodePush bundleURL];
#endif
#else
  jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
  
  // [self checkVersion];
  
  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"AppRN"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  
  
//  [RCTSplashScreen show:rootView];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];
  
  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  
//  [RCTBaiduMapViewManager initSDK:@"y4Wuyav3WeDvsUGegTVKxk4cc8GGebgP"];
  
  return YES;
}

-(void) checkVersion{
  _data = [[NSMutableData alloc] init];
  NSURL * url = [NSURL URLWithString:[NSString stringWithFormat:@"https://app.youxinpai.com/uxzhengba/ios/%@/version.json",_path]];
  NSURLRequest *request = [[NSURLRequest alloc]initWithURL:url cachePolicy:NSURLRequestUseProtocolCachePolicy timeoutInterval:10];
  NSURLConnection *connection = [[NSURLConnection alloc]initWithRequest:request delegate:self];
}

-(void)connection:(NSURLConnection*) connection didReceiveData:(NSData *)data{
  [_data appendData:data];
}

-(void)connectionDidFinishLoading:(NSURLConnection *)connection
{
  NSString *strJosn = [[NSString alloc]initWithData: _data encoding:NSUTF8StringEncoding];
  NSLog(@"异步返回的数据是：%@",strJosn);
  NSData *jsonData = [strJosn dataUsingEncoding:NSUTF8StringEncoding];
  id json = [NSJSONSerialization JSONObjectWithData:jsonData options:kNilOptions error:nil];
  [self showUpdate:json];
}


-(void) showUpdate:(NSDictionary*)info{
  NSDictionary *appInfo = [[NSBundle mainBundle] infoDictionary];
  
  NSString *appVersion1 = [appInfo objectForKey:@"CFBundleShortVersionString"];
  
  float v = [appVersion1 floatValue];
  float newV = [[info objectForKey:@"versionCode"] floatValue];
  NSString *message = [info objectForKey:@"des"];
  NSString *updateTime = [info objectForKey:@"updateTime"];
  NSString *dateTime = [info objectForKey:@"dateTime"];
  bool isForce = [info objectForKey:@"isForce"];
  
  updateUrl = [[info objectForKey:@"appUrl"] stringByReplacingOccurrencesOfString:@"#path#" withString:[NSString stringWithFormat:@"%@/%@",_path,dateTime]];
  
  NSLog(@"服务器版本号：%f  本地版本号：%f",newV,v);
  
  if(newV > v){
    UIAlertView *alert = [[UIAlertView alloc]
                          initWithTitle:[NSString stringWithFormat:@"新版本发布（%@）",[info objectForKey:@"version"]]
                          message:[NSString stringWithFormat:@"%@",message]
                          delegate:self.class cancelButtonTitle:isForce?nil:@"忽略" otherButtonTitles:@"前往更新",nil];
    alert.delegate = self;
    alert.tag = 1243;
    CGSize size = [message sizeWithFont:[UIFont systemFontOfSize:15]constrainedToSize:CGSizeMake(alert.frame.size.width - 30, MAXFLOAT) lineBreakMode:NSLineBreakByTruncatingTail];
    UILabel *textLabel = [[UILabel alloc] initWithFrame:CGRectMake(0, 0,240, size.height)];
    textLabel.font = [UIFont systemFontOfSize:15];
    textLabel.textColor = [UIColor blackColor];
    textLabel.backgroundColor = [UIColor clearColor];
    textLabel.lineBreakMode =NSLineBreakByWordWrapping;
    textLabel.numberOfLines =0;
    textLabel.textAlignment =NSTextAlignmentLeft;
    textLabel.text = message;
    [alert setValue:textLabel forKey:@"accessoryView"];
    alert.message =@"";
    [alert show];
  }
}

-(void)alertView:(UIAlertView *) alertView didDismissWithButtonIndex:(NSInteger)buttonIndex{
  if((buttonIndex ==0) &(alertView.tag == 1243)){
    NSString *url =[NSString stringWithFormat:@"itms-services://?action=download-manifest&url=%@",updateUrl];
    NSLog(@"更新的URL：%@",url);
    [[UIApplication sharedApplication] openURL:[NSURL URLWithString:url]];
  }
}



@end
