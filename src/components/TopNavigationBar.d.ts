import React from 'react';

interface TopNavigationBarProps {
  title: string;
  showBackButton?: boolean;
  showHomeButton?: boolean;
  showNotificationButton?: boolean;
}

declare const TopNavigationBar: React.FC<TopNavigationBarProps>;

export default TopNavigationBar;
