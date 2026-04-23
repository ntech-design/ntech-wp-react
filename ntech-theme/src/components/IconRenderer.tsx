import React from 'react';
import { IconType } from 'react-icons';

import {
  TbBrandAdobePhotoshop,
  TbBrandAdobeIllustrator,
  TbBrandAdobeIndesign,
  TbBrandAdobePremier,
  TbBrandAdobe,
  TbBrandGraphql,
  TbBrandTypescript,
  TbBrandCss3,
  TbBrandJavascript
} from 'react-icons/tb';

import {
  FaInvision,
  FaDocker,
  FaTypo3,
  FaWordpress,
  FaJira,
  FaConfluence,
  FaBitbucket,
  FaSourcetree,
  FaVuejs,
  FaSymfony,
  FaBootstrap,
  FaLess,
  FaSass,
  FaHtml5,
  FaNodeJs
} from 'react-icons/fa';

import {
  SiReasonstudios,
  SiBlender,
  SiInkscape,
  SiPhpstorm,
  SiWebstorm,
  SiCodeship,
  SiOllama,
  SiWebpack,
  SiYarn,
  SiYaml,
  SiMysql,
  SiPhp,
  SiSoundcloud,
  SiFigma,
  SiClaude,
  SiJquery,
  SiNpm,
  SiStorybook,
  SiVitest,
  SiPinia,
  SiTerraform,
  SiReact
} from 'react-icons/si';

export type IconKey = (
  'adobe-ps' |
  'adobe-ai' |
  'adobe-in' |
  'adobe-pr' |
  'adobe-ac' |
  'gql' |
  'ts' |
  'html' |
  'css' |
  'js' |
  'vue' |
  'react' |
  'less' |
  'sass' |
  'node' |
  'invision' |
  'docker' |
  'typo3' |
  'wordpress' |
  'jira' |
  'confluence' |
  'bitbucket' |
  'sourcetree' |
  'symfony' |
  'bootstrap' |
  'reason' |
  'blender' |
  'inkscape' |
  'phpstorm' |
  'webstorm' |
  'codeship' |
  'ollama' |
  'webpack' |
  'yarn' |
  'yaml' |
  'mysql' |
  'php' |
  'soundcloud' |
  'figma' |
  'claude' |
  'jquery' |
  'npm' |
  'storybook' |
  'vitest' |
  'pinia' |
  'terraform'
);

export const iconMap: Record<IconKey, IconType> = {
  'adobe-ps': TbBrandAdobePhotoshop,
  'adobe-ai': TbBrandAdobeIllustrator,
  'adobe-in': TbBrandAdobeIndesign,
  'adobe-pr': TbBrandAdobePremier,
  'adobe-ac': TbBrandAdobe,
  'gql': TbBrandGraphql,
  'ts': TbBrandTypescript,
  'html': FaHtml5,
  'css': TbBrandCss3,
  'js': TbBrandJavascript,
  'vue': FaVuejs,
  'react': SiReact,
  'less': FaLess,
  'sass': FaSass,
  'node': FaNodeJs,
  'invision': FaInvision,
  'docker': FaDocker,
  'typo3': FaTypo3,
  'wordpress': FaWordpress,
  'jira': FaJira,
  'confluence':FaConfluence,
  'bitbucket': FaBitbucket,
  'sourcetree': FaSourcetree,
  'symfony': FaSymfony,
  'bootstrap': FaBootstrap,
  'reason': SiReasonstudios,
  'blender': SiBlender,
  'inkscape': SiInkscape,
  'phpstorm': SiPhpstorm,
  'webstorm': SiWebstorm,
  'codeship': SiCodeship,
  'ollama': SiOllama,
  'webpack': SiWebpack,
  'yarn': SiYarn,
  'yaml': SiYaml,
  'mysql': SiMysql,
  'php': SiPhp,
  'soundcloud': SiSoundcloud,
  'figma': SiFigma,
  'claude': SiClaude,
  'jquery': SiJquery,
  'npm': SiNpm,
  'storybook': SiStorybook,
  'vitest': SiVitest,
  'pinia': SiPinia,
  'terraform': SiTerraform
};

export const getIcon = (key?: string): React.ReactNode | null => {
  if (!key) return null;

  const Icon = iconMap[key as IconKey];

  if (!Icon) {
    console.warn(`Unknown icon: ${key}`);
    return null;
  }

  return <Icon />;
};
