#import <UserNotifications/UNUserNotificationCenter.h> // added

#import <RCTAppDelegate.h>
#import <UIKit/UIKit.h>

// added
@interface AppDelegate : RCTAppDelegate <UNUserNotificationCenterDelegate>

// removed
//@interface AppDelegate : RCTAppDelegate

@end
