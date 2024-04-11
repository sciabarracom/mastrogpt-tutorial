// @ts-check
import { join } from 'path';
import { nuvolarisTheme } from './nuvolaris-theme';
import forms from '@tailwindcss/forms';

// 1. Import the Skeleton plugin
import { skeleton } from '@skeletonlabs/tw-plugin';

/** @type {import('tailwindcss').Config} */
export default {
  // 2. Opt for dark mode to be handled via the class method
  darkMode: 'class',
  content: [
    './src/**/*.{html,js,svelte,ts}',
    // 3. Append the path to the Skeleton package
    join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')
  ],
  theme: {
    extend: {
      screens: {
        '3xl': '2150px'
      }
    },
    fontFamily: {
      arista: ['Arista', 'sans-serif']
    }
  },
  plugins: [
    forms,
    // 4. Append the Skeleton plugin (after other plugins)
    skeleton({
      themes: {
        custom: [nuvolarisTheme]
      }
    })
  ]
};
