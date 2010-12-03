/**
 * Appcelerator Titanium Mobile
 * Copyright (c) 2009-2010 by Appcelerator, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 * 
 * WARNING: This is generated code. Modify at your own risk and without support.
 */

#import "TiUIButtonBarProxy.h"
#import "TiUIButtonBar.h"

@implementation TiUIButtonBarProxy

-(TiUIView*)newView
{
	TiUIButtonBar * result = [[TiUIButtonBar alloc] init];
	[result setTabbedBar:NO];
	return result;
}

USE_VIEW_FOR_AUTO_WIDTH
USE_VIEW_FOR_AUTO_HEIGHT

@end
