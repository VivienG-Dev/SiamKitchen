import type { Schema, Struct } from '@strapi/strapi';

export interface AboutBlockAbout extends Struct.ComponentSchema {
  collectionName: 'components_about_block_abouts';
  info: {
    displayName: 'About';
    icon: 'quote';
  };
  attributes: {
    aboutBlockDescription: Schema.Attribute.Text;
    aboutBlockImage: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    aboutBlockOrder: Schema.Attribute.Integer;
    aboutBlockTitle: Schema.Attribute.String;
  };
}

export interface TeamTeam extends Struct.ComponentSchema {
  collectionName: 'components_team_teams';
  info: {
    displayName: 'Team';
    icon: 'user';
  };
  attributes: {
    teamDescription: Schema.Attribute.Text;
    teamImage: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    teamName: Schema.Attribute.String;
    teamRole: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'about-block.about': AboutBlockAbout;
      'team.team': TeamTeam;
    }
  }
}
