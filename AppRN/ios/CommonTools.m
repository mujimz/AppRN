//
//  Update.m
//  yxzb_v5
//
//  Created by 阮孝泉 on 2017/1/10.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "CommonTools.h"

@implementation VersionUpdate
{
  NSString* version;
  NSString* versionCode;
}

-(id) init{
  NSDictionary *appInfo = [[NSBundle mainBundle] infoDictionary];
  version = [appInfo objectForKey:@"CFBundleShortVersionString"];
  versionCode = [appInfo objectForKey:@"CFBundleVersion"];
  return self;
}

RCT_EXPORT_MODULE(CommonTools);

- (NSDictionary *)constantsToExport
{
  return @{ @"versionCode": versionCode,@"version":version };
}

RCT_EXPORT_METHOD(update:(NSString *) uri){
  NSString *url =[NSString stringWithFormat:@"itms-services://?action=download-manifest&url=%@",uri];
  NSLog(@"更新的URL：%@",url);
  [[UIApplication sharedApplication] openURL:[NSURL URLWithString:url]];
}

RCT_EXPORT_METHOD(goSettings){
  if([[UIDevice currentDevice].systemVersion floatValue]<10.0){
    [[UIApplication sharedApplication] openURL:[NSURL URLWithString:@"prefs:root=WIFI"]];
  }else{
    [[UIApplication sharedApplication] openURL:[NSURL URLWithString:UIApplicationOpenSettingsURLString]];
  }
}

RCT_EXPORT_METHOD(goLBS){
  if([[UIDevice currentDevice].systemVersion floatValue]<10.0){
    [[UIApplication sharedApplication] openURL:[NSURL URLWithString:@"prefs:root=LOCATION_SERVICES"]];
  }else{
    [[UIApplication sharedApplication] openURL:[NSURL URLWithString:UIApplicationOpenSettingsURLString]];
  }
}


@end
