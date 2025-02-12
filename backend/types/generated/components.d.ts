import type { Schema, Struct } from '@strapi/strapi';

export interface AboutBlockAbout extends Struct.ComponentSchema {
  collectionName: 'components_about_block_abouts';
  info: {
    description: '';
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
    aboutBlockYear: Schema.Attribute.BigInteger;
  };
}

export interface OpeningHoursOpeningHours extends Struct.ComponentSchema {
  collectionName: 'components_opening_hours_opening_hours';
  info: {
    displayName: 'Opening Hours';
    icon: 'bulletList';
  };
  attributes: {
    endingTime: Schema.Attribute.Time;
    openingHoursDay: Schema.Attribute.String;
    startingTime: Schema.Attribute.Time;
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
      'opening-hours.opening-hours': OpeningHoursOpeningHours;
      'team.team': TeamTeam;
    }
  }
}
