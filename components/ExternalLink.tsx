import * as Linking from 'expo-linking';
import { Link } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { Platform } from 'react-native';

export function ExternalLink(
  props: Omit<React.ComponentProps<typeof Link>, 'href'> & { href: string }
) {
  return (
    <Link
      target="_blank"
      {...props}
      // @ts-expect-error: External URLs are not typed.
      href={props.href}
      onPress={(e) => {
        if (Platform.OS !== 'web') {
          // Prevent the default behavior of linking to the default browser on native.
          e.preventDefault();
          // Open the link in an in-app browser (works once link handler is selected - at least in android)
          WebBrowser.openBrowserAsync(props.href);
        }
      }}
      onLongPress={() => {
        Linking.openURL(props.href);
      }}
    />
  );
}
